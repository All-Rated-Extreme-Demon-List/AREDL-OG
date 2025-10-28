import { container, image, percentage, rgba, text } from '@takumi-rs/helpers';
import {
    fromNumeric,
    getCountryFlagUrl,
    getCountryName,
} from '@/utils/countries';
import { fetchAssets, getAvatarUrl, getFullLevelThumbnail } from '@/utils';
import { Profile } from '@/types/profiles';
import { ProfileOGData } from '@/types/og';
import { TopCompletedLevelsNode } from '@/routes/og/profile/nodes';
import { iconNode, IconNodeProps } from '@/routes/og/nodes';

export const UserInfoNode = async (profile: Profile) => {
    const clan = profile?.clan ? `[${profile.clan.tag}] ` : '';
    const name = profile?.global_name || profile?.username || 'Unknown User';
    const fullname = `${clan}${name}`;
    const description =
        profile?.description || "This user hasn't provided a description yet.";

    const countryInfo = profile?.country
        ? fromNumeric(profile?.country)
        : undefined;

    const [avatarDataUrl, countryFlagDataUrl] = await fetchAssets([
        { path: getAvatarUrl(profile), external: true },
        {
            path: profile?.country
                ? getCountryFlagUrl(fromNumeric(profile?.country))
                : null,
        },
    ]);
    return container({
        style: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
        },
        children: [
            image({
                src: avatarDataUrl ?? '',
                style: {
                    width: 220,
                    height: 220,
                    borderRadius: percentage(50),
                    borderColor: rgba(255, 255, 255, 0.08),
                    borderWidth: 2,
                },
            }),

            container({
                style: {
                    flexDirection: 'column',
                    maxWidth: 800,
                    gap: 4,
                },
                children: [
                    text(fullname, {
                        fontSize: 56,
                        fontWeight: 800,
                    }),
                    container({
                        style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 16,
                        },
                        children: [
                            image({
                                src: countryFlagDataUrl ?? '',
                                width: 43,
                                height: 32,
                                style: {
                                    width: 43,
                                    height: 32,
                                    borderRadius: 4,
                                },
                            }),
                            text(
                                countryInfo
                                    ? `${getCountryName(countryInfo)} ${profile.rank.country_rank ? `(#${profile.rank.country_rank})` : ''}`
                                    : 'Unknown Country',
                                {
                                    fontSize: 24,
                                },
                            ),
                        ],
                    }),
                    text(description, {
                        fontSize: 18,
                        color: rgba(203, 213, 225, 1),
                    }),
                ],
            }),
        ],
    });
};

export const userProfileNode = async ({
    profile,
    createdCount,
    packsCount,
    topCompletedLevels,
}: ProfileOGData) => {
    const [
        backgroundDataUrl,
        iconGlobalRank,
        iconExtremes,
        iconPacks,
        iconCreated,
    ] = await fetchAssets([
        {
            path:
                topCompletedLevels.length > 0
                    ? getFullLevelThumbnail(topCompletedLevels[0].level_id)
                    : null,
            external: true,
        },
        { path: 'assets/globalRank.webp' },
        { path: 'assets/Extreme_Demon.webp' },
        { path: 'assets/packs.webp' },
        { path: 'assets/creatorpoints.webp' },
    ]);

    const badges: IconNodeProps[] = [
        {
            iconPath: iconGlobalRank,
            title: 'GLOBAL RANK',
            data: profile?.rank?.raw_rank ? `#${profile.rank.raw_rank}` : 'N/A',
        },
        {
            iconPath: iconExtremes,
            title: 'COMPLETED EXTREMES',
            data: profile.rank.extremes ? String(profile.rank.extremes) : 'N/A',
        },
        {
            iconPath: iconPacks,
            title: 'COMPLETED PACKS',
            data: packsCount ? String(packsCount) : 'N/A',
        },
        {
            iconPath: iconCreated,
            title: 'CREATED LEVELS',
            data: createdCount ? String(createdCount) : 'N/A',
        },
    ];

    return container({
        style: {
            width: 1200,
            height: 630,
            backgroundColor: '#0b0d12',
            borderRadius: 50,
            color: 0xffffff,
            padding: 16,
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
        },
        children: [
            image({
                src: backgroundDataUrl ?? '',
                height: 630,
                width: 1200,
                style: {
                    position: 'absolute',
                    inset: [0, 0, 0, 0],
                    filter: 'opacity(0.05)',
                },
            }),
            await UserInfoNode(profile),
            // Lower section
            container({
                style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                },
                children: [
                    container({
                        style: {
                            flexDirection: 'column',
                            gap: 8,
                        },
                        children: badges.map((badge) => iconNode(badge)),
                    }),
                    await TopCompletedLevelsNode(
                        topCompletedLevels.slice(0, 4),
                    ),
                ],
            }),
        ],
    });
};
