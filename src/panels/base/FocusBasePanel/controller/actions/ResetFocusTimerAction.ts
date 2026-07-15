import { FocusTimerManager } from '@/managers/focus_timer/FocusTimerManager';
import type { FocusTimerState } from '@/managers/focus_timer/FocusTimerTypes';

export async function ResetFocusTimerAction(): Promise<FocusTimerState>
{
    try
    {
        return await FocusTimerManager.Reset();
    }
    catch(Cause: unknown)
    {
        throw new Error('FOCUS_TIMER_RESET_FAILED', { cause: Cause });
    }
}
