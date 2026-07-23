import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config";

export interface UserAttributes {
    id: string
    email: string
    password: string
    username: string
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

export const User = sequelize.define<
    Model<UserAttributes, UserCreationAttributes>,
    UserCreationAttributes
>("User", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
})
