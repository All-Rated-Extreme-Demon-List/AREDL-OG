import { BaseLevel } from '@/types/levels';
import { BaseUser, BaseUserWithCountry, User } from '@/types/users';

export interface BaseRecord {
    id: string;
    mobile: boolean;
    video_url: string;
    created_at: string;
    updated_at: string;
    completion_time?: number;
}
export interface PublicRecordTemplate<T> extends BaseRecord {
    submitted_by: T;
}

export type PublicRecordUnresolved = PublicRecordTemplate<string>;
export type PublicRecordResolved = PublicRecordTemplate<BaseUser>;
export type PublicRecordResolvedWithCountry =
    PublicRecordTemplate<BaseUserWithCountry>;

export interface FullRecordUnresolved extends PublicRecordUnresolved {
    level: string;
    ldm_id?: number;
    raw_url?: string;
    mod_menu?: string;
    is_verification: boolean;
    reviewer_notes?: string;
    user_notes?: string;
    created_at: string;
    updated_at: string;
}

export interface ProfileRecord extends BaseRecord {
    level: BaseLevel;
}

export interface CountryClanProfileRecord extends ProfileRecord {
    user: User;
}

export interface ProfileMergedRecord extends ProfileRecord {
    is_verification: boolean;
}

export interface CountryClanProfileMergedRecord
    extends CountryClanProfileRecord {
    is_verification: boolean;
}

export interface ResolvedSubmission extends BaseRecord {
    level: ExtendedBaseLevel;
    submitted_by: BaseUser;
    ldm_id?: number;
    raw_url?: string;
    mod_menu?: string;
    status: 'Pending' | 'Claimed' | 'UnderConsideration' | 'Denied';
    reviewer_notes?: string;
    user_notes?: string;
    completion_time?: number;
}

export interface ExtendedBaseLevel extends BaseLevel {
    level_id: number;
}

export interface FullRecordUnresolvedWithLevelResolved
    extends FullRecordUnresolved {
    level: ExtendedBaseLevel;
}

export type SubmissionOrRecord =
    | ResolvedSubmission
    | FullRecordUnresolvedWithLevelResolved;

export interface SubmissionsResponse {
    page: number;
    per_page: number;
    pages: number;
    data: ResolvedSubmission[];
}

export interface FullRecordResponse {
    page: number;
    per_page: number;
    pages: number;
    data: FullRecordUnresolvedWithLevelResolved[];
}

export interface QueuePosition {
    position: number;
    total: number;
}

export interface QueueTotal {
    submissions_in_queue: number;
    uc_submissions: number;
    oldest_submission: string;
}

export interface SubmissionHistory {
    id: string;
    submission_id: string;
    record_id: string;
    status: 'Pending' | 'Claimed' | 'UnderConsideration' | 'Denied';
    timestamp: string;
    reviewer_notes?: string;
    user_notes?: string;
}

export type CompletionTime = {
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
};

export interface SubmissionGuideline {
    id: string;
    text: string;
    moderator: BaseUser;
    created_at: string;
}
