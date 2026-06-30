export interface ApiResponse<T = any> {
    statusCode: number,
    success: boolean;
    title: string;
    message: string;
    accesss_token?: string;
    data?: T;
    errors?: string | string[] | Record<string, any>;
}

export function baseResponse<T>({
    statusCode,
    success,
    title,
    message
}: ApiResponse<T>): ApiResponse<T> {
    return { statusCode, success, title, message };
}

export function successResponse<T>(
    title: string,
    message: string,
    data?: T,
    access_token?: string,
    statusCode: number = 200,
): ApiResponse<T> {
    return {
        ...baseResponse({ statusCode, success: true, title, message }),
        ...(data !== undefined ? { data } : {}),
        ...(access_token !== undefined ? { access_token } : {}),
    };
}

export function errorResponse(
    title: string,
    message: string,
    errors?: string | string[] | Record<string, any>,
    statusCode: number = 400,
): ApiResponse {
    return {
        ...baseResponse({ statusCode, success: false, title, message }),
        ...(errors ? { errors } : {}),
    };
}
