import { PublicRecordResolved } from '@/types/submissions';
import { User } from '@/types/users';
import { Pack } from '@/types/packs';

export interface Level {
    id: string;
    name: string;
}

export interface BaseLevel extends Level {
    position: number;
    description?: string;
    publisher_id: string;
    points: number;
    legacy: boolean;
    level_id: number;
    two_player: boolean;
    edel_enjoyment?: number;
    is_edel_pending?: boolean;
    gddl_tier?: number;
    nlw_tier?: string;
    tags?: Tags[];
    song?: string;
}

export interface ProfileMergedLevel extends BaseLevel {
    published: boolean;
    created: boolean;
}

export interface ResolvedLevel extends BaseLevel {
    publisher: User;
    verifications: PublicRecordResolved[];
}

export interface CountryClanProfileLevel extends BaseLevel {
    user: User;
}

export interface IDLLevel {
    id: string;
    legacy: boolean;
    name: string;
    packs: Array<Pack>;
    position: number;
    publisher: User;
    formerRank: number;
}

export interface LevelPlace {
    name: string;
    description?: string;
    position: number;
    publisher_id: string;
    level_id: string;
    two_player: boolean;
    legacy: boolean;
    tags?: Tags[];
}

export interface LevelUpdate {
    name?: string;
    position?: number;
    description?: string;
    tags?: string[];
    two_player?: boolean;
    publisher_id?: string;
    legacy?: boolean;
}

export type LevelLDMStatus = 'Published' | 'Allowed' | 'Banned';
export type LevelLDMType = 'Bugfix' | 'Ldm' | 'GlobedCopy' | 'Other';

export interface LevelLDM {
    id: string;
    level_id: string;
    ldm_id: number;
    id_type: LevelLDMType;
    status: LevelLDMStatus;
    added_by: string;
    description?: string;
}
