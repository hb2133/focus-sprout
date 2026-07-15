# Task

## Context
- 식물 아래 상태 dot과 모드 label이 서로 떨어져 보인다.
- 일일 목표를 채워도 일반 나무와 같은 visual이라 완료 만족감이 약하다.

## Current Understanding
- 상태 dot과 label을 독립 grid column이 아닌 하나의 flex row로 묶는다.
- 목표 달성 시 완성 나무와 별도의 sparkle/halo visual을 표시한다.

## Observed Issues
- TimerValue가 grid column을 넓히면서 dot과 label 사이에 불필요한 간격이 생긴다.

## Decision Notes
- 새로운 bitmap asset 대신 현재 emoji 기반 성장 체계를 유지하는 code-native 완료 visual을 사용한다.

## Implementation Notes
- TimerModeRow를 추가해 status dot과 mode label을 하나의 중앙 flex row로 묶었다.
- 목표 달성 시 나무에 열매 3개, sparkle 3개, pulse halo를 추가했다.
- 기존 성장 단계와 storage 데이터 계약은 변경하지 않았다.

## Result
- lint, compile, production build를 통과했다.
- Windows Chrome에서 확장을 reload했다.
- 실제 4/4 상태에서 완성 나무 visual과 중앙 정렬을 확인했다.

## History Index
- 아직 분리된 이력이 없다.
