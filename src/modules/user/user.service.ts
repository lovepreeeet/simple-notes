import { REDIS_MODULES, USER_MESSAGES } from "../../constants";
import { ConflictException, NotFoundException, UnAuthorizedException } from "../../exceptions/http.exception";
import bcryptHelper from "../../helpers/bcrypt.helper";
import JwtHelper from "../../helpers/jwt.helper";
import redisHelper from "../../helpers/redis.helper";
import * as UserInterface from "./user.interface";
import UserRepository from "./user.repository";

export class UserService {
    private userRepository = new UserRepository();

    async login(payload: UserInterface.LoginPaylod) {
        const existingUser = await this.userRepository.findUserByEmail(payload.email);

        if (!existingUser) {
            throw new NotFoundException(USER_MESSAGES.USER_NOT_FOUND);
        }
        let { password, ...user } = existingUser;
        const isMatch = await bcryptHelper.comparePassswords(payload.password, password);

        if (!isMatch) {
            throw new UnAuthorizedException(USER_MESSAGES.INVALID_CREDS);
        }

        const token = JwtHelper.generateToken(user);

        return {
            token,
            userDetails: JwtHelper.verifyToken(token),
        }
    }

    async register(payload: UserInterface.RegisterPayload) {
        let existingUser = await this.userRepository.findUserByEmail(payload.email);

        if (existingUser) {
            throw new ConflictException(USER_MESSAGES.ALREADY_EXISTS);
        }

        let encryptedPassword = await bcryptHelper.hashPassword(payload.password);

        let newUser = await this.userRepository.createUser({
            ...payload,
            password: encryptedPassword
        });
        return newUser;
    }

    async logout(token: string) {
        const exp = JwtHelper.getTokenExpiry(token);
        const ttl = exp - Math.floor(Date.now() / 1000);

        if (ttl > 0) {
            await redisHelper.set(REDIS_MODULES.TOKEN_BLACKLIST, token, "1", ttl);
        }
    }
}