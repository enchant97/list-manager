FROM node:18-alpine3.16 as builder

    WORKDIR /app

    COPY package.json .
    COPY tsconfig.json .
    COPY vite.config.ts .

    RUN npm install

    COPY src src

    RUN npm run build

FROM nginx:stable-alpine

    COPY --from=builder /app/dist /usr/share/nginx/html
    COPY static static
