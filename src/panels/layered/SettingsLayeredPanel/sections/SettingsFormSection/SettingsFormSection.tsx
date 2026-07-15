import { FocusSproutStrings } from '@/core/localization/FocusSproutStrings';

interface SettingsFormSectionProps
{
    FocusMinutes: string;
    BreakMinutes: string;
    ErrorMessage: string | null;
    OnFocusMinutesChange: (Value: string) => void;
    OnBreakMinutesChange: (Value: string) => void;
    OnCancel: () => void;
    OnSubmit: () => void;
}

export function SettingsFormSection(Props: SettingsFormSectionProps)
{
    return (
        <section
            className="SettingsFormSection"
            data-ue-component="SettingsFormSection"
            data-ue-root
        >
            <label>
                <span>{FocusSproutStrings.FocusMinutes}</span>
                <input
                    type="number"
                    min="1"
                    max="60"
                    value={Props.FocusMinutes}
                    onChange={(Event) => Props.OnFocusMinutesChange(Event.currentTarget.value)}
                />
            </label>
            <label>
                <span>{FocusSproutStrings.BreakMinutes}</span>
                <input
                    type="number"
                    min="1"
                    max="60"
                    value={Props.BreakMinutes}
                    onChange={(Event) => Props.OnBreakMinutesChange(Event.currentTarget.value)}
                />
            </label>
            <p className={Props.ErrorMessage === null ? 'FormHint' : 'FormHint IsError'}>
                {Props.ErrorMessage ?? FocusSproutStrings.MinutesHint}
            </p>
            <div className="LayerActions">
                <button className="SecondaryButton" type="button" onClick={Props.OnCancel}>
                    {FocusSproutStrings.Cancel}
                </button>
                <button className="PrimaryButton Compact" type="button" onClick={Props.OnSubmit}>
                    {FocusSproutStrings.Save}
                </button>
            </div>
        </section>
    );
}
