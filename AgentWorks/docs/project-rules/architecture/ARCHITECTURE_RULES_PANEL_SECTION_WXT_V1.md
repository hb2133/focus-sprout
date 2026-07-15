# ARCHITECTURE RULES (Panel-Section, WXT Browser Extension Profile) V1

## 1) 문서 역할
- 이 문서는 WXT + TypeScript 브라우저 확장 프로젝트에서 `Panel-Section-Controller` 공용 규칙을 실제 경로와 파일 책임으로 매핑하는 플랫폼 전용 아키텍처 문서다.
- 공통 개념과 책임 정의는 반드시 `ARCHITECTURE_RULES_PANEL_SECTION_CORE_V1.md`를 따른다.
- 이 문서는 공용 `Panel` 개념을 WXT 기준의 `BasePanel`, `LayeredPanel`, `Section`, `Fragment`, `Controller`, `Action`, `Manager`로 매핑한다.
- 이 문서는 구조, 경로, WXT entrypoint, UI surface bootstrap, BasePanel 전환, LayeredPanel 배치를 WXT 기준으로 고정한다.

## 2) 적용 범위
- 전제 프로젝트는 WXT + TypeScript 기반 브라우저 확장이다.
- WXT 기본 진입점은 `src/entrypoints/`다.
- `popup`, `options`, `sidepanel`, `background`, `content`를 전부 기본 세트처럼 생성하지 않으며, 프로젝트가 실제로 사용하는 entrypoint만 만든다.
- 전역 디자인 SSOT는 `src/design/GlobalDesign.global.tsx`다.
- UI layer는 React 또는 유사한 컴포넌트 UI 레이어를 사용할 수 있으나, 구조 경계는 동일하게 적용한다.
- 이 문서는 Next.js 웹앱, Electron 앱, 일반 Node 서버 앱용 범용 문서가 아니다.

## 3) 우선순위
- 1순위: `ARCHITECTURE_RULES_PANEL_SECTION_CORE_V1.md`
- 2순위: 본 문서
- 3순위: 프로젝트별 플랫폼/디자인 문서
- 4순위: 개별 작업 요구사항
- 본 문서는 공용 문서의 개념을 실제 경로로 매핑하는 문서이며, 공용 문서의 개념을 변경할 수 없다.

## 4) 공통 코딩 컨벤션
- 중괄호는 `Allman brace style`을 사용한다.
- 식별자 이름은 기본적으로 `PascalCase`를 사용한다.
- boolean 조건은 축약형 부정보다 명시형 비교를 우선한다.
- 예: `if(IsReady == false)`
- `src/` 하위 import는 `@/` 별칭 절대 경로를 기본으로 사용한다.
- 상위 상대 경로 import(`../`, `../../`)는 금지한다.
- 동일 폴더 로컬 파일만 상대 경로를 허용한다.
- `background.ts`, `content.ts`는 WXT build 중 Node 환경에서 import될 수 있으므로 실행 코드는 `main` 내부에 둔다.

## 5) 핵심 원칙
- 사용자와 직접 만나는 화면 구조는 `src/panels/` 아래에 둔다.
- `BasePanel`과 `LayeredPanel`은 공용 `Panel` 개념을 WXT에서 역할별로 나눈 플랫폼 프로파일 용어다.
- `src/entrypoints/`는 app route 트리가 아니라 WXT bundle input이자 surface bootstrap 경계다.
- `popup`, `options`, `sidepanel` 같은 UI surface는 각자 현재 surface의 `BasePanel`을 시작한다.
- `background`는 extension runtime entrypoint이며 `Panel`이 아니다.
- `content`는 기본적으로 content script entrypoint이며, 화면을 실제로 렌더링할 때만 내부 mount root 위에서 `BasePanel`을 시작할 수 있다.
- 현재 surface 안에서의 화면 교체는 `BasePanel` 전환으로 처리한다.
- `LayeredPanel`은 route 대상이 아니다.
- 현재 화면에서 어떤 `LayeredPanel`을 띄우고 닫을지는 현재 활성 `BasePanel`이 자기 로컬 layered stack으로 직접 관리한다.
- `LayeredPanel`은 여러 `BasePanel`에서 재사용할 수 있다.
- `Section`, `Tab`, Panel 내부 표시 상태 전환은 기본적으로 route가 아니라 현재 `BasePanel Controller` 상태로 처리한다.
- Panel 내부 시각 분해 단위는 `Section`이며, `tsx`는 시각 조립 파일에만 둔다.
- `Controller`, `State`, `Action`은 `ts` 파일로 분리한다.
- 외부 API, browser/chrome API, storage, 네트워크 호출 orchestration은 `Panel Action` 또는 `Manager`에서만 수행한다.
- 여러 Panel에서 반복 검증된 비시각 책임만 `src/managers/`로 승격한다.
- `LayeredPanel`의 open/close lifecycle, focus/dismiss 정책 상세는 `ARCHITECTURE_RULES_PANEL_LAYER_WXT_V1.md`를 따른다.

