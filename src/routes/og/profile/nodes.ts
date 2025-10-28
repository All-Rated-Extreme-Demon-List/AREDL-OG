import { container, rgba, text } from '@takumi-rs/helpers';
import { fetchAssets, getCardLevelThumbnail } from '@/utils';
import { BaseLevel } from '@/types/levels';
import { levelNode } from '@/routes/og/nodes';

export const TopCompletedLevelsNode = async (levels: BaseLevel[]) => {
    const levelsThumbnails = await fetchAssets(
        levels.map((level) => ({
            path: getCardLevelThumbnail(level.level_id),
            external: true,
        })),
    );
    return container({
        style: {
            flexDirection: 'column',
            gap: 8,
        },
        children: [
            container({
                style: {
                    flexDirection: 'column',
                },
                children: [
                    text('HARDEST COMPLETIONS', {
                        fontSize: 18,
                        color: rgba(255, 255, 255, 0.7),
                    }),
                    container({
                        style: {
                            padding: 1,
                            backgroundColor: rgba(255, 255, 255, 0.5),
                        },
                    }),
                ],
            }),
            ...levels.map((level, index) =>
                levelNode({ level, thumbnailPath: levelsThumbnails[index] }),
            ),
        ],
    });
};
