import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import jwtHelper from "../helpers/jwt.helper";
import redisHelper from "../helpers/redis.helper";
import { COMMON_MESSAGES, HTTP_STATUS_CODES, REDIS_MODULES } from "../constants";
import { UnAuthorizedException } from "../exceptions/http.exception";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({
            success: false,
            statusCode: HTTP_STATUS_CODES.UNAUTHORIZED,
            message: COMMON_MESSAGES.TOKEN_NOT_FOUND,
        });
    }

    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwtHelper.verifyToken(token);

        const isBlacklisted = await redisHelper.get(REDIS_MODULES.TOKEN_BLACKLIST, token);
        if (isBlacklisted) {
            return next(new UnAuthorizedException(COMMON_MESSAGES.TOKEN_INVALID));
        }

        req.user = decoded;
        next();
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            return next(new UnAuthorizedException(COMMON_MESSAGES.TOKEN_INVALID));
        }
        next(error);
    }
}