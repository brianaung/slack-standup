FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm i -g pnpm \
      && pnpm install

COPY . .

RUN pnpm build

CMD [ "pnpm", "run", "start:prod" ]
