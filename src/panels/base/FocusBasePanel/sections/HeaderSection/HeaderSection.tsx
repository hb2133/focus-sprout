import { FocusSproutStrings } from '@/core/localization/FocusSproutStrings';

interface HeaderSectionProps
{
    ModeLabel: string;
    OnOpenSettings: () => void;
}

export function HeaderSection(Props: HeaderSectionProps)
{
    return (
        <header className="FocusHeader" data-ue-component="HeaderSection" data-ue-root>
            <div className="FocusBrand">
                <span className="FocusBrandMark" aria-hidden="true">✦</span>
                <div>
                    <strong>{FocusSproutStrings.AppName}</strong>
                    <span>{Props.ModeLabel}</span>
                </div>
            </div>
            <button
                className="IconButton"
                type="button"
                aria-label={FocusSproutStrings.Settings}
                title={FocusSproutStrings.Settings}
                onClick={Props.OnOpenSettings}
            >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M6 14v6" />
                </svg>
            </button>
        </header>
    );
}
