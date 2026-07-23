import { ErrorType } from "../constants";
import { Errors } from "../interfaces";

class BaseHttpException extends Error {
    public statusCode: number;
    public message: string;
    public errorType: ErrorType;
    public errors?: Errors;

    constructor(
        statusCode: number,
        message: string,
        errorType: ErrorType,
        errors?: Errors,
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errorType = errorType;
        this.errors = errors && errors.length > 0 ? errors : undefined;

        // 
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace?.(this, this.constructor);
    }
}
export default BaseHttpException;