import { ApiResponse, Metadata } from "@app/contracts/api/dto/api.dto";

export function baseResponse<T>({
    statusCode,
    success,
    title,
    message
}: ApiResponse<T>): ApiResponse<T> {
    return { statusCode, success, title, message };
}

export function successResponse<T>({
    title,
    message,
    data,
    metadata,
    access_token,
    statusCode = 200,
}: {
    title: string;
    message: string;
    data?: T;
    metadata?: Metadata;
    access_token?: string;
    statusCode?: number;
}): ApiResponse<T> {
    return {
        ...baseResponse({ statusCode, success: true, title, message }),
        ...(data !== undefined ? { data } : {}),
        ...(metadata !== undefined ? { metadata } : {}),
        ...(access_token !== undefined ? { access_token } : {}),
    };
}

export function errorResponse({
    title,
    message,
    errors,
    statusCode = 400,
}: {
    title: string;
    message: string;
    errors?: string | string[] | Record<string, any>;
    statusCode?: number;
}): ApiResponse {
    return {
        ...baseResponse({ statusCode, success: false, title, message }),
        ...(errors ? { errors } : {}),
    };
}
