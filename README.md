# Mock Chart Apis in AWS Lambda

> 줌투자 FE 차트 관련 mock api
>
> - 신규 개발 및 파일럿 프로젝트에 활용

[Serverless 프레임워크](https://www.serverless.com/framework) 활용

## 실행 스크립트

### `deploy`

`Lambda`에 함수 배포

```bash
yarn deploy
# yarn sls deploy
```

### `Serve`

로컬에서 함수 테스트

- 좀더 자세한 CLI 옵션은 [AWS - Invoke Local](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) 참고

```bash
yarn serve -f {함수명}

# ex.
yarn serve -f hello --path src/functions/hello/mock.json
```
