# 🐼 NumPy & Pandas 치트시트 (초심자용)

> 데이터 분석을 처음 시작하는 분들을 위한 필수 문법 모음입니다.
> 코드를 따라 치면서 익혀보세요!

---

## 📦 1. 시작하기 (import)

```python
import numpy as np       # 관례적으로 np 라고 줄여 씁니다
import pandas as pd      # 관례적으로 pd 라고 줄여 씁니다
```

---

# 1부. NumPy (넘파이)

> **NumPy = 숫자 계산을 빠르게!**
> 여러 숫자를 한 덩어리(배열, array)로 묶어서 한 번에 계산합니다.

## 🔢 배열 만들기

```python
a = np.array([1, 2, 3])              # 리스트 → 배열
b = np.array([[1, 2], [3, 4]])       # 2차원 배열 (표 모양)

np.zeros(3)          # [0. 0. 0.]        0으로 채운 배열
np.ones(3)           # [1. 1. 1.]        1로 채운 배열
np.arange(0, 10, 2)  # [0 2 4 6 8]       0부터 10 전까지 2씩
np.linspace(0, 1, 5) # [0. 0.25 0.5 ...] 0~1을 5등분
```

## 📏 배열 정보 확인

```python
a.shape    # 배열 모양 (행, 열)   예: (3,)
a.ndim     # 차원 수             예: 1
a.size     # 전체 원소 개수       예: 3
a.dtype    # 자료형             예: int64
```

## ✂️ 인덱싱 & 슬라이싱 (원하는 값 꺼내기)

```python
a[0]        # 첫 번째 값
a[-1]       # 마지막 값
a[1:3]      # 1번~2번 (3번 전까지)

b[0, 1]     # 2차원: 0행 1열
b[:, 0]     # 모든 행의 0열
b[0, :]     # 0행의 모든 열
```

## ➕ 배열 계산 (반복문 없이 한 번에!)

```python
a + 10      # 모든 값에 10 더하기
a * 2       # 모든 값에 2 곱하기
a + b       # 배열끼리 더하기

a.sum()     # 합계
a.mean()    # 평균
a.max()     # 최댓값
a.min()     # 최솟값
a.std()     # 표준편차
```

## 🔍 조건으로 값 고르기 (불리언 인덱싱)

```python
a[a > 2]        # 2보다 큰 값만 골라내기
a[a % 2 == 0]   # 짝수만 골라내기
```

---

# 2부. Pandas (판다스)

> **Pandas = 엑셀처럼 표 다루기!**
> `Series`(한 줄) 와 `DataFrame`(표) 두 가지를 씁니다.

## 🧱 데이터 만들기

```python
# Series : 한 줄짜리 데이터
s = pd.Series([10, 20, 30])

# DataFrame : 표(엑셀 시트) 모양
df = pd.DataFrame({
    '이름': ['철수', '영희', '민수'],
    '나이': [25, 30, 28],
    '점수': [90, 85, 95]
})
```

## 📂 파일 읽고 쓰기

```python
df = pd.read_csv('data.csv')       # CSV 파일 읽기
df = pd.read_excel('data.xlsx')    # 엑셀 파일 읽기

df.to_csv('결과.csv', index=False) # CSV로 저장
df.to_excel('결과.xlsx', index=False)  # 엑셀로 저장
```
> 💡 `index=False` : 맨 앞 번호(0,1,2...)를 저장하지 않음

## 👀 데이터 살펴보기 (제일 먼저 하는 일)

```python
df.head()      # 위에서 5줄 미리보기
df.tail()      # 아래에서 5줄 미리보기
df.shape       # (행 개수, 열 개수)
df.info()      # 열 이름 · 자료형 · 빈칸 정보
df.describe()  # 숫자 열의 통계 요약 (평균, 최대 등)
df.columns     # 열 이름 목록
df.dtypes      # 각 열의 자료형
```

## 🎯 열(column) · 행(row) 고르기

```python
df['나이']              # 열 하나 선택
df[['이름', '나이']]     # 열 여러 개 선택

df.loc[0]              # 이름표(라벨)로 행 선택
df.iloc[0]             # 번호(위치)로 행 선택
df.loc[0, '나이']       # 0번 행의 '나이' 값
df.iloc[0:2]           # 0~1번 행
```
> 💡 `loc` = 라벨 기준 / `iloc` = 숫자 위치 기준

## 🔍 조건으로 골라내기 (필터링)

```python
df[df['나이'] > 27]                 # 나이가 27 초과인 행
df[df['이름'] == '철수']            # 이름이 철수인 행

# 조건 여러 개 (&=그리고, |=또는, 괄호 꼭!)
df[(df['나이'] > 25) & (df['점수'] >= 90)]
```

## ➕ 열 추가 · 삭제

```python
df['통과'] = df['점수'] >= 90        # 새 열 만들기
df['나이+1'] = df['나이'] + 1

df = df.drop('통과', axis=1)        # 열 삭제 (axis=1)
df = df.drop(0, axis=0)            # 행 삭제 (axis=0)
```

## 🔃 정렬하기

```python
df.sort_values('점수')                      # 점수 오름차순
df.sort_values('점수', ascending=False)     # 점수 내림차순
```

## 🧹 결측치(빈 칸, NaN) 다루기

```python
df.isnull()          # 빈 칸이면 True
df.isnull().sum()    # 열마다 빈 칸 개수 세기

df.dropna()                 # 빈 칸 있는 행 삭제
df.fillna(0)                # 빈 칸을 0으로 채우기
df['나이'].fillna(df['나이'].mean())  # 평균값으로 채우기
```

## 📊 그룹으로 묶어 계산 (groupby)

```python
# '반'별 점수 평균
df.groupby('반')['점수'].mean()

# '반'별 개수 세기
df.groupby('반').size()

# 값 종류별 개수 (아주 자주 씀!)
df['이름'].value_counts()
```

## 🔗 기타 자주 쓰는 것들

```python
df['나이'].unique()      # 중복 없는 값 목록
df['나이'].nunique()     # 값 종류가 몇 개인지
df['점수'].apply(lambda x: x / 10)   # 각 값에 함수 적용
df.rename(columns={'점수': '성적'})  # 열 이름 바꾸기
```

---

## 💡 초보자 꿀팁

1. **먼저 `df.head()` 와 `df.info()` 부터!** 데이터가 어떻게 생겼는지 확인하는 습관.
2. **`loc` 과 `iloc` 헷갈릴 땐** → 이름표는 `loc`, 숫자 위치는 `iloc`.
3. **조건 여러 개는 괄호로 감싸기** → `(조건1) & (조건2)`
4. **에러가 나도 당황하지 말기** → 에러 메시지 마지막 줄을 읽으면 원인이 보여요.
5. **바꾼 결과는 다시 저장해야 함** → `df = df.drop(...)` 처럼 다시 담아주기.

---

## 📖 자주 쓰는 흐름 예시

```python
# 1. 파일 읽기
df = pd.read_csv('data.csv')

# 2. 살펴보기
df.head()
df.info()

# 3. 필터링
결과 = df[df['점수'] >= 90]

# 4. 정렬
결과 = 결과.sort_values('점수', ascending=False)

# 5. 저장
결과.to_csv('우수자.csv', index=False)
```

---

*Happy Data Analysis! 🚀*
