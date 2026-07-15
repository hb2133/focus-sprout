import { FocusSproutStrings } from '@/core/localization/FocusSproutStrings';

interface DailyProgressSectionProps
{
    CompletedSessions: number;
    DailyGoal: number;
    Encouragement: string;
}

export function DailyProgressSection(Props: DailyProgressSectionProps)
{
    const GoalItems = Array.from({ length: Props.DailyGoal }, (_, Index) => Index);

    return (
        <section
            className="DailyProgressSection"
            data-ue-component="DailyProgressSection"
            data-ue-root
        >
            <div className="ProgressHeader">
                <div>
                    <span>{FocusSproutStrings.TodayGrowth}</span>
                    <strong>{FocusSproutStrings.SessionsCompleted(Props.CompletedSessions)}</strong>
                </div>
                <span className="GoalBadge">
                    {FocusSproutStrings.GoalProgress(Props.CompletedSessions, Props.DailyGoal)}
                </span>
            </div>
            <div className="ProgressTrack" aria-hidden="true">
                {GoalItems.map((GoalIndex) => (
                    <span
                        className={GoalIndex < Props.CompletedSessions ? 'ProgressDot IsComplete' : 'ProgressDot'}
                        key={GoalIndex}
                    />
                ))}
            </div>
            <p>{Props.Encouragement}</p>
        </section>
    );
}
