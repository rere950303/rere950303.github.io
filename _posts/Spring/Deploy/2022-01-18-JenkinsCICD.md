---
title: "[Spring][Deploy] Jenkins를 이용한 CI, CD"
last\_modified\_at: 2022-01-18T 10:59 +09:00
header:
  overlay\_color: "#333"
categories:
  - Spring/Deploy
tags:
  - Spring
  - Deploy
  - AWS
  - Jenkins
  - CI
  - CD
---
## 들어가며
저번에 배포한 스프링 App을 Jenkins를 이용하여 CI, CD 구현하는 과정을 기록하는 포스팅

## 동작 과정
- 배포하고자 하는 `git`의 branch를 정하고 `Jenkins`와 연동
- `push`하는 경우 `Jenkins`에서 `gradle` 빌드 테스트 후에 `jar` 빌드 성공 시 셸스크립트를 통해 도커 이미지 빌드 후 hub에 업로드
- `Jenkins` 서버와 배포 서버를 `ssh` 연동 후 도커로 서버 배포

## 인스턴스 준비
- `Jenkins`, `app1`, `app2`, `RDS` 총 4개를 준비한다. 
- `Jenkins` 서버에서 `ssh` 통신을 위한 `ssh-keygen`을 생성한다. 이것은 `github`, `app1`, `app2` 연동에 쓰인다.
- `Jenkins` 서버에는 `jdk`, `git`, `docker`, `docker-compose`, `Jenkins`를 설치한다.
- `app1`, `app1` 서버에는 `docker`와 `docker-compose`를 설치한다.
- `Jenkins` 서버의 경우 메모리 부족으로 원활한 빌드가 안될 수 있으니 `swap` 기능을 구현한다.

```yaml
sudo dd if=/dev/zero of=/swapfile bs=128M count=32 // swapfile 생성
sudo chmod 600 /swapfile                            
sudo mkswap /swapfile                              // swap 생성
sudo swapon /swapfile                              // swap 파일 추가, 이용
sudo swapon -s
sudo vi /etc/fstab                                 // 부팅 시 swap 파일 활성화
/swapfile swap swap defaults 0 0
free                                               // swap 확인
```

## `Jenkins` 준비
- 8080 포트로 접속 후 필요한 플러그인을 설치한다.
- 생성한 `ssh`키를 `git`과 `Jenkins`에 등록한다.
- `git`에 webhook을 등록한다. 서버 인바운드 규칙으로 해당 webhook의 IP를 개방해야 한다.
- `gradle wrapper` 빌드를 선택한다.
- 셸 스크립트를 작성하여 `jar` 빌드 후 도커에 대한 명령어를 생성한다.

```yaml
#!/bin/bash

DOCKER_REPOSITORY_NAME=$1
ID= ~
PW= ~

#docker image의 첫 tag를 확인 후, 다음 버전의 image를 생성
#만약 처음 생성되는 이름이라면 0.01 이름으로 생성해준다.

TAG=$(docker images | awk -v DOCKER_REPOSITORY_NAME=$DOCKER_REPOSITORY_NAME '{if ($1 == DOCKER_REPOSITORY_NAME) print $2;}')

# 만약 [0-9]\.[0-9]{1,2} 으로 버전이 관리된 기존의 이미지 일 경우
if [[ $TAG =~ [0-9]\.[0-9]{1,2} ]]; then
    NEW_TAG_VER=$(echo $TAG 0.01 | awk '{print $1+$2}')
    echo "현재 버전은 $TAG 입니다."
    echo "새로운 버전은 $NEW_TAG_VER 입니다"

# 그 외 새롭게 만들거나, lastest or lts 등 tag 일 때
else
    # echo "새롭게 만들어진 이미지 입니다."
    NEW_TAG_VER=0.01
fi

# 현재 위치에 존재하는 DOCKER FILE을 사용하여 빌드
docker build -t $DOCKER_REPOSITORY_NAME:$NEW_TAG_VER .

# docker hub에 push 하기위해 login
docker login -u $ID -p $PW

if [ $NEW_TAG_VER != "0.01" ]; then
    docker rmi $DOCKER_REPOSITORY_NAME:$TAG
fi
# 새로운 태그를 설정한 image를 생성
docker tag $DOCKER_REPOSITORY_NAME:$NEW_TAG_VER $ID/$DOCKER_REPOSITORY_NAME:$NEW_TAG_VER

# docker hub에 push
docker push $ID/$DOCKER_REPOSITORY_NAME:$NEW_TAG_VER

# tag가 "latest"인 image를 최신 버전을 통해 생성
docker tag $DOCKER_REPOSITORY_NAME:$NEW_TAG_VER $ID/$DOCKER_REPOSITORY_NAME:latest

# latest를 docker hub에 push
docker push $ID/$DOCKER_REPOSITORY_NAME:latest

# 버전 관리에 문제가 있어 latest를 삭제
docker rmi $ID/$DOCKER_REPOSITORY_NAME:latest
docker rmi $ID/$DOCKER_REPOSITORY_NAME:$NEW_TAG_VER
```
- hub의 경우 모든 버전이 누적되고 로컬에는 마지막 버전만이 관리된다.

## `app` 서버 준비
- `Public over ssh` 플러그인이 최근에 보안상의 문제로 지원되지 않는다고 한다.
- 따라서 직접 `ssh` 접속 후 `docker-compose.yml`과 `.env`를 생성해서 컨테이너를 띄운다.

```yaml
version: "3"
services:
  app_8081:
    image: rere95/movierank:latest
    container_name: app_8081
    environment:
      active.profile: "dev1"
      jwt.key: ${jwt_key}
      kobis.key: ${kobis_key}
      quartz.time: "0 51 00 * * ?"
      kmdb.key: ${kmdb_key}
      jwt.time: "86400"
      jdbc.url: ${jdbc_url}
      db.name: "rere"
      db.password: ${db_password}
    restart: always
    ports:
      - "8081:8081"

  redis:
    image: redis:alpine
    container_name: composeRedis
    restart: always
    ports:
      - "6379:6379"
```

## Prometheus & Grafana 연동
- `prometheus.yml`의 target을 AWS app 서버로 변동한다.
- 이후 로컬에서 Grafana를 실행시키면 monitoring이 가능하다.

## 고찰
- 배포는 크게 어려운 건 없는데 희한하게 시간이 많이 걸린다. 터미널 조작이나 명령이 아직 미숙한 부분이 있고 AWS도 많이 다뤄보지 않아서 그런 것 같다.
- 다음에는 `Nginx` 또는 `Kubernetes`를 통해서 무중단 배포를 해볼 생각이다. 