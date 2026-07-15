export type FocusTimerMode = 'focus' | 'break';

export type FocusTimerStatus = 'idle' | 'running' | 'paused';

export interface FocusTimerSettings
{
    FocusMinutes: number;
    BreakMinutes: number;
    DailyGoal: number;
}

export interface FocusTimerState
{
    Mode: FocusTimerMode;
    Status: FocusTimerStatus;
    RemainingSeconds: number;
    EndsAt: number | null;
    Settings: FocusTimerSettings;
    DailyRecords: Record<string, number>;
    UpdatedAt: number;
}

export const DefaultFocusTimerSettings: FocusTimerSettings =
{
    FocusMinutes: 25,
    BreakMinutes: 5,
    DailyGoal: 4,
};
