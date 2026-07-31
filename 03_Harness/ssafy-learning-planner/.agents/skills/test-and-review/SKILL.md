---
name: test-and-review
description: 입력 검증 기능처럼 코드 변경 뒤 테스트 결과와 Git 변경 범위를 확인해야 할 때 사용합니다. 테스트, git status, git diff를 순서대로 확인하고 PASS·REWORK·BLOCKED 근거를 보고합니다.
argument-hint: "[task 또는 plan 파일]"
---

# Test and Review

## 사용 절차

1. docs/task.md와 docs/plan.md의 인수 조건을 읽는다.
2. 변경 파일이 허용 범위 안인지 확인한다.
3. 아래 테스트 명령을 실행하거나 사용자에게 실행을 요청한다.
4. 테스트가 실패하면 완료 판단을 중단하고 실패 위치를 기록한다.
5. git status와 git diff로 실제 변경 범위를 확인한다.
6. 인수 조건별 근거, 남은 위험과 최종 판정을 보고한다.

## 명령

```bash
node --test tests/validation.test.js
git status --short
git diff -- index.html style.css validation.js app.js tests/validation.test.js
```

## 판정

- PASS: 필수 테스트 통과, 요구 충족, 범위 밖 변경 없음
- REWORK: 테스트 실패, 요구 미충족, 범위 밖 변경 발견
- BLOCKED: 실행 환경 또는 판단 근거 부족

테스트를 삭제하거나 기대값을 약화해 PASS를 만들지 않습니다.

