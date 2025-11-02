import { container, text } from '@takumi-rs/helpers';
import { PackOGData } from '@/types/og';
import { ListOfLevelsNode } from '@/routes/og/nodes';

export const PackInfoNode = async ({ pack, tier }: PackOGData) => {
    return container({
        style: {
            width: 1200,
            height: 630,
            backgroundImage:
                'linear-gradient(to bottom right, #141e30, #243b55)',
            borderRadius: 50,
            color: 0xffffff,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
        },
        children: [
            container({
                style: {
                    flexDirection: 'column',
                    gap: 4,
                },
                children: [
                    text(pack.name, {
                        fontSize: 56,
                        fontWeight: 800,
                    }),
                    text(tier.name, {
                        textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
                        fontSize: 32,
                        fontWeight: 600,
                        backgroundImage: tier.color,
                        padding: 8,
                        borderRadius: 12,
                    }),
                ],
            }),
            await ListOfLevelsNode(pack.levels, 'LEVELS IN THIS PACK'),
        ],
    });
};
