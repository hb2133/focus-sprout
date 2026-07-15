import type { FocusTimerState } from '@/managers/focus_timer/FocusTimerTypes';

export type FocusLayeredPanelId = 'settings' | 'reset-confirm';

export interface FocusBasePanelControllerResult
{
    TimerState: FocusTimerState;
    DisplaySeconds: number;
    IsLoading: boolean;
    IsBusy: boolean;
    ErrorMessage: string | null;
    LayeredPanelStack: FocusLayeredPanelId[];
    OnPrimaryAction: () => void;
    OnRequestReset: () => void;
    OnOpenSettings: () => void;
    OnCloseLayeredPanel: (PanelId: FocusLayeredPanelId) => void;
    OnConfirmReset: () => void;
    OnSaveSettings: (FocusMinutes: number, BreakMinutes: number) => void;
}
