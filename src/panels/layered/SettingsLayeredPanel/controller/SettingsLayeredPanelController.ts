import { useState } from 'react';
import { FocusSproutStrings } from '@/core/localization/FocusSproutStrings';
import type
{
    SettingsLayeredPanelBindings,
    SettingsLayeredPanelPayload,
} from '@/panels/layered/SettingsLayeredPanel/SettingsLayeredPanelInterface';

export interface SettingsLayeredPanelControllerResult
{
    FocusMinutes: string;
    BreakMinutes: string;
    ErrorMessage: string | null;
    OnFocusMinutesChange: (Value: string) => void;
    OnBreakMinutesChange: (Value: string) => void;
    OnSubmit: () => void;
}

export function UseSettingsLayeredPanelController(
    Payload: SettingsLayeredPanelPayload,
    Bindings: SettingsLayeredPanelBindings,
): SettingsLayeredPanelControllerResult
{
    const [FocusMinutes, SetFocusMinutes] = useState(String(Payload.FocusMinutes));
    const [BreakMinutes, SetBreakMinutes] = useState(String(Payload.BreakMinutes));
    const [ErrorMessage, SetErrorMessage] = useState<string | null>(null);

    const OnSubmit = (): void =>
    {
        const ParsedFocusMinutes = Number(FocusMinutes);
        const ParsedBreakMinutes = Number(BreakMinutes);
        const IsValid = Number.isInteger(ParsedFocusMinutes)
            && Number.isInteger(ParsedBreakMinutes)
            && ParsedFocusMinutes >= 1
            && ParsedFocusMinutes <= 60
            && ParsedBreakMinutes >= 1
            && ParsedBreakMinutes <= 60;
        if(IsValid === false)
        {
            SetErrorMessage(FocusSproutStrings.SettingsError);
            return;
        }

        Bindings.OnComplete({
            FocusMinutes: ParsedFocusMinutes,
            BreakMinutes: ParsedBreakMinutes,
        });
    };

    return {
        FocusMinutes,
        BreakMinutes,
        ErrorMessage,
        OnFocusMinutesChange: SetFocusMinutes,
        OnBreakMinutesChange: SetBreakMinutes,
        OnSubmit,
    };
}
