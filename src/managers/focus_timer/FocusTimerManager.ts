import
{
    CreateDefaultFocusTimerState,
    GetDateKey,
    GetModeDurationSeconds,
} from '@/managers/focus_timer/FocusTimerState';
import type
{
    FocusTimerSettings,
    FocusTimerState,
} from '@/managers/focus_timer/FocusTimerTypes';

const StorageKey = 'FocusSprout.TimerState';
export const FocusTimerAlarmName = 'FocusSprout.TimerAlarm';

type FocusTimerStateListener = (State: FocusTimerState) => void;

function IsRecord(Value: unknown): Value is Record<string, unknown>
{
    return typeof Value === 'object' && Value !== null;
}

function IsFiniteNumber(Value: unknown): Value is number
{
    return typeof Value === 'number' && Number.isFinite(Value);
}

function NormalizeSettings(Value: unknown): FocusTimerSettings
{
    const DefaultState = CreateDefaultFocusTimerState();
    if(IsRecord(Value) === false)
    {
        return DefaultState.Settings;
    }

    const FocusMinutes = IsFiniteNumber(Value.FocusMinutes)
        ? Math.min(60, Math.max(1, Math.round(Value.FocusMinutes)))
        : DefaultState.Settings.FocusMinutes;
    const BreakMinutes = IsFiniteNumber(Value.BreakMinutes)
        ? Math.min(60, Math.max(1, Math.round(Value.BreakMinutes)))
        : DefaultState.Settings.BreakMinutes;
    const DailyGoal = IsFiniteNumber(Value.DailyGoal)
        ? Math.min(12, Math.max(1, Math.round(Value.DailyGoal)))
        : DefaultState.Settings.DailyGoal;

    return { FocusMinutes, BreakMinutes, DailyGoal };
}

function NormalizeDailyRecords(Value: unknown): Record<string, number>
{
    if(IsRecord(Value) === false)
    {
        return {};
    }

    const Records: Record<string, number> = {};
    for(const [Key, Count] of Object.entries(Value))
    {
        if(IsFiniteNumber(Count))
        {
            Records[Key] = Math.max(0, Math.round(Count));
        }
    }
    return Records;
}

function NormalizeState(Value: unknown): FocusTimerState
{
    const DefaultState = CreateDefaultFocusTimerState();
    if(IsRecord(Value) === false)
    {
        return DefaultState;
    }

    const Mode = Value.Mode === 'break' ? 'break' : 'focus';
    const Status = Value.Status === 'running' || Value.Status === 'paused'
        ? Value.Status
        : 'idle';
    const Settings = NormalizeSettings(Value.Settings);
    const RemainingSeconds = IsFiniteNumber(Value.RemainingSeconds)
        ? Math.max(0, Math.round(Value.RemainingSeconds))
        : GetModeDurationSeconds(Mode, Settings);
    const EndsAt = IsFiniteNumber(Value.EndsAt) ? Value.EndsAt : null;
    const UpdatedAt = IsFiniteNumber(Value.UpdatedAt) ? Value.UpdatedAt : Date.now();

    return {
        Mode,
        Status,
        RemainingSeconds,
        EndsAt: Status === 'running' ? EndsAt : null,
        Settings,
        DailyRecords: NormalizeDailyRecords(Value.DailyRecords),
        UpdatedAt,
    };
}

async function ReadState(): Promise<FocusTimerState>
{
    const StoredValues = await browser.storage.local.get(StorageKey);
    const StoredState = StoredValues[StorageKey];
    const State = NormalizeState(StoredState);
    if(StoredState === undefined)
    {
        await browser.storage.local.set({ [StorageKey]: State });
    }
    return State;
}

async function WriteState(State: FocusTimerState): Promise<FocusTimerState>
{
    await browser.storage.local.set({ [StorageKey]: State });
    return State;
}

