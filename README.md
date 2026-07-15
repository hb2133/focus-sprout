# Focus Sprout

집중 시간을 완료할수록 작은 식물이 자라는 Chrome용 Pomodoro 확장 프로그램입니다.
popup을 닫아도 타이머가 계속 유지되며, 하루 목표를 모두 채우면 열매와 반짝임이 있는 완성 나무를 확인할 수 있습니다.

![Focus Sprout popup 예시](docs/images/focus-sprout-popup.png)

## 주요 기능

- 집중 시간과 휴식 시간 타이머
- 시작, 일시정지, 재개, 초기화
- popup을 닫은 상태에서도 타이머 유지
- 하루 집중 완료 횟수 저장
- 완료 횟수에 따른 식물 성장
- 하루 목표 달성 전용 완성 나무 효과
- 집중 시간과 휴식 시간을 1~60분 범위로 설정

## 적용 방법

### 1. 저장소 내려받기

```bash
git clone https://github.com/hb2133/focus-sprout.git
cd focus-sprout
npm install
```

### 2. 확장 프로그램 빌드

```bash
npm run build
```

빌드가 완료되면 `.output/chrome-mv3` 폴더가 생성됩니다.

### 3. Chrome에 불러오기

1. Chrome 주소창에 `chrome://extensions`를 입력합니다.
2. 오른쪽 위의 `개발자 모드`를 켭니다.
3. `압축해제된 확장 프로그램을 로드`를 누릅니다.
4. 프로젝트의 `.output/chrome-mv3` 폴더를 선택합니다.
5. Chrome 도구 모음에서 Focus Sprout 아이콘을 눌러 실행합니다.

Windows Chrome에서 WSL 프로젝트를 불러오는 경우 폴더 선택 창의 `Linux > Ubuntu` 경로를 통해 프로젝트 폴더로 이동할 수 있습니다.

## 개발 방법

```bash
npm run dev
```

코드를 수정한 뒤 Chrome 확장 프로그램 관리 화면에서 Focus Sprout의 새로고침 버튼을 누르면 변경된 화면을 확인할 수 있습니다.

## 검증 명령어

```bash
npm run lint
npm run compile
npm run build
```

| 명령어 | 설명 |
| --- | --- |
| `npm run lint` | 코드 규칙과 잘못된 패턴을 검사합니다. |
| `npm run compile` | TypeScript 타입 오류를 검사합니다. |
| `npm run build` | Chrome Manifest V3용 확장 프로그램을 만듭니다. |

## 사용 권한과 데이터

Focus Sprout는 다음 Chrome 권한만 사용합니다.

- `storage`: 타이머 설정과 하루 집중 기록을 브라우저에 저장합니다.
- `alarms`: popup을 닫아도 종료 시간을 처리합니다.

데이터는 외부 서버로 전송하지 않으며 현재 Chrome 프로필의 `browser.storage.local`에만 저장됩니다.

## 기술 구성

- WXT
- React
- TypeScript
- Chrome Manifest V3
