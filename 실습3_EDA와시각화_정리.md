# 실습3: EDA와 시각화·전처리 정리

## 전체 흐름

카페 판매 더미 데이터(200행)로 시각화·전처리를 익히고, Seaborn 내장 **타이타닉 데이터(891행)**로 EDA 전 과정(구조 파악 → 결측/이상치 처리 → 집계 → 특성 공학)을 실습한다. 각 TODO의 `None` 자리를 채워 `assert`를 통과시키는 방식이다.

- **Step 1~2**: 차트 선택 기준, 한글 폰트 설정, Matplotlib 기본 차트와 서브플롯
- **Step 3**: Seaborn 통계 시각화(평균·분포·상관관계)
- **Step 4~5**: 전처리 4대 작업(결측·이상치·정규화·인코딩)과 변환 도구
- **Step 6~8**: 타이타닉 EDA와 미니 프로젝트(결측치 대체 + 특성 공학)

---

## 라이브러리 한 줄 설명

- **NumPy**: 숫자 배열과 수학 연산을 빠르게 처리하는 파이썬 수치 계산 기본 라이브러리.
- **pandas**: 표(행·열) 형태 데이터를 다루는 라이브러리. 조회·필터·집계·전처리의 중심 도구(`DataFrame`).
- **Matplotlib**: 파이썬의 대표 그래프 라이브러리. 막대·꺾은선·산점도 등 거의 모든 차트를 세밀하게 그린다.
- **Seaborn**: Matplotlib을 감싼 통계 시각화 라이브러리. 짧은 코드로 평균·분포·상관관계를 예쁘게 그린다.

---

## 용어 설명

### Matplotlib 관련

- **Figure(그림)**: 차트가 그려지는 전체 캔버스. `plt.figure()` 또는 `plt.subplots()`로 만든다.
- **Axes(축, `ax`)**: 실제로 그래프가 그려지는 하나의 영역. 한 Figure 안에 여러 개 둘 수 있다.
- **서브플롯(subplot)**: 한 Figure를 여러 칸으로 나눠 여러 차트를 동시에 배치하는 것. `plt.subplots(행, 열)`로 만들고 `axes[행, 열]`로 접근한다.
- **`plt.~` vs `ax.~`**: `plt.bar()`는 "현재 그림"에, `ax.bar()`는 "지정한 축"에 그린다. 축 객체를 쓸 때 제목·라벨은 `set_title`, `set_xlabel`처럼 **`set_` 접두어**가 붙는다.
- **한글 폰트**: Matplotlib 기본 폰트는 한글을 지원하지 않아 라벨이 네모(□)로 깨진다. OS별 폰트(Windows `Malgun Gothic`, mac `AppleGothic`, Linux `NanumGothic`)를 지정해야 한다. `axes.unicode_minus=False`는 음수 부호 깨짐을 막는다.

### 차트 종류

- **막대그래프(bar)**: 카테고리(범주) 간 크기를 비교할 때. 예) 지역별 매출.
- **꺾은선그래프(line/plot)**: 시간 순 변화·추이를 볼 때. 예) 월별 매출.
- **히스토그램(hist)**: 값이 어느 구간에 몰리는지(분포·빈도)를 볼 때. 예) 수량 분포.
- **산점도(scatter)**: 두 변수의 관계(상관)를 볼 때. 예) 단가 vs 수량.
- **박스플롯(boxplot)**: 범주별 산포와 이상치를 볼 때. 사분위수·중앙값을 상자로 표현.

### Seaborn 관련

- **`barplot`**: 그룹별 **평균**을 자동 계산해 막대로 그린다(신뢰구간 표시). `plt.bar`와 달리 `groupby`를 따로 안 해도 된다.
- **`boxplot`**: 범주별 분포와 이상치를 사분위수 기준으로 그린다.
- **`heatmap`**: 행렬(표)을 색의 진하기로 시각화. 주로 상관관계 표에 사용.
- **상관관계(correlation)**: 두 숫자 변수가 함께 커지고 작아지는 정도를 -1~1로 나타낸 값. `df.corr(numeric_only=True)`로 표를 만들고 `annot=True`로 숫자를 표시.

