MOCK_DAILY_PRICES_REPO_NAME="fe-mock-daily-prices"
ECR_BASE_URL="108010655160.dkr.ecr.ap-northeast-2.amazonaws.com"

docker build -t $MOCK_DAILY_PRICES_REPO_NAME .
# docker run -p 9000:8080 $MOCK_DAILY_PRICES_REPO_NAME
# aws ecr create-repository --repository-name $MOCK_DAILY_PRICES_REPO_NAME --image-scanning-configuration scanOnPush=true --image-tag-mutability MUTABLE
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin $ECR_BASE_URL
docker tag "$MOCK_DAILY_PRICES_REPO_NAME:latest" "$ECR_BASE_URL/$MOCK_DAILY_PRICES_REPO_NAME:latest"
docker push "$ECR_BASE_URL/$MOCK_DAILY_PRICES_REPO_NAME:latest"
