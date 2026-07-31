# 학습 항목 입력 검증 구현 계획

## 작업 범위
1. validation.js에 앞뒤 공백 제거, 빈 입력 거부, 40자 경계 판정 함수를 구현한다.
2. tests/validation.test.js의 네 경계 테스트를 실행한다.
3. app.js에서 브라우저가 같은 검증 함수를 사용하도록 연결한다.
4. 실패 메시지를 입력 영역 근처에 표시하고 성공 시 제거한다.
5. 기존 필터·완료·삭제 기능을 브라우저에서 확인한다.

## 기본 수정 파일
- validation.js
- app.js
- tests/validation.test.js

## 조건부 수정 파일
- index.html: validation.js 로드와 오류 메시지 요소
- style.css: 오류 메시지 스타일

## 인수 조건
1. 빈 문자열과 공백만 있는 입력은 추가되지 않고 이유가 표시된다.
2. 앞뒤 공백은 제거된 값으로 정상 추가된다.
3. 정확히 40자는 허용되고 41자는 거부된다.
4. Node 테스트 4개가 모두 통과한다.
5. 필터·완료·삭제 기능이 계속 동작한다.

## 확인 명령

```bash
node --test tests/validation.test.js
git status --short
git diff -- index.html style.css validation.js app.js tests/validation.test.js
```

