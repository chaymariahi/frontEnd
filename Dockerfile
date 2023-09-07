FROM node:12.14-alpine AS build
# Create a Virtual directory inside the docker image
WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force

# Installez les dépendances
COPY dist /usr/share/nginx/html

# Copy files from local machine to virtual directory in docker image
COPY . .

# Build de l'application Angular pour la production


FROM nginx:latest 

COPY --from=build /app/dist/my-docker-angular-app /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
