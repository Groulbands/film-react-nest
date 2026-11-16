# Compile React/Vite in the build stage; no Node.js runtime needed.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve only compiled assets using Nginx, not dev dependencies or source code.
FROM nginx:1.27-alpine AS runtime
COPY --from=build /app/dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
