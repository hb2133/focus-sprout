import
{
    DefaultFocusTimerSettings,
    type FocusTimerMode,
    type FocusTimerSettings,
    type FocusTimerState,
} from '@/managers/focus_timer/FocusTimerTypes';

export function GetDateKey(DateValue: Date = new Date()): string
{
    const Year = DateValue.getFullYear();
    const Month = String(DateValue.getMonth() + 1).padStart(2, '0');
    const Day = String(DateValue.getDate()).padStart(2, '0');
    return `${Year}-${Month}-${Day}`;
}

export function GetModeDurationSeconds(
    Mode: FocusTimerMode,
    Settings: FocusTimerSettings,
): number
{
    const Minutes = Mode === 'focus'
        ? Settings.FocusMinutes
        : Settings.BreakMinutes;
    return Minutes * 60;
}

export function CreateDefaultFocusTimerState(Now: number = Date.now()): FocusTimerState
{
    return {
        Mode: 'focus',
        Status: 'idle',
        RemainingSeconds: DefaultFocusTimerSettings.FocusMinutes * 60,
        EndsAt: null,
        Settings: { ...DefaultFocusTimerSettings },
        DailyRecords: {},
        UpdatedAt: Now,
    };
}

export function GetTodayCompletedSessions(State: FocusTimerState): number
{
    return State.DailyRecords[GetDateKey()] ?? 0;
}
