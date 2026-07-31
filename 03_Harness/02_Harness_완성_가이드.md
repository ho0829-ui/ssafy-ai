# Harness 완성 가이드

## 1. 역할 파일

- `AGENTS.md`: 수정 범위, 중단 조건, 완료 보고
- `.github/agents/implementer.agent.md`: 구현 역할과 수정 경계
- `.github/agents/reviewer.agent.md`: 읽기 중심 검토와 판정
- `.agents/skills/test-and-review/SKILL.md`: test → status → diff → report 절차

## 2. Implementer에게 사전 보고 요청

```text
입력 검증 기능 구현. 
현재 구조 확인 후 수정 파일, 목적, 테스트 명령 우선 보고
```

사전 보고가 `docs/plan.md`와 `AGENTS.md`의 허용 범위 안에 있을 때만 승인합니다.

## 3. 실행할 검증 명령

```bash
node --test tests/validation.test.js
git status --short
git diff -- index.html style.css validation.js app.js tests/validation.test.js
```

테스트 실패 시 완료 보고를 멈추고 코드·테스트·환경·범위 중 원인을 먼저 분류합니다.

## 4. Reviewer 요청

```text
docs/task.md와 docs/plan.md의 인수 조건을 기준으로
테스트 결과, git status, git diff를 검토하세요.

코드는 수정하지 말고 다음 형식으로 답하세요.
1. 인수 조건별 근거
2. 범위 밖 변경 여부
3. 남은 위험
4. PASS·REWORK·BLOCKED 중 최종 판정
```

