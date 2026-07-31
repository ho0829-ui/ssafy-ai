# Harness Engineering

완성 상태의 학습 플래너에 입력 검증을 추가하고, Agent의 작업을 운영 계약·역할·Skill·테스트·local Git 근거로 통제합니다.

## 최종 기능

- 앞뒤 공백을 제거한 뒤 검증
- 빈 문자열과 공백만 있는 입력 거부
- 40자 입력 허용, 41자 이상 거부
- 실패 이유를 입력 영역 근처에 표시
- 기존 전체·진행 중·완료 필터, 완료 변경, 삭제 유지

## 제공 상태

완성 제공:

- 상태 필터 앱
- `.github/copilot-instructions.md`
- `docs/task.md`, `docs/analysis.md`, `docs/plan.md`

핵심만 완성할 뼈대:

- `AGENTS.md`
- `.github/agents/implementer.agent.md`
- `.github/agents/reviewer.agent.md`
- `.agents/skills/test-and-review/SKILL.md`
- `validation.js`
- `tests/validation.test.js`

## 진행 순서

1. [`01_Git_Bash_시작.md`](01_Git_Bash_시작.md)로 baseline과 branch를 준비합니다.
2. [`02_Harness_완성_가이드.md`](02_Harness_완성_가이드.md)에 따라 운영 계약, Agent, Skill을 완성합니다.
3. Implementer에게 수정 예정 파일과 테스트 명령을 먼저 보고하게 합니다.
4. 사람이 범위를 승인한 뒤 코드를 구현합니다.
5. 테스트 → status → diff 순서로 근거를 확인합니다.
6. Reviewer가 PASS·REWORK·BLOCKED를 판정하고 사람이 종료 여부를 결정합니다.

