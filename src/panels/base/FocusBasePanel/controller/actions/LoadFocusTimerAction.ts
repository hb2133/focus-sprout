import { FocusTimerManager } from '@/managers/focus_timer/FocusTimerManager';
import type { FocusTimerState } from '@/managers/focus_timer/FocusTimerTypes';

export async function LoadFocusTimerAction(): Promise<FocusTimerState>
{
    try
    {
        return await FocusTimerManager.Load();
    }
    catch(Cause: unknown)
    {
        throw new Error('FOCUS_TIMER_LOAD_FAILED', { cause: Cause });
    }
}
