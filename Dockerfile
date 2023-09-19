FROM node:18.17.0 AS build
WORKDIR /app

RUN npm cache clean --force

COPY . .
#RUN npm install
#RUN npm run build --prod

FROM nginx:latest AS ngi

COPY --from=build /app/dist/appweb /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80





