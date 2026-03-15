# Étape 1 : Construire l’application
FROM gradle:7.6.0-jdk17 AS build
WORKDIR /app
COPY . /app
RUN ./gradlew clean build

# Étape 2 : Configurer l'image finale
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/build/libs/*.jar /app/app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
