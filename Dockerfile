FROM node:12.14-alpine AS build
# Create a Virtual directory inside the docker image
WORKDIR /dist/src/app

RUN npm cache clean --force
# Copy files from local machine to virtual directory in docker image
COPY . .


FROM nginx:latest AS ngi

COPY --from=build /dist/src/app/dist/my-docker-angular-app /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80