## 6) 표준 디렉터리 구조
```text
.env
.env.publish
public/
wxt.config.ts
web-ext.config.ts

src/
├─ app.config.ts
├─ app/
│  ├─ navigation/
│  │  └─ AppNavigator.ts
│  ├─ panel_layer/
│  │  └─ PanelLayerHost.tsx
│  └─ shell/
│     └─ AppShell.tsx
├─ entrypoints/                    # WXT bundle input 경계, route 트리가 아님
│  ├─ background.ts                # extension runtime entrypoint
│  ├─ content.ts                   # content script entrypoint
│  ├─ popup/                       # 필요할 때만 만드는 UI surface
│  │  ├─ index.html
│  │  └─ main.tsx
│  ├─ options/                     # 필요할 때만 만드는 UI surface
│  │  ├─ index.html
│  │  └─ main.tsx
│  └─ sidepanel/                   # 필요할 때만 만드는 UI surface
│     ├─ index.html
│     └─ main.tsx
├─ core/
│  ├─ config/
│  │  ├─ env.ts
│  │  ├─ runtime_profile.ts
│  │  └─ feature_flags.ts
│  ├─ infra/
│  ├─ localization/
│  └─ services/
├─ design/
│  └─ GlobalDesign.global.tsx
├─ managers/
│  └─ <manager_name>/
│     ├─ <ManagerName>.ts
│     ├─ <ManagerName>State.ts
│     └─ <ManagerName>Types.ts
└─ panels/
   ├─ base/
   │  └─ <BasePanelName>/
   │     ├─ <BasePanelName>.tsx
   │     ├─ <BasePanelName>Interface.ts
   │     ├─ controller/
   │     │  ├─ <BasePanelName>Controller.ts
   │     │  ├─ <BasePanelName>State.ts
   │     │  ├─ <BasePanelName>Types.ts
   │     │  └─ actions/
   │     │     ├─ <LoadSomethingAction>.ts
   │     │     └─ <SubmitSomethingAction>.ts
   │     └─ sections/
   │        ├─ <SectionName>/
   │        │  ├─ <SectionName>.tsx
   │        │  └─ fragments/
   │        │     └─ <FragmentName>.tsx
   │        └─ <TabGroupName>/
   │           ├─ TabSelectorSection/
   │           │  └─ TabSelectorSection.tsx
   │           ├─ TabViewportSection/
   │           │  └─ TabViewportSection.tsx
   │           └─ tab_fragments/
   │              ├─ <TabASection>.tsx
   │              └─ <TabBSection>.tsx
   └─ layered/
      └─ <LayeredPanelName>/
         ├─ <LayeredPanelName>.tsx
         ├─ <LayeredPanelName>Interface.ts
         ├─ controller/
         │  ├─ <LayeredPanelName>Controller.ts
         │  ├─ <LayeredPanelName>State.ts
         │  ├─ <LayeredPanelName>Types.ts
         │  └─ actions/
         │     └─ <LayeredPanelAction>.ts
         └─ sections/
            └─ <SectionName>/
               ├─ <SectionName>.tsx
               └─ fragments/
                  └─ <FragmentName>.tsx
```

## 7) App-Level 구조
- WXT에서 app-level UI 경계는 현재 활성 UI surface 하나를 뜻한다.
- UI surface는 보통 `popup`, `options`, `sidepanel`, 또는 content script가 만든 user-facing mount root다.
- 각 UI surface는 아래 세 책임만 가진다.
- 현재 surface의 `BasePanel` bootstrap
- 현재 surface 내부의 `BasePanel` 전환
- 전역 shell 유지

