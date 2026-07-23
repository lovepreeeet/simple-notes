import { User } from "../../database/models/user.model";
import { CreateUserPayload } from "./user.interface";

class UserRepository {
    async findUserByEmail(email: string) {
        try {
            let user = await User.findOne({
                where: { email },
            })
            return user?.get({ plain: true });
        } catch (error) {
            console.log('error: ', error);
            throw error;
        }
    }

    async createUser(payload: CreateUserPayload) {
        try {
            let user = await User.create({
                username: payload.username,
                email: payload.email,
                password: payload.password,
            });
            let { password, ...returningUser } = user.toJSON();
            return returningUser;
        } catch (error) {
            console.log('error: ', error);
            throw error;
        }
    }
}

export default UserRepository;