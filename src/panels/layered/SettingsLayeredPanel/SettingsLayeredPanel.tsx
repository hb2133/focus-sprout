import { FocusSproutStrings } from '@/core/localization/FocusSproutStrings';
import type
{
    SettingsLayeredPanelBindings,
    SettingsLayeredPanelPayload,
} from '@/panels/layered/SettingsLayeredPanel/SettingsLayeredPanelInterface';
import { UseSettingsLayeredPanelController } from '@/panels/layered/SettingsLayeredPanel/controller/SettingsLayeredPanelController';
import { SettingsFormSection } from '@/panels/layered/SettingsLayeredPanel/sections/SettingsFormSection/SettingsFormSection';

interface SettingsLayeredPanelProps
{
    Payload: SettingsLayeredPanelPayload;
    Bindings: SettingsLayeredPanelBindings;
}

export function SettingsLayeredPanel(Props: SettingsLayeredPanelProps)
{
    const Controller = UseSettingsLayeredPanelController(Props.Payload, Props.Bindings);

    return (
        <div
            className="LayeredCard SettingsLayeredCard"
            role="dialog"
            aria-modal="true"
            aria-labelledby="SettingsLayeredPanelTitle"
            data-ue-page="SettingsLayeredPanel"
        >
            <div className="LayerHandle" aria-hidden="true" />
            <h2 id="SettingsLayeredPanelTitle">{FocusSproutStrings.TimerSettings}</h2>
            <SettingsFormSection
                FocusMinutes={Controller.FocusMinutes}
                BreakMinutes={Controller.BreakMinutes}
                ErrorMessage={Controller.ErrorMessage}
                OnFocusMinutesChange={Controller.OnFocusMinutesChange}
                OnBreakMinutesChange={Controller.OnBreakMinutesChange}
                OnCancel={Props.Bindings.OnRequestClose}
                OnSubmit={Controller.OnSubmit}
            />
        </div>
    );
}
