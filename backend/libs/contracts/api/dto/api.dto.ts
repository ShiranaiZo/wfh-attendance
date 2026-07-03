export interface MetadataLinks {
    next: string | null;
    previous: string | null;
}

export interface MetadataRequest {
    page: number;
    perPage: number;

}

export interface Metadata extends MetadataRequest {
    pageCount: number;
    totalCount: number;
    links: MetadataLinks;
}

export interface ApiResponse<T = any> {
    statusCode: number,
    success: boolean;
    title: string;
    message: string;
    accessToken?: string;
    data?: T;
    metadata?: Metadata;
    errors?: string | string[] | Record<string, any>;
}