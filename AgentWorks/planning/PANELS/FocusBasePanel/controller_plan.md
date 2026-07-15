# FocusBasePanel Controller Plan

- 타이머 상태를 load하고 storage 변경을 구독한다.
- 화면 표시용 남은 시간을 매 tick 계산한다.
- Section 이벤트를 start, pause, reset, settings Action에 연결한다.
- SettingsLayeredPanel과 ResetConfirmLayeredPanel stack을 소유한다.
- 완료된 설정 결과를 저장한 뒤 Panel 상태를 다시 반영한다.
