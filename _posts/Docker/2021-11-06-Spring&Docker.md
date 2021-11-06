---
title: "[Docker][Spring] Spring WAS 도커로 띄우기"
last\_modified\_at: 2021-11-06T 1:46 +09:00
header:
  overlay\_color: "#333"
categories:
  - Docker/Spring
tags:
  - Docker
  - Spring
toc: false
---
## JDK 이미지
- Dockerfile
- Spring .jar 파일을 실행하는 이미지 생성

```yaml
FROM azul/zulu-openjdk:11
ARG JAR_FILE=./build/libs/*.jar
ADD ${JAR_FILE} app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
```

## mariadb와 Spring 이미지를 docker-compose.yml로 생성
```yaml
version: "3"
services:
  database:
    container_name: database
    image: mariadb
    environment:
      - MYSQL_DATABASE=moviereview
      - MYSQL_ROOT_PASSWORD=1234
      - MYSQL_ROOT_HOST=%
    command: ['--character-set-server=utf8mb4', '--collation-server=utf8mb4_unicode_ci']
    ports:
      - "3306:3306"
    platform: linux/amd64 // m1 맥북

  application:
    container_name: application
    build: . // 같은 디렉토리에 있는 Dockerfile를 빌드하여 이미지 / 컨테이너 생성
    environment:
      SPRING_DATASOURCE_URL: jdbc:mariadb://database:3306/moviereview?useSSL=false&serverTimezone=UTC&useLegacyDatetimeCode=false&allowPublicKeyRetrieval=true
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: 1234
    volumes:
      - ./photo:/var/lib/photo
    restart: always
    ports:
      - "8080:8080"
```