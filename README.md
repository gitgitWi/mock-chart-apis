# Mock Chart Apis in AWS Lambda

> 줌투자 FE 차트 관련 mock api
>
> - 신규 개발 및 파일럿 프로젝트에 활용

## Packages

### Daily Prices

- GET `/stocks`

  - 종목 리스트
  - 국내 시가총액 상위 100 종목

- GET `/prices/:market/:stockCode?period={PricesPeriod}`

  - 각 종목별 일별 데이터
  - 인터페이스; 네이버 종목 차트 API 인터페이스와 동일

  ```typescript
  {
    "lowPrice": number,
    "highPrice": number,
    "openPrice": number,
    "localDate": `${number}`, // ex. "20210315"
    "closePrice": number,
    "accumulatedTradingVolume": number,
    "foreignRetentionRate": number
  }
  ```

---

## ChangeLogs

### '22.05.02.

- `Serverless` 프레임워크 제거

  - 기존 Lambda + API Gateway로 함수 구성할 때는 인프라 설정 난이도 때문에 `Serverless` 프레임워크 활용도가 높았으나
  - Lambda Function URL이 나오면서 함수만 구현하면 실행 가능해짐..
  - 오히려 `Serverless`에 대한 러닝커브 때문에 배포하기 더 어려운 느낌이 들어서 제거함

- monorepo로 재구성

  - 함수마다 개별 패키지 구성
  - `yarn workspaces` 등 monorepo tool은 `node_modules` 포함시켜야 하는 문제 때문에 사용X
    - 나중에 `esbuild`나 `parcel`로 번들링하면 가능할 수도..?

- ECR 컨테이너 이미지로 배포
  - node_modules 포함하는 문제 => `.zip`으로 압축해 올리는 것도 가능하나..
  - 압축 해제시 root에 `index.mjs`가 위치하지 않고 `root/(zip파일이름)/index.mjs`에 위치하는 문제 해결
