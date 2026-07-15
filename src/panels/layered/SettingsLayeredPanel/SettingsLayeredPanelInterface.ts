export interface SettingsLayeredPanelPayload
{
    FocusMinutes: number;
    BreakMinutes: number;
}

export interface SettingsLayeredPanelResult
{
    FocusMinutes: number;
    BreakMinutes: number;
}

export interface SettingsLayeredPanelBindings
{
    OnComplete: (Result: SettingsLayeredPanelResult) => void;
    OnRequestClose: () => void;
}
