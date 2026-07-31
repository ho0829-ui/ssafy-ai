# VS Code Copilot Session Orchestration

## 시작하기

1. `00_simple-agent` 폴더를 VS Code로 엽니다.
2. Copilot을 열어 기능 추가를 요청합니다.

## 세션별 에이전트 활용하기
1. `ssafy-learning-planner` 폴더를 VS Code로 엽니다.
2. `index.html`을 브라우저에서 열어 항목 추가, 완료, 삭제를 확인합니다.
3. `.github`와 `docs` 폴더가 보이는지 확인합니다.
4. 네 개의 새 Chat Session을 순서대로 진행합니다.

## 실습 목표

기본 학습 플래너에 `전체 / 진행 중 / 완료` 상태 필터를 추가합니다. 하나의 긴 대화에 모두 요청하지 않고 다음 산출물로 연결합니다.

```text
task.md
  → 분석 Session → analysis.md
  → 계획 Session → plan.md
  → 구현 Session → 변경 코드
  → 검토 Session → review.md
```

## 직접 판단할 지점

- 분석 결과가 현재 코드의 사실과 맞는가?
- 계획의 수정 파일과 제외 범위가 적절한가?
- 구현 Agent가 승인 범위 밖의 변경을 요청하지 않는가?
- Reviewer의 PASS·REWORK·BLOCKED 판정에 근거가 있는가?

