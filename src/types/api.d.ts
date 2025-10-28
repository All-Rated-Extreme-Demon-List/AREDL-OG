interface ApiNetworkResponse<T> {
    status: number;
    networkError: boolean;
    data: T;
}

interface ApiSuccessResponse<T> extends ApiNetworkResponse<T> {
    error: false;
}

interface ApiErrorResponse extends ApiNetworkResponse<{ message: string }> {
    error: true;
}

export type ApiResponse<T> = ApiErrorResponse | ApiSuccessResponse<T>;

export type Scope =
    | 'LevelModify'
    | 'RecordModify'
    | 'PackModify'
    | 'PackTierModify'
    | 'PlaceholderCreate'
    | 'UserModify'
    | 'UserBan';

export interface ApiKeyResponse {
    api_key: string;
    expires: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    pages: number;
    page: number;
    per_page: number;
}