- `popup -> options` 같은 surface 자체 변경은 `AppNavigator`가 아니라 extension runtime과 브라우저 동작의 영역이다.
- `LayeredPanel` open/close는 app-level route가 아니라 현재 `BasePanel` 내부 책임이다.
- `AppShell`은 같은 UI surface 안에서 유지되는 전역 셸이다.
- `AppNavigator`는 현재 UI surface 안에서의 `BasePanel` 전환 진입점이다.
- `PanelLayerHost`는 현재 `BasePanel`이 소유한 layered stack를 그리는 host이며, extension entrypoint 자체를 바꾸지 않는다.
- 기본 흐름은 아래와 같다.

```text
UI Entry main.tsx
-> AppShell
-> BasePanel mount
-> Section Event
-> BasePanel Controller
-> if same BasePanel:
   state change or layered panel update
-> if BasePanel change required:
   current BasePanel cleanup / close completion
   -> AppNavigator
   -> next BasePanel mount in same UI surface
```

### 7-1) `/src/entrypoints`
- 경로: `src/entrypoints/`
- 역할: WXT가 번들 입력으로 사용하는 얇은 진입 레이어다.
- `popup/`, `options/`, `sidepanel/`은 HTML UI entrypoint 디렉터리다.
- `background.ts`, `content.ts`는 extension runtime entrypoint다.
- 모든 entrypoint를 미리 다 만들 필요는 없고, 프로젝트가 실제로 사용하는 entrypoint만 생성한다.
- `main.tsx`는 `AppShell`과 현재 surface의 `BasePanel` root만 연결하는 얇은 bootstrap이어야 한다.
- `background.ts`, `content.ts`는 entrypoint 정의와 `main` 시작점 연결만 담당한다.
- 금지: `src/entrypoints/`에 제품 로직, Panel 비즈니스 로직, 장문의 UI 조립을 직접 누적하는 구조
- 금지: WXT entrypoint를 웹앱 route 트리처럼 깊게 중첩하는 구조

### 7-2) `/src/app/navigation`
- 경로: `src/app/navigation/`
- 역할: 현재 UI surface 안에서 app-level `BasePanel` 전환을 담당하는 navigation 계층이다.
- 기준 파일: `AppNavigator.ts`
- 허용: surface 내부 `BasePanel` 교체, navigation intent 처리, route-like state helper
- 금지: `LayeredPanel` open/close, Section 비즈니스 로직 소유
- 기본 구조에서는 `AppNavigator.ts` 1개 파일로 시작한다.
- `BasePanel` 전환은 `BasePanel Controller -> AppNavigator -> next BasePanel mount` 흐름을 따른다.

### 7-3) `/src/app/shell`
- 경로: `src/app/shell/`
- 역할: 현재 UI surface의 전역 shell과 root viewport 성격의 시각 껍데기를 둔다.
- 기준 파일: `AppShell.tsx`
- 허용: provider 연결, 전역 스타일 연결, 현재 `BasePanel`이 들어오는 루트 셸 구성
- 금지: Panel 비즈니스 로직, `LayeredPanel` 상태 소유

### 7-4) `/src/app/panel_layer`
- 경로: `src/app/panel_layer/`
- 역할: 현재 `BasePanel`이 연 `LayeredPanel` stack을 실제로 렌더링하는 공용 host 계층이다.
- 기준 파일: `PanelLayerHost.tsx`
- 허용: layered stack 렌더링, backdrop, enter/exit 애니메이션 연결, focus/dismiss 연결
- 금지: app-level surface 판단, Panel 도메인 의미 소유
- 상세 계약은 `ARCHITECTURE_RULES_PANEL_LAYER_WXT_V1.md`를 따른다.

## 8) Core / Design / Managers 경계
### 8-1) `/core`
- 경로: `src/core/`
- 역할: 전역 공통 설정, 외부 연동 구현, 전역 서비스 기반 계층을 담는다.
- 주요 하위 단위:
- `config/`: 환경값, 런타임 프로파일, feature flag, 정책성 상수
- `infra/`: API client, storage adapter, auth adapter, browser/chrome API wrapper, 외부 SDK 연동
- `localization/`: 전역 문자열 리소스와 locale 규칙
- `services/`: 전역 공통 서비스, 앱 수준 orchestration
- 금지: 특정 Panel 전용 상태, 특정 Panel 전용 시각 로직, 특정 Section 전용 정책
- 허용: `panels -> core`, `managers -> core`
- 금지: `core -> panels`
- 필수: `popup`, `options`, `sidepanel`, `background`, `content` 같은 surface/profile 차이는 `src/core/config/runtime_profile.ts`에서 관리한다.
- 금지: `main.tsx`, `background.ts`, `content.ts`, `AppShell`, Panel root 파일, `Section`, `Controller`에 환경 분기를 흩뿌리는 패턴

