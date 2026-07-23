export const HTTP_STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
} as const;

export const DB_MESSAGES = {
    DUPLICATE_ENTRY: 'Duplicate entry',
    FOREIGN_KEY_CONSTRAINT_FAILED: 'Foreign key constraint failed',
    VALIDATION_FAILED: 'Validation failed',
    QUERY_TIMEOUT: 'Query timeout',
    CONNECTION_FAILED: 'Database connection failed',
    DATABASE_ERROR: 'Database error',
} as const;

export const ENVIRONMENT = {
    PROD: 'prod',
    STAGE: 'stage',
    DEV: 'dev',
    QA: 'qa',
    LOCAL: 'local',
} as const;


export const REDIS_MODULES = {
    TASKS: "TASKS",
    USER: "USER",
    TOKEN_BLACKLIST: "TOKEN_BLACKLIST"
}

export const REDIS_KEYS = {
    TASK_LISTING: "TASK_LISTING",
    USER_TOKEN: "USER_TOKEN"
}