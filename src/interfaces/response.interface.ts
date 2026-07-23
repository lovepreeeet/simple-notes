export interface SuccessBody {
    success: boolean,
    message: string
    data?: unknown,
    statusCode: number,
    timestamp?: string
}

export interface BaseErrorResponse {
    success: boolean,
    timestamp: string,
    correlationId?: string,
}

export interface ErrorBody extends BaseErrorResponse {
    message: string;
    errorType: string;
    path?: string;
    errors?: Array<{ field?: string; message: string }>;
    statusCode: number;
}