### 8-2) `/design`
- 경로: `src/design/`
- 역할: 전역 디자인 SSOT를 담는 레이어다.
- 기준 파일: `src/design/GlobalDesign.global.tsx`
- 허용: 디자인 토큰, 전역 스타일, CSS variable mapping, theme helper
- 금지: Panel 전용 JSX, Section 전용 상태, 비즈니스 로직

### 8-3) `/managers`
- 경로: `src/managers/`
- 역할: 여러 Panel에서 반복 검증된 비시각 로직, 공용 상태, 외부 연동 orchestration을 관리한다.
- 승격 기준은 공용 코어 문서의 Manager 규칙을 따른다.
- 금지: Panel 조립 코드, Section JSX, 단일 Panel 전용 임시 로직

## 9) `/panels` 경계
- 경로: `src/panels/`
- 역할: 사용자와 직접 만나는 화면 구현의 주 경계다.
- `base/`는 현재 UI surface 안에서 독립 전환되는 패널만 둔다.
- `layered/`는 오버레이 전용 패널만 둔다.
- `background.ts` 자체는 `BasePanel`이 아니다.
- `content.ts`가 UI를 띄우더라도, 실제 사용자 화면은 `src/panels/` 아래 `BasePanel`로 분리한다.
- 금지: 한 Panel 내부 구현을 다른 Panel에서 직접 끌어다 쓰는 패턴
- 기본 구조에 `shared/`를 미리 두지 않는다.
- 실제 반복이 검증된 경우에만 별도 공용 시각 조각 경로를 예외적으로 추가할 수 있다.

## 10) BasePanel 규칙
- 경로: `src/panels/base/<BasePanelName>/`
- 각 `BasePanel`은 최소한 `<BasePanelName>.tsx`, `controller/`, `sections/`를 가진다.
- `<BasePanelName>.tsx`는 해당 `BasePanel`의 최종 화면 셸이자 Section 조립 지점이다.
- `<BasePanelName>.tsx`는 `Controller`가 준비한 상태와 이벤트 연결 결과만 사용한다.
- `<BasePanelName>.tsx`는 `Action`, `Manager`, `core/infra`를 직접 호출하지 않는다.
- `<BasePanelName>.tsx`는 필요 시 자기 하위 `LayeredPanel` stack를 렌더하기 위해 `PanelLayerHost`를 사용할 수 있다.
- `<BasePanelName>.tsx`와 그 controller는 자기 layered stack 상태를 직접 소유하고 갱신한다.
- popup/options/sidepanel 안에서 독립 화면처럼 전환되는 단위는 보통 독립 `BasePanel`로 본다.
- `BasePanel` 전환은 직접 entrypoint 파일을 건드리는 방식이 아니라 `Controller -> AppNavigator` 흐름으로 처리한다.
- `main.tsx`가 직접 Section을 조립하지 않는다.
- 웬만하면 각 `BasePanel` 옆에 `<BasePanelName>Interface.ts`를 두고 entry 입력과 공개 props shape를 분리하는 것을 권장한다.

### 10-1) `BasePanel` 인터페이스 예시
```ts
export type ExtensionEntrySurface =
  | "popup"
  | "options"
  | "sidepanel"
  | "content";

export interface PopupHomeBasePanelEntryParams
{
  EntrySurface: ExtensionEntrySurface;
}

export interface PopupHomeBasePanelProps
{
  EntryParams: PopupHomeBasePanelEntryParams;
}
```

