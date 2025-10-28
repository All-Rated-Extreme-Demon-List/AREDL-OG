import { Clan } from '@/types/clans';
import {
    BaseLevel,
    CountryClanProfileLevel,
    ProfileMergedLevel,
} from '@/types/levels';
import {
    CountryClanProfileMergedRecord,
    CountryClanProfileRecord,
    ProfileMergedRecord,
    ProfileRecord,
} from '@/types/submissions';
import { Role, User } from '@/types/users';

export interface Profile extends User {
    ban_level: number;
    roles: Role[];
    rank: {
        rank: number;
        raw_rank: number;
        extremes_rank: number;
        country_rank: number;
        country_raw_rank: number;
        country_extremes_rank: number;
        total_points: number;
        pack_points: number;
        extremes: number;
    };
    packs: ProfilePack[];
    records: ProfileRecord[];
    verified: ProfileRecord[];
    created: BaseLevel[];
    published: BaseLevel[];
    clan?: Clan;
}

export interface ProfileMerged extends Profile {
    records: ProfileMergedRecord[];
    created: ProfileMergedLevel[];
}

export interface CountryClanProfile {
    rank: {
        rank: number;
        extremes_rank: number;
        level_points: number;
        extremes: number;
    };
    records: CountryClanProfileRecord[];
    verified: CountryClanProfileRecord[];
    published: CountryClanProfileLevel[];
}

export interface CountryClanProfileMerged extends CountryClanProfile {
    records: CountryClanProfileMergedRecord[];
    verified: CountryClanProfileMergedRecord[];
}

export interface CountryProfile extends CountryClanProfileMerged {
    country: number;
}

export interface ClanProfile extends CountryClanProfileMerged {
    clan: Clan;
}
