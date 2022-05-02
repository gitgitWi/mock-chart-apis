FROM public.ecr.aws/lambda/nodejs:14

COPY . ${LAMBDA_TASK_ROOT}

RUN npm i -g yarn

RUN yarn install

CMD [ "index.handler" ]
