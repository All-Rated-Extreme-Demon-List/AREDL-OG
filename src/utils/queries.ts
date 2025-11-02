import type { PackOGData, ProfileOGData } from '@/types/og';
import { Pack, PackTier } from '@/types/packs';
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

export async function getPack(
    env: CloudflareBindings,
    list: 'classic' | 'platformer',
    packId: string,
): Promise<Partial<PackOGData>> {
    const packtiers = await send<PackTier[]>(
        env,
        `/${list == 'classic' ? 'aredl' : 'arepl'}/pack-tiers`,
    );

    const { pack, tier } = (packtiers
        .map((tier) => ({
            pack: tier.packs.find((p) => p.id === packId),
            tier,
        }))
        .find(({ pack }) => pack !== undefined) as {
        pack?: Pack;
        tier?: PackTier;
    }) || { pack: undefined, tier: undefined };

    return {
        pack,
        tier,
    };
}
