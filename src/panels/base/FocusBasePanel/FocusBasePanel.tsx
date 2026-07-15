import { PanelLayerHost, type PanelLayerEntry } from '@/app/panel_layer/PanelLayerHost';
import { FocusSproutStrings } from '@/core/localization/FocusSproutStrings';
import { UseFocusBasePanelController } from '@/panels/base/FocusBasePanel/controller/FocusBasePanelController';
import
{
    FormatTimerSeconds,
    GetCompletedSessions,
    GetEncouragement,
    GetModeLabel,
    GetPlantStage,
    GetPrimaryActionLabel,
    IsDailyGoalComplete,
} from '@/panels/base/FocusBasePanel/controller/FocusBasePanelState';
import { DailyProgressSection } from '@/panels/base/FocusBasePanel/sections/DailyProgressSection/DailyProgressSection';
import { HeaderSection } from '@/panels/base/FocusBasePanel/sections/HeaderSection/HeaderSection';
import { PlantSection } from '@/panels/base/FocusBasePanel/sections/PlantSection/PlantSection';
import { TimerActionSection } from '@/panels/base/FocusBasePanel/sections/TimerActionSection/TimerActionSection';
import { TimerSection } from '@/panels/base/FocusBasePanel/sections/TimerSection/TimerSection';
import { ResetConfirmLayeredPanel } from '@/panels/layered/ResetConfirmLayeredPanel/ResetConfirmLayeredPanel';
import { SettingsLayeredPanel } from '@/panels/layered/SettingsLayeredPanel/SettingsLayeredPanel';
import './FocusBasePanel.css';

export function FocusBasePanel()
{
    const Controller = UseFocusBasePanelController();
    const CompletedSessions = GetCompletedSessions(Controller.TimerState);
    const ModeLabel = GetModeLabel(Controller.TimerState);
    const LayerEntries: PanelLayerEntry[] = Controller.LayeredPanelStack.map((PanelId) =>
    {
        if(PanelId === 'settings')
        {
            return {
                PanelId,
                Dismissible: true,
                OnRequestClose: () => Controller.OnCloseLayeredPanel(PanelId),
                Content: (
                    <SettingsLayeredPanel
                        Payload={{
                            FocusMinutes: Controller.TimerState.Settings.FocusMinutes,
                            BreakMinutes: Controller.TimerState.Settings.BreakMinutes,
                        }}
                        Bindings={{
                            OnComplete: (Result) => Controller.OnSaveSettings(
                                Result.FocusMinutes,
                                Result.BreakMinutes,
                            ),
                            OnRequestClose: () => Controller.OnCloseLayeredPanel(PanelId),
                        }}
                    />
                ),
            };
        }

        return {
            PanelId,
            Dismissible: true,
            OnRequestClose: () => Controller.OnCloseLayeredPanel(PanelId),
            Content: (
                <ResetConfirmLayeredPanel
                    Bindings={{
                        OnComplete: (Result) =>
                        {
                            if(Result.Confirmed)
                            {
                                Controller.OnConfirmReset();
                            }
                        },
                        OnRequestClose: () => Controller.OnCloseLayeredPanel(PanelId),
                    }}
                />
            ),
        };
    });

    return (
        <main className="FocusBasePanel" data-ue-page="FocusBasePanel">
            <HeaderSection
                ModeLabel={ModeLabel}
                OnOpenSettings={Controller.OnOpenSettings}
            />
            <PlantSection
                PlantStage={GetPlantStage(Controller.TimerState)}
                CompletedSessions={CompletedSessions}
                IsGoalComplete={IsDailyGoalComplete(Controller.TimerState)}
            />
            <TimerSection
                FormattedTime={FormatTimerSeconds(Controller.DisplaySeconds)}
                ModeLabel={ModeLabel}
                Status={Controller.TimerState.Status}
            />
            <TimerActionSection
                PrimaryLabel={GetPrimaryActionLabel(Controller.TimerState)}
                IsBusy={Controller.IsBusy || Controller.IsLoading}
                OnPrimaryAction={Controller.OnPrimaryAction}
                OnRequestReset={Controller.OnRequestReset}
            />
            {Controller.ErrorMessage !== null && (
                <p className="PanelError" role="status">{Controller.ErrorMessage}</p>
            )}
            {Controller.IsLoading && (
                <p className="VisuallyHidden" role="status">{FocusSproutStrings.Loading}</p>
            )}
            <DailyProgressSection
                CompletedSessions={CompletedSessions}
                DailyGoal={Controller.TimerState.Settings.DailyGoal}
                Encouragement={GetEncouragement(Controller.TimerState)}
            />
            <PanelLayerHost Entries={LayerEntries} />
        </main>
    );
}
