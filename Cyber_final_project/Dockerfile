# Build stage
FROM gradle:jdk21 AS builder
WORKDIR /app
COPY . .
RUN gradle build --no-daemon -x test

# Run stage
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8081
ENTRYPOINT java -Dspring.datasource.url=jdbc:${DATABASE_CONNECTION} -Dspring.jpa.hibernate.ddl-auto=update -jar app.jar