import { FocusSproutStrings } from '@/core/localization/FocusSproutStrings';

interface TimerActionSectionProps
{
    PrimaryLabel: string;
    IsBusy: boolean;
    OnPrimaryAction: () => void;
    OnRequestReset: () => void;
}

export function TimerActionSection(Props: TimerActionSectionProps)
{
    return (
        <section
            className="TimerActionSection"
            data-ue-component="TimerActionSection"
            data-ue-root
        >
            <button
                className="PrimaryButton"
                type="button"
                disabled={Props.IsBusy}
                onClick={Props.OnPrimaryAction}
            >
                <span className="PrimaryButtonIcon" aria-hidden="true">●</span>
                {Props.PrimaryLabel}
            </button>
            <button
                className="TextButton"
                type="button"
                disabled={Props.IsBusy}
                onClick={Props.OnRequestReset}
            >
                {FocusSproutStrings.Reset}
            </button>
        </section>
    );
}
