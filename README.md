# 🐜 Mine AccountBook Web Application 

React와 Redux를 이용한 달력 기반 가계부 웹애플리케이션 입니다.
해당 문서는 프로젝트를 진행할때 다른 동료가 쉽게 이해할 수 있도록 아래와 같은 내용이 기술되어 있습니다.

```
1. 프로젝트 목표
2. 실행 스크립트
3. 프로젝트 디렉토리 구조 
4. 프로젝트 관리
```

프로젝트 요구사항을 구현하는 과정에서 발생한 다양한 이슈들은 [wiki](https://github.com/CodeSoom/project-react-4-seong-dodo/wiki )페이지를 통해서 관리하고 있습니다.

</br>
</br>
</br>

## 1. 프로젝트 목표
---

- 컴포넌트 단위테스트를 진행하여 검증 가능한 프론트엔드 코드를 작성한다. (유닛 테스트 코드 시나리오 README에 문서화)
-  Phase 1 : 백엔드 API 없이 프론트엔드환경에서만 돌아갈수있는 웹애플리케이션을 React와 Redux를이용해서개발 (여기까지 진행한 github 브랜치 주소 넣기)

-  Phase 2 : Phase 1에서 완료한 프론트엔드환경에서 백엔드 API를 붙여서영구적인데이터저장이가능하도록개발 (여기까지 진행한 github 브랜치 주소 넣기)

## 2. 실행 스크립트
---

### 2.1 개발모드 실행

webpack-dev-server를 통해 개발환경에서 즉시 실행가능한 리액트 웹애플리케이션을 구동하는 명령어 입니다.

``` javascript
 npm start
```

### 2.2 Unit 테스트

컴포넌트 전체의 Unit테스트를 돌릴때 사용합니다. 

``` javascript
npm run test:unit
```

모듈별로 테스트 하고 싶다면 아래와 같이 명령어를 실행합니다.
예를들어 NotFoundPage컴포넌트 unit 테스트를 수행하고 싶으면 `npm run test unit: src/NotFoundPage.test.jsx` 와 같이 명령어를 입력합니다.
```
npm run test unit: src/파일명
```

### 2.3 Lint 검사

eslint로 전체 프로젝트에 대해서 lint를 수행합니다.

``` javascript
npm run lint
```

### 2.4 번들링 빌드

``` javascript
npm run build
```

## 3. 프로젝트 디렉토리 구조
---

개발이 진행되면서 리액트 컴포넌트가 많아지면서 이를 알아보기 힘들어지는 문제가 있었습니다. 컴포넌트를 기능별로 모아서 구조화 시켰습니다. 예를들어 가계부 관련 컴포넌트들은 accountbook이라는 하위 디렉토리에 위치합니다. 또한, 컴포넌트의 유닛테스틑 코드들도 같은 경로에 위치합니다. 디렉토리 구조에 대해서 설명하기 위해 남긴내용이므로 전체 디렉토리를 출력하지는 않고 일부 디렉토리만 아래에서 확인할 수 있습니다.

```

├── package.json
├── src
│   ├── App.jsx
│   ├── App.test.jsx
│   ├── NotFoundPage.jsx
│   ├── NotFoundPage.test.jsx
│   ├── accountbook
│   │   ├── AccountBookPage.jsx
│   │   ├── AccountBookPage.test.jsx
│   │   ├── budget
│   │   │   ├── BudgetContainer.jsx
│   │   │   ├── BudgetContainer.test.jsx
│   │   │   ├── BudgetForm.jsx
│   │   │   ├── BudgetForm.test.jsx
│   │   │   ├── BudgetPage.jsx
│   │   │   └── BudgetPage.test.jsx
│   │   ├── calendar
│   │   │   ├── CalendarContainer.jsx
│   │   │   ├── CalendarContainer.test.jsx
│   │   │   ├── CalendarDate.jsx
│   │   │   ├── CalendarDate.test.jsx
│   │   │   ├── CalendarDays.jsx
│   │   │   ├── CalendarDays.test.jsx
│   │   │   ├── CalendarMonth.jsx
│   │   │   ├── CalendarMonth.test.jsx
│   │   │   ├── CalendarPage.jsx
│   │   │   ├── CalendarPage.test.jsx
│   │   │   ├── CalendarWeeks.jsx
│   │   │   ├── CalendarWeeks.test.jsx
│   │   │   ├── DateData.jsx
│   │   │   └── DateData.test.jsx
│   │   ├── dailyTransaction
│   │   │   ├── Button.jsx
│   │   │   ├── Button.test.jsx
│   │   │   ├── DailyTransaction.jsx
│   │   │   ├── DailyTransaction.test.jsx
│   │   │   ├── DailyTransactionContainer.jsx
│   │   │   ├── DailyTransactionContainer.test.jsx
│   │   │   ├── DailyTransactionModal.jsx
│   │   │   ├── DailyTransactionModal.test.jsx
│   │   │   ├── DefalutTransaction.jsx
│   │   │   ├── DefalutTransaction.test.jsx
│   │   │   ├── Transaction.jsx
│   │   │   ├── Transaction.test.jsx
│   │   │   ├── TransactionData.jsx
│   │   │   └── TransactionData.test.jsx

.
.
.
생략

```


컴포넌트를 구조적으로 구분하기 위해서 아래와 같은 형태로 디렉토리를 구성했습니다.


## 4. 프로젝트 주요 기능 소개
---

### 4.1 캘린더 기능

### 4.2 가계부 작성 기능

### 4.3 가계부 수정 기능

### 4.4 가계부 삭제 기능

### 4.4 캘린더 가계부 현황 조회




## 5. 프로젝트 관리 
---

프로젝트 진행을 github repository의 project탭에 있는  [ 칸반 대시보드](https://github.com/CodeSoom/project-react-4-seong-dodo/projects/1
)를 통해 프로젝트 진행 현황을 관리하고 있습니다. 모든 작업은 github issue로 생성해서 [issue](https://github.com/CodeSoom/project-react-4-seong-dodo/issues?q=is%3Aissue+is%3Aclosed)에서 발급되는 id를 브랜치로 생성해서 작업하고 있습니다.

모든 작업은 feature에서 작업하고 PR을 통해서 base브랜치에 merge하는 방식으로 진행했습니다. 혼자서 진행한 프로젝트지만 최대한 협업 process를 따르고 싶어서 위와 같은 방법으로 진행했습니다.


![](https://images.velog.io/images/seong-dodo/post/6e36da96-abb5-45f1-9d35-4f275074c3ed/image.png)



