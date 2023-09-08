FROM node:18.17.0-alpine AS build
# Étape de construction
#FROM node:18.17.0 AS build

#FROM alpine:3.13.5

# Créez un répertoire de travail
WORKDIR /dist/src/app

RUN npm cache clean --force

# Copiez les fichiers package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installez les dépendances
# Copiez le reste de votre application
COPY . .

# Construisez votre application Angular pour la production
# Étape de déploiement
FROM nginx:latest AS ngi
# Copying compiled code and nginx config to different folder
# NOTE: This path may change according to your project's output folder 
COPY --from=build /dist/src/app/dist/appweb /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

# Exposez le port 80 (par défaut) pour NGINX
EXPOSE 80

