import { REDIS_KEYS, REDIS_MODULES, TASK_MESSAGES } from "../../constants";
import { NotFoundException } from "../../exceptions/http.exception";
import paginationHelper from "../../helpers/pagination.helper";
import redisHelper from "../../helpers/redis.helper";
import * as TaskInterface from "./task.interface";
import { TaskRepository } from "./task.repository";

export class TaskService {
    private taskRepository = new TaskRepository();

    public async createTask(payload: TaskInterface.CreateTaskPayload) {
        const task = await this.taskRepository.createTask(payload);
        return task;
    }

    public async listTasks(payload: TaskInterface.ListTasksPayload) {
        console.log('payload: ', payload);

        let module = REDIS_MODULES.TASKS;
        let key = `${REDIS_KEYS.TASK_LISTING}:${payload.page}:${payload.limit}`

        const redisTasks = await redisHelper.get(module, key);
        if (redisTasks) {
            return redisTasks;
        }
        const { rows, count } = await this.taskRepository.findAllTasks(payload);
        const pagination = paginationHelper.getMeta(payload.page, payload.limit, count);
        let response = { data: rows, pagination }
        await redisHelper.set(module, key, response);
        return response;
    }

    public async getTask(payload: TaskInterface.GetTaskPayload) {
        const task = await this.taskRepository.findTaskById(payload);
        if (!task) {
            throw new NotFoundException(TASK_MESSAGES.NO_TASK_FOUND)
        }
        return task;
    }

    public async updateTask(payload: TaskInterface.GetTaskPayload, body: TaskInterface.UpdateTaskBody) {
        const task = await this.taskRepository.findTaskById(payload);
        if (!task) {
            throw new NotFoundException(TASK_MESSAGES.NO_TASK_FOUND)
        }
        return task.update(body);
    }

    public async deleteTask(payload: TaskInterface.GetTaskPayload) {
        const task = await this.taskRepository.findTaskById(payload);
        if (!task) {
            throw new NotFoundException(TASK_MESSAGES.NO_TASK_FOUND)
        }
        return task.update({ isDeleted: true });
    }
}