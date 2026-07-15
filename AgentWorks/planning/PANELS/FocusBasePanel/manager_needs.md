# FocusBasePanel Manager Needs

- `FocusTimerManager`
  - popup Action과 background alarm listener가 함께 사용하는 비시각 책임이다.
  - timer 원본 상태 정규화, storage 저장, alarm 예약/해제, 완료 전환을 소유한다.
  - React와 Panel 표시 책임은 포함하지 않는다.
