---
title: "[Docker][Spring] Spring WAS 도커로 띄우기"
last\_modified\_at: 2021-11-06T 2:02 +09:00
header:
  overlay\_color: "#333"
categories:
  - Docker/Spring
tags:
  - Docker
  - Spring
toc: false
---
## ubuntu + jdk 이미지
- Dockerfile
- Spring의 .jar 파일을 실행하는 이미지 생성
- 한글 사진 파일 업로드를 위한 locale 설정

```yaml
FROM ubuntu
RUN apt-get update
RUN apt-get install -y openjdk-11-jdk
RUN apt-get -y install locales
RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen
ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8  
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
    volumes:
      - ./db:/var/lib/mysql
    environment:
      - MYSQL_DATABASE=moviereview
      - MYSQL_ROOT_PASSWORD=1234
      - MYSQL_ROOT_HOST=%
    command: ['--character-set-server=utf8mb4', '--collation-server=utf8mb4_unicode_ci']
    ports:
      - "3306:3306"
    platform: linux/amd64

  application:
    container_name: application
    build: .
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

---
- 사진 파일 업로드시 볼륨을 이용하여 호스트의 하드디스크에 저장
- data도 볼륨을 생성하여 컨테이너 삭제후 다시 만들어도 기존 서버 유지 가능