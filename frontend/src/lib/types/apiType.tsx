export interface MetadataLinksType {
    next: string | null;
    previous: string | null;
}

export interface MetadataRequestType {
    page: number;
    perPage: number;

}

export interface MetadataType extends MetadataRequestType {
    pageCount: number;
    totalCount: number;
    links: MetadataLinksType;
}