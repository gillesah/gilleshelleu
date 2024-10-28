# Utilise une image Node pour construire l'application Vite
FROM node:18 AS build
WORKDIR /app
COPY . /app
RUN npm install && npm run build

# Utilise Nginx pour servir les fichiers statiques
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
