# Site statique servi par nginx. Le contenu (.output/public) N'EST PAS construit ici :
# il est généré sur le poste de dev (npm run generate) puis déposé par rsync dans le
# volume ./html monté par docker-compose (voir deploy/deployer.sh). lemeon2 est bridé à
# 2 vCPU et sert des sites clients ; un build Node dans l'image l'a déjà gelé 70 min
# le 05/09/2026.
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
