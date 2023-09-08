# Étape de construction
FROM node:18.17.0 AS build

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
FROM nginx:latest

# Copiez les fichiers de build dans le répertoire de publication NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Copiez votre fichier de configuration NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposez le port 80 (par défaut) pour NGINX
EXPOSE 80

