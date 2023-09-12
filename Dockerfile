# Stage 1: Build the Angular app
FROM node:18.17.0 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm cache clean --force
COPY . .


# Stage 2: Use Nginx to serve the built app
FROM nginx:latest AS ngi
COPY --from=build /app/dist/appweb /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80





