import { FocusTimerManager } from '@/managers/focus_timer/FocusTimerManager';

export default defineBackground(() =>
{
    browser.alarms.onAlarm.addListener((Alarm) =>
    {
        void FocusTimerManager.HandleAlarm(Alarm.name);
    });

    void FocusTimerManager.Load();
});
