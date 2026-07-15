import { FocusSproutStrings } from '@/core/localization/FocusSproutStrings';

interface ResetPromptSectionProps
{
    OnCancel: () => void;
    OnConfirm: () => void;
}

export function ResetPromptSection(Props: ResetPromptSectionProps)
{
    return (
        <section
            className="ResetPromptSection"
            data-ue-component="ResetPromptSection"
            data-ue-root
        >
            <div className="ResetIcon" aria-hidden="true">↺</div>
            <h2 id="ResetConfirmLayeredPanelTitle">{FocusSproutStrings.ResetTitle}</h2>
            <p>{FocusSproutStrings.ResetDescription}</p>
            <div className="LayerActions StackedActions">
                <button className="PrimaryButton Compact" type="button" onClick={Props.OnCancel}>
                    {FocusSproutStrings.KeepFocusing}
                </button>
                <button className="TextButton Danger" type="button" onClick={Props.OnConfirm}>
                    {FocusSproutStrings.ConfirmReset}
                </button>
            </div>
        </section>
    );
}