## 11) LayeredPanel 규칙
- 경로: `src/panels/layered/<LayeredPanelName>/`
- `LayeredPanel`은 `BasePanel` 위에 표시되는 오버레이 전용 패널이다.
- `LayeredPanel`은 route 대상이 아니다.
- `LayeredPanel`은 현재 활성 `BasePanel`의 layered stack 항목으로만 열리고 닫힌다.
- 하나의 `LayeredPanel` 구현은 여러 `BasePanel`에서 재사용할 수 있다.
- `LayeredPanel`은 특정 `BasePanel`에 강결합하지 않는다.
- `LayeredPanel`은 필요 시 `<LayeredPanelName>.tsx`, `controller/`, `sections/`를 가진다.
- 의미 있는 modal, drawer, popup, confirm, side sheet는 기본적으로 `LayeredPanel`로 분리한다.
- tooltip, dropdown, hover card, 간단한 context menu 같은 초경량 부유 UI는 반드시 `LayeredPanel`로 강제하지 않는다.
- `LayeredPanel` stack 내부에는 여러 패널이 쌓일 수 있다.
- 다만 기본 UX에서는 1~2단 중첩을 권장하고, 3단 이상은 예외 케이스로 본다.
- `LayeredPanel`은 상위 `BasePanel`이 제공한 공개 함수 계약 또는 결과 이벤트 구독 지점을 통해 부모 문맥과 연결될 수 있다.
- 다만 특정 `BasePanel Controller`의 내부 상태나 내부 구현 세부를 직접 참조하지 않는다.
- 기본 통신 패턴은 `payload`, `onComplete(result)`, `onRequestClose(reason)`로 잡는다.
- 특정 `BasePanel`과 짝지어진 전용 `LayeredPanel`은 상위가 주입한 공개 함수를 직접 호출하는 방식을 기본으로 한다.
- 여러 `BasePanel`에서 재사용하는 공용 `LayeredPanel`도 가능하면 표준 `payload/result` 계약으로 처리한다.
- 연속적인 상태 보고가 필요한 경우에만 추가 결과 이벤트를 사용할 수 있다.
- 이벤트 버스는 `LayeredPanel -> BasePanel` 기본 패턴으로 두지 않는다.
- 중첩 layered 구조에서도 각 `LayeredPanel` 결과는 중간 layered를 거치지 않고 현재 stack owner인 `BasePanel`로 직접 반환할 수 있다.
- 웬만하면 각 `LayeredPanel` 옆에 `<LayeredPanelName>Interface.ts`를 두고 `Payload`, `Result`, `Bindings`를 분리하는 것을 권장한다.

### 11-1) `LayeredPanel` 인터페이스 예시
```ts
export type LayeredCloseReason =
  | "confirm"
  | "cancel"
  | "backdrop"
  | "escape"
  | "external"
  | "replace";

export interface ConfirmLayeredPanelPayload
{
  Title: string;
  Message: string;
}

export interface ConfirmLayeredPanelResult
{
  Confirmed: boolean;
}

export interface ConfirmLayeredPanelBindings
{
  OnComplete: (Result: ConfirmLayeredPanelResult) => void;
  OnRequestClose: (Reason: LayeredCloseReason) => void;
}
```

## 12) Section / Fragment / Tab 규칙
- 경로: `src/panels/base/<BasePanelName>/sections/<SectionName>/`
- 기본 파일:
- `<SectionName>.tsx`
- 필요 시 `fragments/*.tsx`
- `<SectionName>.tsx`는 실제 JSX 렌더링과 이벤트 바인딩을 담당한다.
- Section props 타입이 작으면 `<SectionName>.tsx` 안에 둔다.
- Section 표시용 파생값, 카드/메뉴/탭 구성, 리스트 변환, label 계산, props shape 소유권은 기본적으로 `Panel` 쪽에 둔다.
- 공통 또는 커진 표시 타입은 `<PanelName>Types.ts` 또는 `<PanelName>State.ts`에 둔다.
- `<SectionName>ViewModel.ts`는 기본 생성하지 않는다.
- Section은 `Controller`가 내려준 상태와 이벤트를 받아 렌더링한다.
- Section은 `Action`, `Manager`, `core/infra`, browser API를 직접 호출하지 않는다.
- `tsx`는 Section과 Fragment 파일에만 둔다.
- Section root에는 `data-ue-component`, `data-ue-root` 메타를 둔다.
- Tab, accordion, 조건부 fragment 전환은 overlay가 아니라 Panel 내부 표시 조각이다.
- Panel 내부 상태에 따라 교체되는 탭 조각, fragment, 조건부 section은 `LayeredPanel`이 아니다.

