FROM node:17-alpine3.15 as builder

    WORKDIR /app

    COPY package.json package.json
    COPY tsconfig.json tsconfig.json

    RUN npm install

    COPY public public
    COPY src src

    RUN npm run build

FROM nginx:stable-alpine

    COPY --from=builder /app/build /usr/share/nginx/html
