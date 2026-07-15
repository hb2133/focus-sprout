import { useCallback, useEffect, useMemo, useState } from 'react';
import { FocusSproutStrings } from '@/core/localization/FocusSproutStrings';
import { FocusTimerManager } from '@/managers/focus_timer/FocusTimerManager';
import type { FocusTimerState } from '@/managers/focus_timer/FocusTimerTypes';
import { LoadFocusTimerAction } from '@/panels/base/FocusBasePanel/controller/actions/LoadFocusTimerAction';
import { PauseFocusTimerAction } from '@/panels/base/FocusBasePanel/controller/actions/PauseFocusTimerAction';
import { ResetFocusTimerAction } from '@/panels/base/FocusBasePanel/controller/actions/ResetFocusTimerAction';
import { SaveFocusSettingsAction } from '@/panels/base/FocusBasePanel/controller/actions/SaveFocusSettingsAction';
import { StartFocusTimerAction } from '@/panels/base/FocusBasePanel/controller/actions/StartFocusTimerAction';
import
{
    GetDisplaySeconds,
    InitialFocusTimerState,
} from '@/panels/base/FocusBasePanel/controller/FocusBasePanelState';
import type
{
    FocusBasePanelControllerResult,
    FocusLayeredPanelId,
} from '@/panels/base/FocusBasePanel/controller/FocusBasePanelTypes';

export function UseFocusBasePanelController(): FocusBasePanelControllerResult
{
    const [TimerState, SetTimerState] = useState<FocusTimerState>(InitialFocusTimerState);
    const [Now, SetNow] = useState(0);
    const [IsLoading, SetIsLoading] = useState(true);
    const [IsBusy, SetIsBusy] = useState(false);
    const [ErrorMessage, SetErrorMessage] = useState<string | null>(null);
    const [LayeredPanelStack, SetLayeredPanelStack] = useState<FocusLayeredPanelId[]>([]);

    const RefreshState = useCallback(async (): Promise<void> =>
    {
        try
        {
            const LoadedState = await LoadFocusTimerAction();
            SetTimerState(LoadedState);
            SetNow(Date.now());
            SetErrorMessage(null);
        }
        catch
        {
            SetErrorMessage(FocusSproutStrings.TimerError);
        }
        finally
        {
            SetIsLoading(false);
        }
    }, []);

    useEffect(() =>
    {
        void RefreshState();
        return FocusTimerManager.Subscribe((UpdatedState) =>
        {
            SetTimerState(UpdatedState);
            SetNow(Date.now());
        });
    }, [RefreshState]);

    useEffect(() =>
    {
        if(TimerState.Status !== 'running')
        {
            return;
        }

        const TickId = window.setInterval(() =>
        {
            const CurrentTime = Date.now();
            SetNow(CurrentTime);
            if(TimerState.EndsAt !== null && TimerState.EndsAt <= CurrentTime)
            {
                void RefreshState();
            }
        }, 250);
        return () => window.clearInterval(TickId);
    }, [RefreshState, TimerState.EndsAt, TimerState.Status]);

    const RunTimerAction = useCallback(async (
        Action: () => Promise<FocusTimerState>,
    ): Promise<void> =>
    {
        SetIsBusy(true);
        try
        {
            SetTimerState(await Action());
            SetNow(Date.now());
            SetErrorMessage(null);
        }
        catch
        {
            SetErrorMessage(FocusSproutStrings.TimerError);
        }
        finally
        {
            SetIsBusy(false);
        }
    }, []);

    const OnPrimaryAction = useCallback((): void =>
    {
        const Action = TimerState.Status === 'running'
            ? PauseFocusTimerAction
            : StartFocusTimerAction;
        void RunTimerAction(Action);
    }, [RunTimerAction, TimerState.Status]);

    const OpenLayeredPanel = useCallback((PanelId: FocusLayeredPanelId): void =>
    {
        SetLayeredPanelStack((CurrentStack) => CurrentStack.includes(PanelId)
            ? CurrentStack
            : [...CurrentStack, PanelId]);
    }, []);

    const OnCloseLayeredPanel = useCallback((PanelId: FocusLayeredPanelId): void =>
    {
        SetLayeredPanelStack((CurrentStack) => CurrentStack.filter(
            (CurrentPanelId) => CurrentPanelId !== PanelId,
        ));
    }, []);

    const OnRequestReset = useCallback((): void =>
    {
        if(TimerState.Status === 'idle')
        {
            void RunTimerAction(ResetFocusTimerAction);
            return;
        }
        OpenLayeredPanel('reset-confirm');
    }, [OpenLayeredPanel, RunTimerAction, TimerState.Status]);

    const OnConfirmReset = useCallback((): void =>
    {
        OnCloseLayeredPanel('reset-confirm');
        void RunTimerAction(ResetFocusTimerAction);
    }, [OnCloseLayeredPanel, RunTimerAction]);

    const OnSaveSettings = useCallback((
        FocusMinutes: number,
        BreakMinutes: number,
    ): void =>
    {
        OnCloseLayeredPanel('settings');
        void RunTimerAction(() => SaveFocusSettingsAction({
            FocusMinutes,
            BreakMinutes,
            DailyGoal: TimerState.Settings.DailyGoal,
        }));
    }, [OnCloseLayeredPanel, RunTimerAction, TimerState.Settings.DailyGoal]);

    return useMemo(() => ({
        TimerState,
        DisplaySeconds: GetDisplaySeconds(TimerState, Now),
        IsLoading,
        IsBusy,
        ErrorMessage,
        LayeredPanelStack,
        OnPrimaryAction,
        OnRequestReset,
        OnOpenSettings: () => OpenLayeredPanel('settings'),
        OnCloseLayeredPanel,
        OnConfirmReset,
        OnSaveSettings,
    }), [
        ErrorMessage,
        IsBusy,
        IsLoading,
        LayeredPanelStack,
        Now,
        OnCloseLayeredPanel,
        OnConfirmReset,
        OnPrimaryAction,
        OnRequestReset,
        OnSaveSettings,
        OpenLayeredPanel,
        TimerState,
    ]);
}