## 13) Controller 규칙
- 경로: `src/panels/base/<BasePanelName>/controller/`
- 필수 기준 파일:
- `<BasePanelName>Controller.ts`
- `<BasePanelName>State.ts`
- `<BasePanelName>Types.ts`
- `actions/*.ts`
- `<BasePanelName>Controller.ts`는 Panel의 상태 전이, Section 배치 판단, layered stack 갱신 판단, Action 호출을 담당한다.
- `<BasePanelName>State.ts`는 Panel 상태 타입, 초기값, selector, 순수 계산 로직을 담는다.
- `actions/*.ts`는 사용자 액션별 처리 흐름을 담는다.
- `tsx`는 `controller/` 아래에서 허용하지 않는다.
- `Controller`가 직접 JSX를 반환하지 않는다.
- `BasePanel` 전환이 필요하면 `Controller`가 `AppNavigator`를 호출한다.
- 현재 Panel 정리나 close animation completion이 필요하면 완료 후 `AppNavigator`를 호출한다.
- `LayeredPanel` 전용 controller가 필요할 경우 layered 패널 내부에 같은 패턴으로 둘 수 있다. 다만 entrypoint 전환 책임은 갖지 않는다.

## 14) 파일 단위 책임 규칙
### 14-1) `src/entrypoints/<ui_entry>/index.html`
- 역할: HTML UI entrypoint 셸, manifest용 meta 정의, root mount 지점 제공
- 허용: meta 태그, root DOM, script 연결, 최소한의 HTML 셸
- 금지: Panel 비즈니스 로직, 데이터 가공, 복잡한 UI 조립

### 14-2) `src/entrypoints/<ui_entry>/main.tsx`
- 역할: UI surface bootstrap, React root mount, `AppShell`과 `BasePanel` 연결
- 허용: `AppShell` import/렌더링, provider 트리 조립, global styles 연결
- 금지: `Action` 직접 호출, Panel 비즈니스 로직 소유, 복잡한 조건 분기 소유

### 14-3) `src/entrypoints/background.ts`, `src/entrypoints/content.ts`
- 역할: WXT extension entrypoint 정의, manifest 옵션 연결, `main` 시작점 연결
- 허용: `defineBackground`, `defineContentScript` 같은 entrypoint 정의, `main`에서 bootstrap 위임
- 금지: `main` 바깥 실행 코드 누적, 제품 로직 직접 소유, 장문의 유스케이스 구현
- `content.ts`가 UI mount를 만들더라도 화면 조립은 `src/panels/`와 `src/app/`에 위임한다.

### 14-4) `src/app/navigation/AppNavigator.ts`
- 역할: 현재 UI surface 안의 `BasePanel` 전환 처리
- 허용: navigation helper, surface 내부 화면 교체, route-like state orchestration
- 금지: `LayeredPanel` open/close, Section 비즈니스 로직
- 현재 `BasePanel`의 close animation이나 정리가 필요하면 completion 이후 호출된다.

### 14-5) `src/app/shell/AppShell.tsx`
- 역할: 현재 UI surface 전역 shell, provider 연결, `BasePanel`이 들어오는 루트 시각 셸
- 허용: shell layout, provider 연결, global styles 연결
- 금지: Panel 도메인 로직, layered stack 상태 소유

### 14-6) `src/app/panel_layer/PanelLayerHost.tsx`
- 역할: 현재 `BasePanel`이 연 `LayeredPanel` stack를 실제로 렌더링
- 허용: stacked layered panel 렌더링, backdrop, enter/exit 애니메이션, completion 통지
- 금지: surface 전환 결정, Panel 도메인 의미 해석
- `PanelLayerHost`는 공용 host일 뿐이며, layered stack의 원본 상태를 소유하지 않는다.

### 14-7) `src/panels/base/<BasePanelName>/<BasePanelName>.tsx`
- 역할: `BasePanel` 최종 화면 셸, Section 조립, layered host 장착 위치
- 허용: Section import, presentation layout 조립, root `data-ue-page`
- 금지: `Action` 직접 호출, `Manager` 직접 호출, browser API 직접 호출

