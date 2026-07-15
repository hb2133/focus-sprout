# Task

## Context
- WXT 기본 예제 popup을 Focus Sprout MVP로 교체한다.

## Current Understanding
- popup은 FocusBasePanel 하나를 bootstrap한다.
- FocusBasePanel Controller가 layered stack과 Section 이벤트를 소유한다.
- FocusTimerManager가 background와 popup에서 공유하는 storage/alarm 원본 상태를 관리한다.

## Observed Issues
- 기존 tracked 변경은 대부분 line ending 변화이며 app 계층 파일은 최소 placeholder 상태다.

## Decision Notes
- popup이 닫혀도 타이머가 유지되어야 하므로 단순 React interval 대신 종료 시각과 browser alarm을 사용한다.
- 첫 MVP에서는 다일 HistoryBasePanel을 제외하고 오늘 기록만 표시한다.

## Fix Notes
## Implementation Notes
- Brief와 panel별 preview/planning을 생성했다.
- FocusBasePanel과 5개 Section을 구현했다.
- SettingsLayeredPanel과 ResetConfirmLayeredPanel을 PanelLayerHost에 연결했다.
- FocusTimerManager가 storage 정규화, start/pause/reset/settings, alarm completion을 담당한다.
- popup 전용 확장으로 정리하기 위해 기본 content script와 starter asset을 제거했다.
- ESLint flat config와 lint script를 추가했다.

## Result
- lint, TypeScript compile, Chrome MV3 production build를 통과했다.
- production dependency audit 결과 취약점은 0개다.
- `.output/chrome-mv3`에서 unpacked extension을 로드할 수 있다.
- Windows Chrome에 unpacked extension을 직접 로드했다.
- 실제 toolbar popup에서 레이아웃, 한글 문자열, 25:00 초기 상태와 성장 카드 렌더링을 확인했다.

## History Index
- 아직 분리된 이력이 없다.
