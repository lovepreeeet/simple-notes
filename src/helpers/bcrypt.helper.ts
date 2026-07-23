import bcrypt from "bcrypt";


class Bcrypt {
    public async hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }

    public async comparePassswords(password: string, encryptedPassword: string) {
        return await bcrypt.compare(password, encryptedPassword)
    }
}

export default new Bcrypt();
