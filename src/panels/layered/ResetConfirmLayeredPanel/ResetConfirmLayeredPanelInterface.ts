export interface ResetConfirmLayeredPanelResult
{
    Confirmed: boolean;
}

export interface ResetConfirmLayeredPanelBindings
{
    OnComplete: (Result: ResetConfirmLayeredPanelResult) => void;
    OnRequestClose: () => void;
}
