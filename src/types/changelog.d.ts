import { Level } from '@/types/levels';

interface HistoryEntry {
    position: number;
    position_diff: number;
    event: string;
    legacy: boolean;
    action_at: string;
    cause?: Level;
    grouped?: boolean;
    entries?: HistoryEntry[];
}

interface PlacedAction {
    Placed: {
        new_position: number;
        legacy: boolean;
    };
}

interface RaisedAction {
    Raised: {
        new_position: number;
        old_position: number;
    };
}

interface LoweredAction {
    Lowered: {
        new_position: number;
        old_position: number;
    };
}

interface RemovedAction {
    Removed: {
        old_position: number;
    };
}

interface SwappedAction {
    Swapped: {
        upper_position: number;
        upper_level: Level;
        other_level: Level;
    };
}

interface MovedToLegacyAction {
    MovedToLegacy: {
        new_position: number;
        old_position: number;
    };
}

interface MovedFromLegacyAction {
    MovedFromLegacy: {
        new_position: number;
        old_position: number;
    };
}

interface UnknownAction {
    Unknown: {
        new_position?: number | null;
        old_position?: number | null;
        legacy?: boolean | null;
    };
}

type ChangelogAction =
    | PlacedAction
    | RaisedAction
    | LoweredAction
    | RemovedAction
    | SwappedAction
    | MovedToLegacyAction
    | MovedFromLegacyAction
    | UnknownAction;

interface ChangelogEntry {
    action: ChangelogAction;
    created_at: string;
    affected_level: Level;
    level_above: Level;
    level_below: Level;
}

interface ChangelogResponse {
    page: number;
    per_page: number;
    pages: number;
    data: ChangelogEntry[];
}

export type { HistoryEntry, ChangelogResponse, ChangelogEntry };
