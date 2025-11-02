import { BaseLevel } from '@/types/levels';
import { Pack, PackTier } from '@/types/packs';
import { Profile } from '@/types/profiles';

export interface ProfileOGData {
    profile: Profile;
    topCompletedLevels: BaseLevel[];
    createdCount: number;
    packsCount: number;
}

export interface PackOGData {
    pack: Pack;
    tier: PackTier;
}
