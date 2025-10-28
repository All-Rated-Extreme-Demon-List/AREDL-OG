import type { BaseUser } from '@/types/users';
export type Clan = {
    id: string;
    global_name: string;
    tag: string;
    description?: string;
    created_at: string;
    updated_at: string;
};

export interface ClansResponse {
    page: number;
    per_page: number;
    pages: number;
    data: Clan[];
}

export interface ClanMember extends BaseUser {
    discord_id: string;
    discord_avatar: string;
    role: number;
    created_at: string;
}

export type ClanInvite = {
    id: string;
    clan_id: string;
    user_id: string;
    invited_by: string;
    created_at: string;
    updated_at: string;
    clan: Clan;
};
