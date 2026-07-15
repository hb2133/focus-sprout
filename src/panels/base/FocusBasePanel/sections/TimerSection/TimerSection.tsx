type TimerSectionStatus = 'idle' | 'running' | 'paused';

interface TimerSectionProps
{
    FormattedTime: string;
    ModeLabel: string;
    Status: TimerSectionStatus;
}

export function TimerSection(Props: TimerSectionProps)
{
    return (
        <section className="TimerSection" data-ue-component="TimerSection" data-ue-root>
            <div className="TimerModeRow">
                <span className={`StatusDot StatusDot-${Props.Status}`} aria-hidden="true" />
                <span className="TimerModeLabel">{Props.ModeLabel}</span>
            </div>
            <time className="TimerValue" aria-live="off">{Props.FormattedTime}</time>
        </section>
    );
}
