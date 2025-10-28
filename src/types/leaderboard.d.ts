import { Clan } from '@/types/clans';
import { Level } from '@/types/levels';
import { User } from '@/types/users';

interface LeaderboardUserEntry {
    rank: number;
    extremes_rank: number;
    raw_rank: number;
    country_rank: number;
    country_extremes_rank: number;
    country_raw_rank: number;
    user: User;
    country?: number;
    total_points: number;
    pack_points: number;
    hardest: Level;
    extremes: number;
    clan?: Clan;
}

interface LeaderboardCountryEntry {
    rank: number;
    extremes_rank: number;
    country: number;
    level_points: number;
    extremes: number;
    members_count: number;
    hardest: Level;
}

interface LeaderboardClanEntry {
    rank: number;
    extremes_rank: number;
    clan: Clan;
    level_points: number;
    extremes: number;
    members_count: number;
    hardest: Level;
}

export type LeaderboardEntry =
    | LeaderboardUserEntry
    | LeaderboardCountryEntry
    | LeaderboardClanEntry;

export type LeaderboardResponse = {
    page: number;
    per_page: number;
    pages: number;
    last_refreshed: string;
    data: LeaderboardEntry[];
};