### 14-8) `src/panels/layered/<LayeredPanelName>/<LayeredPanelName>.tsx`
- 역할: `LayeredPanel` 최종 화면 셸, Section 조립, layered 전용 표시 구조
- 허용: Section import, layered layout 조립, open/close phase 반영
- 금지: surface 전환, `AppNavigator` 직접 호출, 특정 `BasePanel` 직접 참조

### 14-9) `src/panels/base/<BasePanelName>/controller/<BasePanelName>State.ts`
- 역할: Panel 상태 타입, 초기값, selector, 순수 계산 로직
- 허용: 타입 선언, enum, 순수 함수
- 금지: JSX, DOM 접근, 외부 호출

### 14-10) `src/panels/base/<BasePanelName>/controller/<BasePanelName>Controller.ts`
- 역할: Section 이벤트 해석, 상태 전이, Action orchestration, layered panel 전환 판단, navigation 호출
- 허용: Panel state 참조, Panel action 호출, Manager 연결, `AppNavigator` 호출
- 금지: JSX, DOM 직접 조작, `core/infra` 직접 호출
- layered stack entry 생성 시 `payload`, `onComplete`, `onRequestClose`, 필요 시 결과 이벤트 구독 지점을 함께 구성할 수 있다.

### 14-11) `src/panels/base/<BasePanelName>/controller/actions/*.ts`
- 역할: 사용자 액션 처리, validation, Manager 호출, 외부 연동 순서 제어
- 허용: `Manager`, `core/services`, `core/infra` 호출 orchestration
- 금지: JSX 반환, Section import, 상태 최종 반영 소유
- 필수: async 흐름은 `try-catch`와 실패 처리 경로를 가진다.

### 14-12) `src/panels/base/<BasePanelName>/sections/<SectionName>/<SectionName>.tsx`
- 역할: JSX 렌더링, UI 분해, Controller 이벤트 연결
- 허용: JSX, className, `data-ue-*` 메타, Fragment 조립
- 금지: `Action` 직접 호출, `Manager` 직접 호출, 비즈니스 규칙 직접 구현
- 필수: 사용자 표시 문자열은 `src/core/localization/` 리소스를 통해 참조한다.

### 14-13) Section props / 표시 타입
- 기본: Section props 타입은 해당 `<SectionName>.tsx` 안에 작게 둔다.
- 역할: Section이 렌더링에 필요한 최소 입력과 DOM 이벤트 callback을 표현한다.
- Panel 책임: 표시용 파생 구조체, props shape, 순수 계산, 카드/메뉴/탭 구성 데이터는 Panel root, Panel `State`, 또는 Panel `Types`가 소유한다.
- 허용: Section-local props 타입, Section-local render helper.
- 금지: Section별 `ViewModel.ts` 기본 생성, 외부 호출, 저장 규칙 소유, 상태 전이 판단.

## 15) TS / TSX 규칙
- `tsx` 파일은 아래 위치에서만 허용한다.
- `src/entrypoints/<ui_entry>/main.tsx`
- `src/app/shell/**/*.tsx`
- `src/app/panel_layer/**/*.tsx`
- `src/design/GlobalDesign.global.tsx`
- `src/panels/base/**/*.tsx`
- `src/panels/layered/**/*.tsx`
- 그 외의 `background.ts`, `content.ts`, `Controller`, `Action`, `State`, `Manager`, `core`, `navigation` 파일은 `ts`를 사용한다.
- 이 규칙은 기존 WXT 문서의 "view 코드는 tsx에 모은다"는 원칙을 Panel-Section 구조로 재해석한 것이다.

## 16) Import / 타입 / 품질 규칙
- `any` 타입 사용을 금지한다.
- 타입이 불명확하면 `unknown`과 타입 가드 또는 명시적 인터페이스로 정리한다.
- 선언만 있고 사용하지 않는 변수, import, 함수는 작업 종료 전 제거한다.
- import/export는 항상 완결되어야 한다.
- 순환 참조를 금지한다.
- Section 표시용 배열, 탭 구성, 카드 목록, 메뉴 목록 같은 하드코딩 데이터는 Panel `Controller`, Panel `State`, 또는 Panel `Types` 쪽으로 이동하고 JSX 안에 직접 박아두지 않는다.

