FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Kopier JAR-filen
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

# Sett tidsone
ENV TZ=Europe/Oslo

# Eksponer port 8080
EXPOSE 8080

# Installer curl for health check
RUN apk add --no-cache curl

# Bruk non-root bruker for bedre sikkerhet
RUN addgroup -S spring && adduser -S spring -G spring

# Health check for container
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8080/api/health || exit 1

# Skift til non-root bruker
USER spring:spring

ENTRYPOINT ["java", "-jar", "app.jar"]