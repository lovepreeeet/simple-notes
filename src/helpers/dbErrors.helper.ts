import { ConnectionError, DatabaseError, ForeignKeyConstraintError, TimeoutError, UniqueConstraintError, ValidationError } from "sequelize";
import { BadRequestException, ConflictException, GatewayTimeoutException, InternalServerException, ServiceUnavailableException } from "../exceptions/http.exception";
import { DB_MESSAGES } from "../constants";

export function checkDbError(err: unknown) {
    if (err instanceof UniqueConstraintError) {
        const msg =
            err.errors?.[0]?.message || DB_MESSAGES.DUPLICATE_ENTRY;
        return new ConflictException(msg);
    }

    if (err instanceof ForeignKeyConstraintError) {
        return new BadRequestException(
            DB_MESSAGES.FOREIGN_KEY_CONSTRAINT_FAILED
        );
    }

    if (err instanceof ValidationError) {
        const message =
            err.errors?.[0]?.message || DB_MESSAGES.VALIDATION_FAILED;
        return new BadRequestException(message);
    }

    if (err instanceof TimeoutError) {
        return new GatewayTimeoutException(DB_MESSAGES.QUERY_TIMEOUT);
    }

    if (err instanceof ConnectionError) {
        return new ServiceUnavailableException(
            DB_MESSAGES.CONNECTION_FAILED
        );
    }

    if (err instanceof DatabaseError) {
        return new InternalServerException(DB_MESSAGES.DATABASE_ERROR);
    }

    return null;
}
