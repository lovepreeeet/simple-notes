import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import ResponseHelper from "../../helpers/response.helper";
import { USER_MESSAGES } from "../../constants";

export class UserController {
    private userService = new UserService();

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let payload = req.body;
            let response = await this.userService.login(payload);
            ResponseHelper.success(res, {
                message: USER_MESSAGES.LOGIN_SUCCESS,
                data: response,
            })
        } catch (error) {
            next(error);
        }
    }

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload = req.body;

            let response = await this.userService.register(payload);
            ResponseHelper.success(res, {
                message: USER_MESSAGES.REGISTER_SUCCESS,
                data: response,
            })
        } catch (error) {
            next(error);
        }
    }

    public logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader?.split(" ")[1] as string;
            let response = await this.userService.logout(token);
            ResponseHelper.success(res, {
                message: USER_MESSAGES.LOGOUT_SUCCESS,
                data: response,
            })
        } catch (error) {
            next(error);
        }
    }

    public me = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let user = req.user;
            ResponseHelper.success(res, {
                data: user,
                message: USER_MESSAGES.USER_DATA
            })
        } catch (error) {
            next(error);
        }
    }

}