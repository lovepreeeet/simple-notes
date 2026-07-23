import { env } from "../config";

export const DATABASE = {
    DB_NAME: env.DB_NAME,
    DB_PORT: Number(env.DB_PORT),
    USER_NAME: env.USER_NAME,
    PASSWORD: env.PASSWORD,
    HOSTNAME: env.HOST_NAME,
}