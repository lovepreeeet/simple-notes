import { Router } from "express";
import rateLimit from "express-rate-limit";
import Validate from "../../middlewares/validation.middleware"
import { UserController } from "./user.controller";
import { loginValidation, registerValidation } from "./user.validation";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { COMMON_MESSAGES } from "../../constants";

const router = Router();
const userController = new UserController();

const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: COMMON_MESSAGES.TOO_MANY_REQUESTS },
});

router.
    post(
        "/login",
        authRateLimiter,
        Validate.body(loginValidation),
        userController.login,
    );

router.
    post(
        "/register",
        authRateLimiter,
        Validate.body(registerValidation),
        userController.register,
    )

router.
    post(
        "/logout",
        authMiddleware,
        userController.logout,
    )

router.
    get(
        "/me",
        authMiddleware,
        userController.me,
    )

export default router;