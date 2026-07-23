import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";
import { ValidationException } from "../exceptions/http.exception";

class Validate {
    public params(schema: ZodType) {
        return function (req: Request, res: Response, next: NextFunction) {
            try {
                let params = req.params;
                let validated = schema.parse(params) as typeof req.params;
                req.params = validated;
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    let errors = error.issues.map(item => ({
                        field: item.path.join('.') || 'unknown',
                        message: item.message,
                    }))
                    return next(new ValidationException(errors))
                }
                next(error);
            }
        }
    }

    public body(schema: ZodType) {
        return function (req: Request, res: Response, next: NextFunction) {
            try {
                let body = req.body;
                let validated = schema.parse(body) as typeof req.body;
                req.body = validated;
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    let errors = error.issues.map(item => ({
                        field: item.path.join('.') || 'unknown',
                        message: item.message,
                    }))
                    return next(new ValidationException(errors))
                }
                next(error);
            }
        }
    }

    public query(schema: ZodType) {
        return function (req: Request, res: Response, next: NextFunction) {
            try {
                let validated = schema.parse(req.query) as typeof req.query;
                Object.defineProperty(req, "query", {
                    value: validated,
                    writable: true,
                    configurable: true,
                    enumerable: true,
                });
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    let errors = error.issues.map(item => ({
                        field: item.path.join('.') || 'unknown',
                        message: item.message,
                    }))
                    return next(new ValidationException(errors))
                }
                next(error);
            }
        }
    }
}
export default new Validate();