import { Clan } from '@/types/clans';

export interface Role {
    id: number;
    privilege_level: number;
    role_desc: string;
}

export interface RoleResolved extends Role {
    users: User[];
}

export interface BaseUser {
    id: string;
    username: string;
    global_name: string;
}

export interface BaseUserWithCountry extends BaseUser {
    country?: string;
}

export interface User extends BaseUser {
    discord_id: string;
    placeholder?: boolean;
    country?: number;
    ban_level: number;
    discord_avatar?: string;
    discord_banner?: string;
    discord_accent_color?: string;
    created_at?: string;
    description: string;
    background_level?: number;
}

export interface UserResolved extends User {
    clan?: Clan;
    roles: Role[];
    scopes: Scope[];
}

export interface UpdateUser {
    global_name?: string;
    discord_id?: string;
    description?: string;
    country?: number;
    ban_level?: number;
    username?: string;
}

export interface UsersResponse {
    page: number;
    per_page: number;
    pages: number;
    data: User[];
}

export interface Notification {
    id: string;
    user_id: string;
    content: string;
    notification_type: 'Info' | 'Success' | 'Failure';
    created_at: string;
}
