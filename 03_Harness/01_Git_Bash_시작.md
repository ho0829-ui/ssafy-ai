# Git Bash에서 local Git 시작하기

VS Code에서 `ssafy-learning-planner` 폴더를 열고 통합 터미널 프로필을 Git Bash로 선택합니다.

## 1. 환경과 현재 폴더 확인

```bash
git --version
node --version
pwd
```

`pwd`의 마지막 폴더가 `ssafy-learning-planner`인지 확인합니다.

## 2. baseline 만들기

```bash
git init
git add .
git commit -m "starter baseline"
git status
```

`working tree clean`이 표시되어야 합니다. 실제 이름과 이메일을 입력하지 않습니다.

## 3. 기능 branch 만들기

```bash
git switch -c feature/input-validation
git branch --show-current
git status --short
```

공통 완료 지점:

- [ ] 현재 branch가 `feature/input-validation`입니다.
- [ ] `git status --short`에 아무 내용도 없습니다.
- [ ] VS Code가 같은 프로젝트 폴더를 열고 있습니다.
