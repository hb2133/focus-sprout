# Manager Plan

## FocusTimerManager
- 책임: 집중/휴식 타이머 원본 상태, browser storage, alarm lifecycle
- 사용 위치: FocusBasePanel actions, background entrypoint
- 제외 책임: 화면 label, 남은 시간 formatting, 식물 표현, layered stack
- 승격 근거: popup과 background 두 runtime 경계에서 같은 상태 전환을 공유한다.
