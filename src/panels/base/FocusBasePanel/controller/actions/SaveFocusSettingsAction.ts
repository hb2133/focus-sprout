import { FocusTimerManager } from '@/managers/focus_timer/FocusTimerManager';
import type
{
    FocusTimerSettings,
    FocusTimerState,
} from '@/managers/focus_timer/FocusTimerTypes';

export async function SaveFocusSettingsAction(
    Settings: FocusTimerSettings,
): Promise<FocusTimerState>
{
    try
    {
        return await FocusTimerManager.SaveSettings(Settings);
    }
    catch(Cause: unknown)
    {
        throw new Error('FOCUS_SETTINGS_SAVE_FAILED', { cause: Cause });
    }
}
