import { BaseLevel } from '@/types/levels';

export interface Pack {
    id: string;
    name: string;
    points: number;
    levels: BaseLevel[];
}

export interface BasePackTier {
    id: string;
    name: string;
    color: string;
}

export interface PackOGData {
    pack: Pack;
    tier: BasePackTier;
}
