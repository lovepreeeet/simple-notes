import { COMMON_MESSAGES, ErrorType, HTTP_STATUS_CODES } from "../constants";
import { Errors } from "../interfaces";
import BaseHttpException from "./baseHttp.exception";

export class ValidationException extends BaseHttpException {
    constructor(
        messages: Errors
    ) {
        super(
            HTTP_STATUS_CODES.BAD_REQUEST,
            COMMON_MESSAGES.VALIDATION_FAILED,
            ErrorType.VALIDATION_ERROR,
            messages,
        );
    }
}

export class ConflictException extends BaseHttpException {
    constructor(message: string) {
        super(
            HTTP_STATUS_CODES.CONFLICT,
            message,
            ErrorType.BUSINESS_ERROR,
        )
    }
}

export class BadRequestException extends BaseHttpException {
    constructor(message: string) {
        super(
            HTTP_STATUS_CODES.BAD_REQUEST,
            message,
            ErrorType.BUSINESS_ERROR,
        )
    }
}

export class GatewayTimeoutException extends BaseHttpException {
    constructor(message: string) {
        super(
            HTTP_STATUS_CODES.GATEWAY_TIMEOUT,
            message,
            ErrorType.BUSINESS_ERROR,
        )
    }
}

export class ServiceUnavailableException extends BaseHttpException {
    constructor(message: string) {
        super(
            HTTP_STATUS_CODES.SERVICE_UNAVAILABLE,
            message,
            ErrorType.BUSINESS_ERROR,
        )
    }
}

export class InternalServerException extends BaseHttpException {
    constructor(message: string) {
        super(
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message,
            ErrorType.BUSINESS_ERROR,
        )
    }
}

export class NotFoundException extends BaseHttpException {
    constructor(message: string) {
        super(
            HTTP_STATUS_CODES.NOT_FOUND,
            message,
            ErrorType.RESOURCE_NOT_FOUND,
        )
    }
}

export class UnAuthorizedException extends BaseHttpException {
    constructor(message: string) {
        super(
            HTTP_STATUS_CODES.UNAUTHORIZED,
            message,
            ErrorType.AUTHORIZATION_ERROR,
        )
    }
}