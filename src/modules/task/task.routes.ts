import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import Validate from "../../middlewares/validation.middleware";
import { TaskController } from "./task.controller";
import { createTaskValidation, getTaskParamsValidation, listTasksValidation, updateTaskValidation } from "./task.validation";

const router = Router();
const taskController = new TaskController();

router.post(
    "/",
    authMiddleware,
    Validate.body(createTaskValidation),
    taskController.createTask,
)

router.get(
    "/",
    authMiddleware,
    Validate.query(listTasksValidation),
    taskController.listTasks,
)

router
    .route("/:id")
    .get(
        authMiddleware,
        Validate.params(getTaskParamsValidation),
        taskController.getTask,
    )
    .patch(
        authMiddleware,
        Validate.params(getTaskParamsValidation),
        Validate.body(updateTaskValidation),
        taskController.updateTask,
    )
    .delete(
        authMiddleware,
        Validate.params(getTaskParamsValidation),
        taskController.deleteTask,
    )

export default router;