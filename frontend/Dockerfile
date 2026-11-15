# The frontend image packages built files; the one-shot service copies them into a named volume.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM alpine:3.20
WORKDIR /app
COPY --from=build /app/dist ./dist
CMD ["sh", "-c", "cp -a /app/dist/. /frontend-dist/"]
