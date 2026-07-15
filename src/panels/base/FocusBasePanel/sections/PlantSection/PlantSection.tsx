interface PlantSectionProps
{
    PlantStage: string;
    CompletedSessions: number;
    IsGoalComplete: boolean;
}

export function PlantSection(Props: PlantSectionProps)
{
    return (
        <section
            className="PlantSection"
            data-ue-component="PlantSection"
            data-ue-root
            aria-hidden="true"
        >
            <div className="GardenGlow" />
            <div className="GardenOrbit GardenOrbitOne" />
            <div className="GardenOrbit GardenOrbitTwo" />
            <div
                className={Props.IsGoalComplete ? 'PlantVisual IsGoalComplete' : 'PlantVisual'}
                key={`${Props.PlantStage}-${Props.CompletedSessions}`}
            >
                <span className="PlantStage">{Props.PlantStage}</span>
                {Props.IsGoalComplete && (
                    <>
                        <span className="CompleteSpark CompleteSparkOne">✦</span>
                        <span className="CompleteSpark CompleteSparkTwo">✦</span>
                        <span className="CompleteSpark CompleteSparkThree">✦</span>
                        <span className="CompleteFruit CompleteFruitOne" />
                        <span className="CompleteFruit CompleteFruitTwo" />
                        <span className="CompleteFruit CompleteFruitThree" />
                    </>
                )}
            </div>
            <div className="GardenSoil" />
        </section>
    );
}
