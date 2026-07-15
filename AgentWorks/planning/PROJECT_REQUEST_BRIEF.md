# Focus Sprout Project Request Brief

## 기본 정보
- Project Name: Focus Sprout
- 한 줄 설명: 집중 세션을 완료할수록 식물이 자라는 WXT popup 포모도로
- 핵심 목적: WSL + VS Code + Codex 하네스 엔지니어링의 기획, 구현, 검증, 리뷰 흐름을 시연한다.
- 1차 대상 플랫폼: WXT Chromium popup

## 사용자와 첫 화면
- 주요 사용자: 짧은 집중 루틴을 만들고 싶은 브라우저 사용자
- 첫 행동: 집중 타이머를 시작한다.
- 첫 화면: 식물, 남은 시간, 실행 버튼, 오늘 진행도를 한 화면에 보여준다.
- 가장 강조할 정보: 현재 식물 성장 상태와 남은 시간
- 주요 CTA: 집중 시작

## Panel 구성
- `FocusBasePanel`: popup의 유일한 top-level BasePanel
- `SettingsLayeredPanel`: 집중 시간과 휴식 시간을 변경한다.
- `ResetConfirmLayeredPanel`: 실행 중인 타이머 초기화를 확인한다.
- 첫 구현에서는 별도 History BasePanel을 만들지 않고 오늘 기록을 FocusBasePanel 내부 Section으로 표현한다.

## FocusBasePanel Section
1. `HeaderSection`: 제품 이름, 현재 모드, 설정 진입
2. `PlantSection`: 오늘 완료 횟수에 따른 4단계 식물
3. `TimerSection`: 남은 시간과 집중/휴식 상태
4. `TimerActionSection`: 시작, 일시정지, 재개, 초기화
5. `DailyProgressSection`: 오늘 완료 세션과 목표 진행도

## 상호작용
- 시작: 현재 모드의 타이머를 실행하고 background alarm을 예약한다.
- 일시정지: 남은 시간을 계산해 저장하고 alarm을 해제한다.
- 재개: 저장된 남은 시간부터 다시 실행한다.
- 완료: 집중 세션이면 오늘 횟수를 증가시키고 휴식 모드로 전환한다.
- 초기화: 실행 또는 일시정지 상태에서는 확인 LayeredPanel을 연다.
- 설정: SettingsLayeredPanel에서 1~60분 범위로 시간을 저장한다.

## 데이터와 플랫폼 제약
- 타이머 원본 상태는 `browser.storage.local`에 저장한다.
- popup이 닫혀도 종료 시각과 `browser.alarms`로 타이머를 유지한다.
- 서버, 로그인, 네트워크 API는 사용하지 않는다.
- 기본값은 집중 25분, 휴식 5분, 오늘 목표 4회다.

## 이번 범위
- 포함: 타이머, pause/resume/reset, 설정, 오늘 기록, 식물 4단계, popup 재진입 복원
- 제외: 계정 동기화, 다일 통계 화면, 알림음 선택, 클라우드 백업

## 산출물 기대
- AgentWorks planning 및 WorkDoc
- WXT popup 구현
- TypeScript compile과 production build 검증
- 구조 리뷰 결과
