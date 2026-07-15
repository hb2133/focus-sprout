import { useEffect, type ReactNode } from 'react';

export type LayeredCloseReason = 'cancel' | 'backdrop' | 'escape' | 'external';

export interface PanelLayerEntry
{
    PanelId: string;
    Content: ReactNode;
    Dismissible: boolean;
    OnRequestClose: (Reason: LayeredCloseReason) => void;
}

interface PanelLayerHostProps
{
    Entries: PanelLayerEntry[];
}

export function PanelLayerHost(Props: PanelLayerHostProps)
{
    const TopEntry = Props.Entries.at(-1);

    useEffect(() =>
    {
        if(TopEntry === undefined || TopEntry.Dismissible === false)
        {
            return;
        }

        const OnKeyDown = (Event: KeyboardEvent): void =>
        {
            if(Event.key === 'Escape')
            {
                Event.preventDefault();
                TopEntry.OnRequestClose('escape');
            }
        };
        window.addEventListener('keydown', OnKeyDown);
        return () => window.removeEventListener('keydown', OnKeyDown);
    }, [TopEntry]);

    if(TopEntry === undefined)
    {
        return null;
    }

    return (
        <div className="PanelLayerHost" data-ue-component="PanelLayerHost">
            {Props.Entries.map((Entry, Index) =>
            {
                const IsTopEntry = Index === Props.Entries.length - 1;
                return (
                    <div
                        className="PanelLayer"
                        data-layer-panel-id={Entry.PanelId}
                        key={Entry.PanelId}
                        aria-hidden={IsTopEntry === false}
                    >
                        <button
                            className="PanelBackdrop"
                            type="button"
                            tabIndex={-1}
                            aria-hidden="true"
                            onClick={() =>
                            {
                                if(Entry.Dismissible)
                                {
                                    Entry.OnRequestClose('backdrop');
                                }
                            }}
                        />
                        {Entry.Content}
                    </div>
                );
            })}
        </div>
    );
}
