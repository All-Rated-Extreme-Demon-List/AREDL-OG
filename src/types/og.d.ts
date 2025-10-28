import { BaseLevel } from '@/types/levels';
import { Profile } from '@/types/profiles';

export interface ProfileOGData {
    profile: Profile;
    topCompletedLevels: BaseLevel[];
    createdCount: number;
    packsCount: number;
}
