import { NextFunction, Request, Response } from "express";
import { TaskService } from "./task.service";
import ResponseHelper from "../../helpers/response.helper";
import { TASK_MESSAGES } from "../../constants";

export class TaskController {
    private taskService = new TaskService();

    public createTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let payload = {
                ...req.body,
                userId: req.user?.id,
            }
            let response = await this.taskService.createTask(payload);
            ResponseHelper.success(res, {
                message: TASK_MESSAGES.CREATE_SUCCES,
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    public listTasks = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let query = {
                ...req.query,
                userId: req.user?.id,
            };
            let response = await this.taskService.listTasks(query);
            ResponseHelper.success(res, {
                message: TASK_MESSAGES.TASK_LIST,
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    public getTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let id = req.params?.id as string;
            let userId = req.user?.id;
            let response = await this.taskService.getTask({
                id: id,
                userId: userId,
            });
            ResponseHelper.success(res, {
                message: TASK_MESSAGES.GET_SINGLE_TASK_SUCCESS,
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    public updateTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let payload = {
                id: req.params?.id as string,
                userId: req.user?.id,
            }
            let response = await this.taskService.updateTask(payload, req.body);
            ResponseHelper.success(res, {
                message: TASK_MESSAGES.UPDATE_SINGLE_TASK_SUCCESS,
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    public deleteTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let payload = {
                id: req.params?.id as string,
                userId: req.user?.id,
            }
            let response = await this.taskService.deleteTask(payload);
            ResponseHelper.success(res, {
                message: TASK_MESSAGES.DELETED_TASK_SUCCESS,
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
}