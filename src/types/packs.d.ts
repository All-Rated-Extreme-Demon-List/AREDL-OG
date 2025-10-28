import { BaseLevel } from '@/types/levels';

export interface PackLevel extends BaseLevel {
    completed_by_user?: boolean;
}
export interface Pack {
    id: string;
    name: string;
    points: number;
    levels: PackLevel[];
}

export interface BasePackTier {
    id: string;
    name: string;
    color: string;
}

export interface PackTier extends BasePackTier {
    placement: number;
    packs: Pack[];
}

export interface LevelPack {
    id: string;
    name: string;
    tier: BasePackTier;
}

export interface ProfilePack extends LevelPack {
    points?: number;
    levels?: BaseLevel[];
}

export interface UpdatePackTier {
    name?: string;
    color?: string;
    placement?: number;
}

export interface UpdatePack {
    name?: string;
    tier?: string;
}
