import type { PropsWithChildren } from 'react';
import { GlobalDesign } from '@/design/GlobalDesign.global';

export function AppShell(Props: PropsWithChildren)
{
    return (
        <>
            <GlobalDesign />
            {Props.children}
        </>
    );
}