## 17) 의존 허용 매트릭스
- 허용: `src/entrypoints/<ui_entry>/main.tsx -> AppShell`
- 허용: `AppShell -> BasePanel`
- 허용: `BasePanel -> BasePanel controller/state`
- 허용: `BasePanel -> BasePanel sections`
- 허용: `BasePanel -> PanelLayerHost`
- 허용: `BasePanel controller -> actions`
- 허용: `BasePanel controller -> managers`
- 허용: `BasePanel controller -> AppNavigator`
- 허용: `BasePanel controller -> layered stack state`
- 허용: `LayeredPanel -> LayeredPanel controller/state`
- 허용: `LayeredPanel -> LayeredPanel sections`
- 허용: `actions -> managers`
- 허용: `actions -> core`
- 허용: `panels -> design`
- 허용: `background.ts -> core|managers|bootstrap helper`
- 허용: `content.ts -> core|managers|bootstrap helper`
- 금지: `entrypoints -> controller/actions/managers 직접 구현`
- 금지: `AppNavigator -> panels/controller`
- 금지: `PanelLayerHost -> controller`
- 금지: `section -> actions/managers/core`
- 금지: `controller -> section`
- 금지: `LayeredPanel -> AppNavigator`
- 금지: `LayeredPanel -> 특정 BasePanel 직접 참조`
- 금지: `panel A 내부 파일 -> panel B 내부 파일`

## 18) WXT entrypoint / 설정 규칙
- 프로젝트 루트의 `wxt.config.ts`는 WXT build 설정만 담당한다.
- `src/app.config.ts`는 runtime config 정의만 담당한다.
- 루트의 `.env`, `.env.publish`는 환경값 소스이며, feature 코드에서는 `src/core/config/`를 경유해 접근한다.
- `wxt.config.ts`, `app.config.ts`, `web-ext.config.ts`에 제품 로직을 넣지 않는다.
- HTML UI entrypoint의 manifest 관련 옵션은 `index.html` meta 태그로 관리한다.
- `background.ts`, `content.ts`의 manifest 관련 옵션은 entrypoint 정의 코드 안에서 관리한다.
- WXT entrypoint는 route 트리가 아니라 번들 입력 목록이다. 웹앱 route 구조처럼 설계하지 않는다.
- `background.ts`, `content.ts`는 WXT build 중 Node 환경에서 import될 수 있으므로 실행 코드를 `main` 바깥에 두지 않는다.

## 19) LayeredPanel 분리 기준
- 아래 항목 중 2개 이상이면 기본적으로 `LayeredPanel`로 분리한다.
- backdrop, focus trap, dismiss 정책이 필요하다.
- open/close completion이 중요하다.
- modal, drawer, popup, side sheet처럼 별도 레이어 의미가 분명하다.
- 부모 화면과 분리된 payload 또는 독립 상태를 가진다.
- 여러 `BasePanel`에서 재사용 가능성이 있다.
- 내부 구조가 여러 Section으로 나뉜다.

- 아래는 `BasePanel` 또는 Section 내부 조각으로 유지할 수 있다.
- tooltip
- dropdown
- hover card
- 간단한 context menu
- inline expand

## 20) 테스트와 검증
- `BasePanel controller`: 상태 전환과 Action orchestration 테스트 권장
- `LayeredPanel`: open/close phase와 dismiss 흐름 테스트 권장
- `actions`: validation, Manager 호출, 예외 흐름 테스트 권장
- `section`: 핵심 렌더링 스모크 테스트 권장
- `manager`: 공용 로직 단위 테스트 권장
- 완료 기준:
- `npm run lint`
- `npx tsc --noEmit`
- `wxt dev`
- `wxt build`

## 21) 생성 시 금지 패턴
- `<BasePanelName>.tsx` 없이 `main.tsx`가 직접 화면을 조립하는 구조
- `Section`마다 별도 Controller를 만드는 구조
- `Section` 내부에서 browser API, storage, 외부 SDK를 직접 호출하는 구조
- `LayeredPanel`을 surface나 entrypoint처럼 직접 대표시키는 구조
- `tsx`를 Controller, Action, Manager에 섞는 구조
- `LayeredPanel`이 특정 `BasePanel`을 직접 import해 강결합되는 구조
- `background.ts`, `content.ts`에 제품 로직을 직접 누적하는 구조
- `content.ts`가 사용자 화면을 직접 흩뿌리고 `BasePanel` 경계를 만들지 않는 구조
