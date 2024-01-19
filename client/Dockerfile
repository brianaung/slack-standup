# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /client
COPY . .
RUN npm install
CMD ["npm", "run", "dev"]
EXPOSE 3000