async function CompleteElapsedTimer(State: FocusTimerState, Now: number): Promise<FocusTimerState>
{
    if(State.Status !== 'running' || State.EndsAt === null || State.EndsAt > Now)
    {
        return State;
    }

    const DailyRecords = { ...State.DailyRecords };
    if(State.Mode === 'focus')
    {
        const TodayKey = GetDateKey(new Date(Now));
        DailyRecords[TodayKey] = (DailyRecords[TodayKey] ?? 0) + 1;
    }

    const NextMode = State.Mode === 'focus' ? 'break' : 'focus';
    const CompletedState: FocusTimerState =
    {
        ...State,
        Mode: NextMode,
        Status: 'idle',
        RemainingSeconds: GetModeDurationSeconds(NextMode, State.Settings),
        EndsAt: null,
        DailyRecords,
        UpdatedAt: Now,
    };
    await browser.alarms.clear(FocusTimerAlarmName);
    return WriteState(CompletedState);
}

export class FocusTimerManager
{
    public static async Load(): Promise<FocusTimerState>
    {
        const State = await ReadState();
        return CompleteElapsedTimer(State, Date.now());
    }

    public static async Start(): Promise<FocusTimerState>
    {
        const State = await FocusTimerManager.Load();
        if(State.Status === 'running')
        {
            return State;
        }

        const Now = Date.now();
        const RemainingSeconds = State.RemainingSeconds > 0
            ? State.RemainingSeconds
            : GetModeDurationSeconds(State.Mode, State.Settings);
        const EndsAt = Now + RemainingSeconds * 1000;
        const RunningState: FocusTimerState =
        {
            ...State,
            Status: 'running',
            RemainingSeconds,
            EndsAt,
            UpdatedAt: Now,
        };
        await WriteState(RunningState);
        await browser.alarms.create(FocusTimerAlarmName, { when: EndsAt });
        return RunningState;
    }

    public static async Pause(): Promise<FocusTimerState>
    {
        const State = await FocusTimerManager.Load();
        if(State.Status !== 'running' || State.EndsAt === null)
        {
            return State;
        }

        const Now = Date.now();
        const RemainingSeconds = Math.max(1, Math.ceil((State.EndsAt - Now) / 1000));
        const PausedState: FocusTimerState =
        {
            ...State,
            Status: 'paused',
            RemainingSeconds,
            EndsAt: null,
            UpdatedAt: Now,
        };
        await browser.alarms.clear(FocusTimerAlarmName);
        return WriteState(PausedState);
    }

    public static async Reset(): Promise<FocusTimerState>
    {
        const State = await FocusTimerManager.Load();
        const Now = Date.now();
        const ResetState: FocusTimerState =
        {
            ...State,
            Status: 'idle',
            RemainingSeconds: GetModeDurationSeconds(State.Mode, State.Settings),
            EndsAt: null,
            UpdatedAt: Now,
        };
        await browser.alarms.clear(FocusTimerAlarmName);
        return WriteState(ResetState);
    }

    public static async SaveSettings(Settings: FocusTimerSettings): Promise<FocusTimerState>
    {
        const State = await FocusTimerManager.Load();
        const NormalizedSettings = NormalizeSettings(Settings);
        const Now = Date.now();
        const UpdatedState: FocusTimerState =
        {
            ...State,
            Settings: NormalizedSettings,
            RemainingSeconds: State.Status === 'idle'
                ? GetModeDurationSeconds(State.Mode, NormalizedSettings)
                : State.RemainingSeconds,
            UpdatedAt: Now,
        };
        return WriteState(UpdatedState);
    }

    public static async HandleAlarm(AlarmName: string): Promise<void>
    {
        if(AlarmName !== FocusTimerAlarmName)
        {
            return;
        }
        await FocusTimerManager.Load();
    }

    public static Subscribe(Listener: FocusTimerStateListener): () => void
    {
        const StorageListener = (
            Changes: Record<string, { newValue?: unknown }>,
            AreaName: string,
        ): void =>
        {
            if(AreaName !== 'local' || Changes[StorageKey] === undefined)
            {
                return;
            }
            Listener(NormalizeState(Changes[StorageKey].newValue));
        };
        browser.storage.onChanged.addListener(StorageListener);
        return () => browser.storage.onChanged.removeListener(StorageListener);
    }
}
