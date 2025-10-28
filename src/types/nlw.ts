export const nlwTiers = [
    'Beginner',
    'Easy',
    'Medium',
    'Hard',
    'Very Hard',
    'Insane',
    'Extreme',
    'Remorseless',
    'Relentless',
    'Terrifying',
    'Catastrophic',
    'Inexorable',
] as const;

export type NlwTier = (typeof nlwTiers)[number];
