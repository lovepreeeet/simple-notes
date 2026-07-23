import { NextFunction, Request, Response } from "express";
import { checkDbError } from "../helpers/dbErrors.helper";
import { ENVIRONMENT, HTTP_STATUS_CODES } from "../constants";
import BaseHttpException from "../exceptions/baseHttp.exception";
import ResponseHelper from "../helpers/response.helper";
import { env } from "../config";

export async function errorMiddleware(
    err: unknown,
    req: Request,
    res: Response,
    _next: NextFunction,
) {
    const correlationId = (req as any).correlationId;
    const mapped = checkDbError(err);
    const error = mapped || err;
    const meta = buildErrorMeta(error, req);
    console.log('meta: ', meta);

    if (mapped) {
        return ResponseHelper.error(res, mapped, correlationId, req.path);
    }
    return ResponseHelper.error(res, err, correlationId, req.path);
}

function buildErrorMeta(err: unknown, req: Request) {
    const isProd = env.NODE_ENV === ENVIRONMENT.PROD;
    const base = { path: req.path, method: req.method };

    if (err instanceof BaseHttpException) {
        return {
            ...base,
            statusCode: err.statusCode,
            error: {
                name: err.name,
                message: err.message,
            },
            details: isProd ? undefined : err.errors,
        };
    }
    if (err instanceof Error) {
        return {
            ...base,
            statusCode: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            error: {
                name: err.name,
                message: err.message,
                stack: isProd ? undefined : err.stack,
            },
        };
    }
    return {
        ...base,
        statusCode: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        error: err,
    };
}
