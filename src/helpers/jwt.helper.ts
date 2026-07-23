import jwt from "jsonwebtoken";
import { env } from "../config";
import { AuthUser } from "../modules/user/user.interface";

class JwtHelper {
    private secret = env.JWT_SECRET;

    public generateToken(payload: AuthUser) {
        return jwt.sign(payload, this.secret, {
            expiresIn: env.JWT_EXPIRES_IN as any,
        })
    }

    public verifyToken(token: string): AuthUser {
        return jwt.verify(token, this.secret) as AuthUser;
    }

    public getTokenExpiry(token: string): number {
        const decoded = jwt.decode(token) as { exp?: number } | null;
        return decoded?.exp ?? 0;
    }

}

export default new JwtHelper();