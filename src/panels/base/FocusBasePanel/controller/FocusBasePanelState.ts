import { FocusSproutStrings } from '@/core/localization/FocusSproutStrings';
import
{
    CreateDefaultFocusTimerState,
    GetTodayCompletedSessions,
} from '@/managers/focus_timer/FocusTimerState';
import type { FocusTimerState } from '@/managers/focus_timer/FocusTimerTypes';

export const PlantStages = ['🌰', '🌱', '🌿', '🌳'] as const;

export function GetDisplaySeconds(State: FocusTimerState, Now: number): number
{
    if(State.Status !== 'running' || State.EndsAt === null)
    {
        return State.RemainingSeconds;
    }
    return Math.max(0, Math.ceil((State.EndsAt - Now) / 1000));
}

export function FormatTimerSeconds(TotalSeconds: number): string
{
    const Minutes = Math.floor(TotalSeconds / 60);
    const Seconds = TotalSeconds % 60;
    return `${String(Minutes).padStart(2, '0')}:${String(Seconds).padStart(2, '0')}`;
}

export function GetPlantStage(State: FocusTimerState): string
{
    const CompletedSessions = GetTodayCompletedSessions(State);
    return PlantStages[Math.min(PlantStages.length - 1, CompletedSessions)];
}

export function IsDailyGoalComplete(State: FocusTimerState): boolean
{
    return GetTodayCompletedSessions(State) >= State.Settings.DailyGoal;
}

export function GetModeLabel(State: FocusTimerState): string
{
    return State.Mode === 'focus'
        ? FocusSproutStrings.FocusMode
        : FocusSproutStrings.BreakMode;
}

export function GetCompletedSessions(State: FocusTimerState): number
{
    return GetTodayCompletedSessions(State);
}

export function GetPrimaryActionLabel(State: FocusTimerState): string
{
    if(State.Status === 'running')
    {
        return FocusSproutStrings.Pause;
    }
    if(State.Status === 'paused')
    {
        return FocusSproutStrings.Resume;
    }
    return State.Mode === 'focus'
        ? FocusSproutStrings.StartFocus
        : FocusSproutStrings.StartBreak;
}

export function GetEncouragement(State: FocusTimerState): string
{
    const CompletedSessions = GetTodayCompletedSessions(State);
    if(CompletedSessions === 0)
    {
        return FocusSproutStrings.EncouragementStart;
    }
    if(CompletedSessions >= State.Settings.DailyGoal)
    {
        return FocusSproutStrings.EncouragementComplete;
    }
    return FocusSproutStrings.EncouragementGrowing;
}

export const InitialFocusTimerState = CreateDefaultFocusTimerState();
