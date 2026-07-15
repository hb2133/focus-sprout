import type { ResetConfirmLayeredPanelBindings } from '@/panels/layered/ResetConfirmLayeredPanel/ResetConfirmLayeredPanelInterface';
import { CreateResetConfirmLayeredPanelController } from '@/panels/layered/ResetConfirmLayeredPanel/controller/ResetConfirmLayeredPanelController';
import { ResetPromptSection } from '@/panels/layered/ResetConfirmLayeredPanel/sections/ResetPromptSection/ResetPromptSection';

interface ResetConfirmLayeredPanelProps
{
    Bindings: ResetConfirmLayeredPanelBindings;
}

export function ResetConfirmLayeredPanel(Props: ResetConfirmLayeredPanelProps)
{
    const Controller = CreateResetConfirmLayeredPanelController(Props.Bindings);

    return (
        <div
            className="LayeredCard ResetConfirmCard"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ResetConfirmLayeredPanelTitle"
            data-ue-page="ResetConfirmLayeredPanel"
        >
            <ResetPromptSection
                OnCancel={Controller.OnCancel}
                OnConfirm={Controller.OnConfirm}
            />
        </div>
    );
}
