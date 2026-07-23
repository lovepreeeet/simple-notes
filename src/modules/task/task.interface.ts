import { TASK_STATUS } from "../../constants"

export interface CreateTaskPayload {
    title: string,
    description: string
    status: TASK_STATUS.DONE | TASK_STATUS.IN_PROGRESS | TASK_STATUS.TO_DO,
    userId: string
}

export interface ListTasksPayload {
    search?: string
    status?: TASK_STATUS.DONE | TASK_STATUS.IN_PROGRESS | TASK_STATUS.TO_DO,
    userId?: string
    limit?: number,
    page?: number
}

export interface GetTaskPayload {
    id: string
    userId?: string
}

export interface UpdateTaskBody {
    title: string
    description: string
    status: TASK_STATUS.DONE | TASK_STATUS.IN_PROGRESS | TASK_STATUS.TO_DO,
}

