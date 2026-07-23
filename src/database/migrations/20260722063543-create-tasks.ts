import { QueryInterface, DataTypes } from "sequelize";
import { TASK_STATUS } from "../../constants";

export async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable("Tasks", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
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
            references: {
                model: "Users",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("Tasks");
}
