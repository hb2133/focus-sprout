import type { ResetConfirmLayeredPanelBindings } from '@/panels/layered/ResetConfirmLayeredPanel/ResetConfirmLayeredPanelInterface';

export interface ResetConfirmLayeredPanelControllerResult
{
    OnConfirm: () => void;
    OnCancel: () => void;
}

export function CreateResetConfirmLayeredPanelController(
    Bindings: ResetConfirmLayeredPanelBindings,
): ResetConfirmLayeredPanelControllerResult
{
    return {
        OnConfirm: () => Bindings.OnComplete({ Confirmed: true }),
        OnCancel: Bindings.OnRequestClose,
    };
}