### EDA 관련

- **EDA(탐색적 데이터 분석)**: 데이터를 그래프와 통계로 여러 각도에서 관찰해 분포·문제를 파악하고 가설을 세우거나 수정하는 과정.
- **전처리(preprocessing)**: 분석·모델링 전에 결측치·이상치를 처리하고 값을 변환하는 작업. 원본은 보존하고 사본으로 작업한다.
- **결측치(NaN)**: 값이 비어 있는 것. 평균·중앙값·최빈값으로 채우거나 제거한다.
- **이상치(Outlier)**: 비정상적으로 크거나 작은 값. 사분위수(IQR)나 상한선으로 보정한다.
- **IQR(사분위 범위)**: `Q3 - Q1`(상위 25% 경계 − 하위 25% 경계). 이상치 판단 기준으로 쓰며, 흔히 상한 = `Q3 + 1.5*IQR`.
- **정규화(normalization)**: 범위가 다른 값들을 같은 스케일로 맞추는 것. min-max 정규화는 모든 값을 0~1로 변환.
- **인코딩(encoding)**: 글자(범주)를 계산 가능한 숫자 코드로 바꾸는 것.
- **특성 공학(feature engineering)**: 기존 컬럼을 조합해 분석에 쓸모 있는 새 컬럼을 만드는 것. 예) `family = sibsp + parch`.

---

## 필수 함수

### 시각화 (Matplotlib / Seaborn)

- `plt.bar / plot / hist / scatter` — 막대·꺾은선·히스토그램·산점도
- `plt.subplots(행, 열)` — 여러 차트 영역 생성 → `axes[행, 열]`로 접근, 축 객체는 `set_title` / `set_xlabel`처럼 `set_` 접두어 사용
- `plt.tight_layout()` — 라벨 겹침 방지
- `sns.barplot` (그룹 **평균** 자동 계산) / `sns.boxplot` (분포·이상치) / `sns.heatmap(df.corr(numeric_only=True), annot=True)` (상관관계)

### 전처리

- `df.isnull().sum()` — 컬럼별 결측 개수 확인
- `fillna(값)` — 결측치 채우기: 평균 `mean()`, 중앙값 `median()`, 최빈값 `mode()[0]`
- `quantile(0.25 / 0.75)` + `clip(upper=상한)` — IQR로 이상치 보정 (상한 = `Q3 + 1.5*IQR`)
- **min-max 정규화**: `(값 - 최솟값) / (최댓값 - 최솟값)` → 0~1 스케일
- `map({...})` — 범주형(글자)을 숫자 코드로 인코딩

### 변환

- `drop([컬럼], axis=1)` — 열 삭제 (**결과를 다시 대입해야 반영**)
- `apply(함수)` — 컬럼 전체에 함수 적용 (괄호 없이 함수명만 전달)
- `pd.qcut(col, n)` — 개수가 같도록 n구간 / `pd.cut(col, n)` — 폭이 같도록 n구간
- `cat.add_categories("값")` — category 타입에 없는 값을 채우기 전 범주 먼저 추가

### EDA·집계

- `shape / info() / describe()` — 크기·자료형·통계 요약
- `value_counts()` — 값 분포
- `groupby(...)["survived"].agg(["sum", "mean"])` — `survived`가 0/1이라 **sum=생존자 수, mean=생존율**
- `reset_index()` + `sort_values(by="mean", ascending=False)` — MultiIndex를 풀어 순위표로 정렬
- `pivot_table(index=, columns=, values=, aggfunc=)` — 교차 집계
- `quantile(0.9)` — 상위 10% 경계값

---

## 자주 하는 실수 3가지

1. **`fillna`·`clip`·`drop`은 재할당해야 반영** — `df["x"] = df["x"].fillna(...)`처럼 다시 대입해야 한다.
2. **`apply`는 함수명만 전달** — `apply(grade)` (O), `apply(grade())` (X).
3. **`mode()`는 Series를 반환** — 최빈값 한 개를 쓰려면 `mode()[0]`로 첫 값을 꺼낸다.
