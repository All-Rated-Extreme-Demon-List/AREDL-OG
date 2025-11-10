export interface BaseUser {
    id: string;
    username: string;
    global_name: string;
    description: string;
    country?: number;
    discord_id?: string;
    discord_avatar?: string;
}
