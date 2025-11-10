import type { BaseUser } from '@/types/users';
import { env } from 'cloudflare:workers';

export const getAvatarUrl = (user: Partial<BaseUser> | null) =>
    user && user?.discord_avatar
        ? `https://cdn.discordapp.com/avatars/${user.discord_id}/${user.discord_avatar.replace('a_', '')}.webp`
        : null;

export const getFullLevelThumbnail = (levelId: number) => {
    return `https://raw.githubusercontent.com/All-Rated-Extreme-Demon-List/Thumbnails/main/og/levels/full/${levelId}.webp`;
};

export const getCardLevelThumbnail = (levelId: number) => {
    return `https://raw.githubusercontent.com/All-Rated-Extreme-Demon-List/Thumbnails/main/og/levels/cards/${levelId}.webp`;
};

export const trimStringToUndefined = (value: string | undefined) =>
    value?.trim() == '' ? undefined : value?.trim();

export const createObjectURL = async (blob: Blob) => {
    const bytes = await blob.bytes();
    let binary = '';
    for (let i = 0; i < bytes.length; i++)
        binary += String.fromCharCode(bytes[i]);
    return `data:${blob.type};base64,${btoa(binary)}`;
};

export const fetchAsset = async (path: string) => {
    const response = await env.ASSETS.fetch(`https://assets.local/${path}`);
    const blob = await response.blob();
    return createObjectURL(blob);
};

export const fetchExternalAsset = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return createObjectURL(blob);
};

export const fetchAssets = async (
    assets: {
        path?: string | null;
        external?: boolean;
    }[],
) =>
    Promise.all(
        assets.map((asset) =>
            asset.path
                ? (asset.external ? fetchExternalAsset : fetchAsset)(asset.path)
                : Promise.resolve(undefined),
        ),
    );
