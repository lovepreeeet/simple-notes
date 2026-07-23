import * as zod from "zod";
import { TASK_STATUS } from "../../constants";

export const createTaskValidation = zod.object({
    title: zod.string().min(1),
    description: zod.string().min(1),
    status: zod.enum([TASK_STATUS.DONE, TASK_STATUS.IN_PROGRESS, TASK_STATUS.TO_DO]),
});

export const listTasksValidation = zod.object({
    status: zod.enum([TASK_STATUS.DONE, TASK_STATUS.IN_PROGRESS, TASK_STATUS.TO_DO]).optional(),
    search: zod.string().optional(),
    page: zod.coerce.number().default(1),
    limit: zod.coerce.number().default(10),
})

export const getTaskParamsValidation = zod.object({
    id: zod.uuid(),
})

export const updateTaskValidation = zod.object({
    title: zod.string().optional(),
    description: zod.string().optional(),
    status: zod.enum([TASK_STATUS.DONE, TASK_STATUS.IN_PROGRESS, TASK_STATUS.TO_DO]).optional(),
});