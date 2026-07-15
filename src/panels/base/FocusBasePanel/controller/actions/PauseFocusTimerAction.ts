import { FocusTimerManager } from '@/managers/focus_timer/FocusTimerManager';
import type { FocusTimerState } from '@/managers/focus_timer/FocusTimerTypes';

export async function PauseFocusTimerAction(): Promise<FocusTimerState>
{
    try
    {
        return await FocusTimerManager.Pause();
    }
    catch(Cause: unknown)
    {
        throw new Error('FOCUS_TIMER_PAUSE_FAILED', { cause: Cause });
    }
}
