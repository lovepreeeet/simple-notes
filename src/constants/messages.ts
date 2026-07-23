export const COMMON_MESSAGES = {
    SUCCESS: "Success",
    VALIDATION_FAILED: 'Request validation failed',
    ERROR: "something went wrong",
    ROUTE_NOT_FOUND: "Route not found error",
    TOKEN_NOT_FOUND: "Token not found",
    TOKEN_INVALID: "Invalid or expired token",
    TOO_MANY_REQUESTS: "Too many requests, please try again later",
}

export const ENV_MESSAGES = {
    DBNAME_REQUIRED: "DBNAME is required",
    USERNAME_REQUIRED: "USERNAME is required",
    PASSWORD_REQUIRED: "PASSWORD is required",
    HOSTNAME_REQUIRED: "HOSTNAME is required",
    JWT_SECRET_REQUIRED: "JWT_SECRET is required",
    REDIS_URL_REQUIRED: "REDIS_URL is required",
}

export const USER_MESSAGES = {
    LOGIN_SUCCESS: "User logged in successfully",
    REGISTER_SUCCESS: "User registered successfully",
    ALREADY_EXISTS: "User already exists",
    USER_NOT_FOUND: "User not found",
    INVALID_CREDS: "Invalid credentials",
    USER_DATA: "User data",
    LOGOUT_SUCCESS: "User logged out successfully",
}

export const TASK_MESSAGES = {
    CREATE_SUCCES: "Task successfully created",
    TASK_LIST: "Tasks list successfully fetched",
    GET_SINGLE_TASK_SUCCESS: "Task successfully fetched",
    UPDATE_SINGLE_TASK_SUCCESS: "Task successfully updated",
    DELETED_TASK_SUCCESS: "Task successfully deleted",
    NO_TASK_FOUND: "no task found",
}