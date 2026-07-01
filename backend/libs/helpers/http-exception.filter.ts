import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException, ValidationError } from '@nestjs/common';
import { errorResponse } from './response.helper';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<any>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        let message = 'Internal server error';
        
        const friendlyStatus = HttpStatus[status]
            ? HttpStatus[status]
                .replace(/_/g, ' ')
                .toLowerCase()
                .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())
            : 'Internal Server Error';

        let title = friendlyStatus;
        let errors: any = undefined;

        if (exception instanceof HttpException) {
            const resBody = exception.getResponse() as any;

            if (resBody && typeof resBody === 'object' && 'success' in resBody) {
                response.status(status).json(resBody);
                return;
            }

            title = resBody.error || friendlyStatus || exception.name || 'HTTP Error';

            if (typeof resBody === 'string') {
                message = resBody;
            } else if (resBody && typeof resBody === 'object') {
                message = resBody.message || exception.message;
                errors = resBody.errors || undefined;
                if (resBody.error) {
                    title = resBody.error;
                }
            } else {
                message = exception.message;
            }
        } else {
            message = exception.message || String(exception);
            title = 'Internal Server Error';
        }

        if (Array.isArray(message)) {
            errors = message;
            message = 'Validation failed';
            title = 'Validation Error';
        }

        const formattedResponse = errorResponse(title, message, errors, status);
        response.status(status).json(formattedResponse);
    }
}

export function validationExceptionFactory(validationErrors: ValidationError[] = []) {
    const errors: Record<string, string[]> = {};
    validationErrors.forEach((error) => {
        errors[error.property] = Object.values(error.constraints || {});
    });

    const formattedError = errorResponse(
        'Validation Error',
        'Validation failed',
        errors,
    );

    return new BadRequestException(formattedError);
}
