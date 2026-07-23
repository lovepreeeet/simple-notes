import { Op } from "sequelize";
import { Task } from "../../database/models/task.model";
import { CreateTaskPayload, GetTaskPayload, ListTasksPayload, UpdateTaskBody } from "./task.interface";
import paginationHelper from "../../helpers/pagination.helper";

export class TaskRepository {
    public async createTask(payload: CreateTaskPayload) {
        try {
            let task = await Task.create({
                title: payload.title,
                description: payload.description,
                status: payload.status,
                userId: payload.userId,
            })
            return task;
        } catch (error) {
            console.log('error: ', error);
            throw error;
        }
    }

    public async findAllTasks(payload: ListTasksPayload) {
        try {
            let where: any = {
                userId: payload.userId,
            };

            if (payload.search) {
                where[Op.or] = [
                    {
                        title: {
                            [Op.iLike]: `%${payload.search}%`,
                        },
                    },
                    {
                        description: {
                            [Op.iLike]: `%${payload.search}%`,
                        },
                    },
                ]
            }
            if (payload.status) {
                where.status = payload.status;
            }
            let { limit, offset } = paginationHelper.getOffsetLimit(payload.page, payload.limit);
            let { rows, count } = await Task.findAndCountAll({
                where,
                order: [["createdAt", "DESC"]],
                limit,
                offset,
            })
            return { rows, count };
        } catch (error) {
            console.log('error: ', error);
            throw error;
        }
    }

    public async findTaskById(payload: GetTaskPayload) {
        try {
            let { userId, id } = payload;
            return await Task.findOne({
                where: {
                    id,
                    userId,
                },
            })
        } catch (error) {
            console.log('error: ', error);
            throw error;
        }
    }
}