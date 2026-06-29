export interface ApiResponse<T = any> {
    success: boolean;
    title: string;
    message: string;
    data?: T;
    errors?: string | string[] | Record<string, any>;
}

export function successResponse<T>(
    title: string,
    message: string,
    data?: T,
): ApiResponse<T> {
    return { success: true, title, message, data };
}

export function errorResponse(
    title: string,
    message: string,
    errors: string | string[] | Record<string, any>,
): ApiResponse {
    return { success: false, title, message, errors };
}
