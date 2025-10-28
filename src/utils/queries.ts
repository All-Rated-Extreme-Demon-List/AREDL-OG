import type { ProfileOGData } from '@/types/og';
import type { Profile } from '@/types/profiles';
import { send } from '@/utils/api';

export async function getUserProfile(
    env: CloudflareBindings,
    list: 'classic' | 'platformer',
    userId: string,
): Promise<ProfileOGData> {
    const profile = await send<Profile>(
        env,
        `/${list == 'classic' ? 'aredl' : 'arepl'}/profile/${encodeURIComponent(userId)}`,
    );

    const topCompletedLevels = [
        ...profile.records.map((record) => record.level),
        ...profile.verified.map((record) => record.level),
    ]
        .sort((a, b) => (a.position || 0) - (b.position || 0))
        .slice(0, 4);

    const createdCount = new Set<string>(
        profile.created.map((l) => l.id),
    ).union(new Set<string>(profile.published.map((l) => l.id))).size;

    const packsCount = profile.packs.length;

    return {
        profile,
        topCompletedLevels,
        createdCount,
        packsCount,
    } as ProfileOGData;
}
