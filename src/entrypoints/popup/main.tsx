import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppShell } from '@/app/shell/AppShell';
import { FocusBasePanel } from '@/panels/base/FocusBasePanel/FocusBasePanel';
import './style.css';

const RootElement = document.getElementById('root');
if(RootElement === null)
{
    throw new Error('POPUP_ROOT_NOT_FOUND');
}

ReactDOM.createRoot(RootElement).render(
    <React.StrictMode>
        <AppShell>
            <FocusBasePanel />
        </AppShell>
    </React.StrictMode>,
);
