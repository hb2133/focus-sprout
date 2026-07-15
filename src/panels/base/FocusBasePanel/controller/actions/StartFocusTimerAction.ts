import { FocusTimerManager } from '@/managers/focus_timer/FocusTimerManager';
import type { FocusTimerState } from '@/managers/focus_timer/FocusTimerTypes';

export async function StartFocusTimerAction(): Promise<FocusTimerState>
{
    try
    {
        return await FocusTimerManager.Start();
    }
    catch(Cause: unknown)
    {
        throw new Error('FOCUS_TIMER_START_FAILED', { cause: Cause });
    }
}
