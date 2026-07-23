import { Response } from "express";
import { COMMON_MESSAGES, ErrorType, HTTP_STATUS_CODES } from "../constants";
import { BaseErrorResponse, ErrorBody, SuccessBody } from "../interfaces";
import BaseHttpException from "../exceptions/baseHttp.exception";
import { InternalServerException } from "../exceptions/http.exception";

class ResponseHelper {
    public success(
        response: Response,
        data: { message: string, data?: unknown, statusCode?: number },
    ) {
        let body: SuccessBody = {
            success: true,
            message: data.message,
            data: data.data,
            timestamp: new Date().toISOString(),
            statusCode: data.statusCode || HTTP_STATUS_CODES.OK,
        }
        response.status(body.statusCode).json(body)
    }

    public error(
        response: Response,
        error: unknown,
        correlationId?: string,
        path?: string,
    ) {
        let baseErrorBody: BaseErrorResponse = {
            success: false,
            timestamp: new Date().toISOString(),
        }
        if (error instanceof BaseHttpException) {
            const errorResponse: ErrorBody = {
                ...baseErrorBody,
                message: error.message,
                errorType: error.errorType,
                statusCode: error.statusCode,
            }
            if (path) {
                errorResponse.path = path;
            }
            if (
                error.errorType === ErrorType.VALIDATION_ERROR &&
                error.errors &&
                error.errors.length > 0
            ) {
                errorResponse.errors = error.errors;
            }
            return response.status(errorResponse.statusCode).json(errorResponse);

        }
        const internal = new InternalServerException(COMMON_MESSAGES.ERROR);

        const errorResponse: ErrorBody = {
            ...baseErrorBody,
            message: internal.message,
            errorType: internal.errorType,
            statusCode: internal.statusCode,
        }
        // Add path if provided
        if (path) {
            errorResponse.path = path;
        }

        response.status(errorResponse.statusCode).json(errorResponse)
    }
}

export default new ResponseHelper();