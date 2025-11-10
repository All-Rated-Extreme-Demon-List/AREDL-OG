import { BaseLevel } from '@/types/levels';
import { BaseUser } from '@/types/users';

export interface ProfileOGData {
    user: BaseUser;
    clanTag?: string;
    topCompletedLevels: BaseLevel[];
    globalRank?: number;
    countryRank?: number;
    completedExtremesCount?: number;
    createdCount?: number;
    packsCount?: number;
}
