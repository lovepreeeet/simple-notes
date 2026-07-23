import { Sequelize } from "sequelize";
import { DATABASE } from "../../constants";

export const sequelize = new Sequelize(
    DATABASE.DB_NAME,
    DATABASE.USER_NAME,
    DATABASE.PASSWORD,
    {
        host: DATABASE.HOSTNAME,
        dialect: "postgres",
        port: DATABASE.DB_PORT
    }
);