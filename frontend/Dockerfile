# syntax=docker/dockerfile:1.4
FROM node:18-alpine3.16 as installer

    WORKDIR /app

    COPY package.json .
    COPY package-lock.json .

    RUN npm install

FROM node:18-alpine3.16 as builder

    WORKDIR /app

    COPY --from=installer --link /app/node_modules /app/node_modules

    COPY . .

    COPY src src

    RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine

    COPY --from=builder --link /app/dist /usr/share/nginx/html
