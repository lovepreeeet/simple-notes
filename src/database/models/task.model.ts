import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config";
import { TASK_STATUS } from "../../constants";

export interface TaskAttributes {
    id: string
    title: string
    description: string
    status: TASK_STATUS.DONE | TASK_STATUS.IN_PROGRESS | TASK_STATUS.TO_DO,
    userId: string
    isDeleted?: boolean
}

interface UserCreationAttributes extends Optional<TaskAttributes, "id"> { }

export const Task = sequelize.define<
    Model<TaskAttributes, UserCreationAttributes>,
    UserCreationAttributes
>("Task", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM(TASK_STATUS.DONE, TASK_STATUS.IN_PROGRESS, TASK_STATUS.TO_DO),
        defaultValue: TASK_STATUS.TO_DO,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    defaultScope: {
        where: {
            isDeleted: false,
        },
        attributes: {
            exclude: ['isDeleted']
        }
    }
})
