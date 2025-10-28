import { container, image, rgba, text } from '@takumi-rs/helpers';
import { BaseLevel } from '@/types/levels';

export type IconNodeProps = {
    iconPath?: string;
    title: string;
    data: string;
};

export const iconNode = ({ iconPath, title, data }: IconNodeProps) =>
    container({
        style: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
        },
        children: [
            image({
                src: iconPath ?? '',
                style: {
                    width: 48,
                    height: 48,
                },
            }),
            container({
                style: { flexDirection: 'column' },
                children: [
                    text(title, {
                        fontSize: 18,
                        color: rgba(156, 163, 175, 1),
                        fontWeight: 500,
                    }),
                    text(String(data), { fontSize: 28, fontWeight: 700 }),
                ],
            }),
        ],
    });

export type LevelNodeProps = {
    level: BaseLevel;
    thumbnailPath?: string;
};

export const levelNode = ({ level, thumbnailPath }: LevelNodeProps) =>
    container({
        style: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            position: 'relative',
            width: 500,
            height: 64,
            borderRadius: 16,
            overflow: 'hidden',
            paddingLeft: 16,
        },
        children: [
            image({
                src: thumbnailPath ?? '',
                style: {
                    width: 500,
                    height: 64,
                    position: 'absolute',
                    inset: [0, 0, 0, 0],
                    borderRadius: 16,
                },
            }),
            container({
                style: {
                    position: 'relative',
                    width: 500,
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                },
                children: [
                    text(`#${level.position} - ${level.name}`, {
                        position: 'absolute',
                        transform: ' translate(2px,2px)',
                        fontWeight: 800,
                        fontSize: 26,
                        color: 'rgba(0,0,0,0.8)',
                    }),
                    text(`#${level.position} - ${level.name}`, {
                        position: 'absolute',
                        fontWeight: 800,
                        fontSize: 26,
                    }),
                ],
            }),
        ],
    });
