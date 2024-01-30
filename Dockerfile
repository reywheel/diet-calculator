FROM node:20-alpine as build
WORKDIR /app
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
COPY . .
RUN --mount=type=cache,target=/root/.npm \
    npm run build

FROM nginx:1.25-alpine
COPY --from=build /app/dist /usr/share/nginx/html
