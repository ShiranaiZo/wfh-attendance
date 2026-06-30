export interface ApiResponse<T = any> {
    success: boolean;
    title: string;
    message: string;
    data?: T;
    errors?: string | string[] | Record<string, any>;
}

export function baseResponse<T>(
    success: boolean,
    title: string,
    message: string,
): ApiResponse<T> {
    return { success, title, message };
}

export function successResponse<T>(
    title: string,
    message: string,
    data?: T,
    access_token?: string
): ApiResponse<T> {
    return {
        ...baseResponse(true, title, message),
        ...data,
        ...(access_token ? { access_token } : {}),
    };
}

export function errorResponse(
    title: string,
    message: string,
    errors?: string | string[] | Record<string, any>,
): ApiResponse {
    let result = {
        ...baseResponse(false, title, message),
        ...(errors ? { errors } : {}),
    };
    return {
        ...baseResponse(false, title, message),
        ...(errors ? { errors } : {}),
    };
}
