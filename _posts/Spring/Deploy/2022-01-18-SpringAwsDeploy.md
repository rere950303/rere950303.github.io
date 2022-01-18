---
title: "[Spring][Deploy] AWS에 Spring Boot App 배포하기"
last\_modified\_at: 2022-01-18T 10:13 +09:00
header:
  overlay\_color: "#333"
categories:
  - Spring/Deploy
tags:
  - Spring
  - Deploy
  - AWS
---
## 들어가며
기존에 만들었던 RESTful API 프로젝트를 AWS EC2에 배포하는 방법과 그 과정을 기록하는 포스팅

## EC2 & RDS 생성
기존에 만들었던 AWS 계정을 탈퇴해서 새로운 이메일로 재가입을 했다. 인스턴스는 EC2 1개 RDS 1개 생성했다. 설정은 보안 그룹 말고는 크게 어렵지 않다. RDS의 기존 보안 그룹을 삭제하고 새로운 보안 그룹을 만든 후에 인바운드 규칙을 설정하고 생성한 RDS 인스턴스를 해당 보안 그룹에 넣는다. 인바운드 규칙은 EC2 보안 그룹과 로컬 PC 2개를 열어준다. 이때 주의할 점이 퍼블릭 액세스를 체크해야 한다. 아니면 인바운드 규칙을 설정해도 접근이 안된다.

## IAM 생성
보안상의 이유로 ROOT 계정 이용을 권장하지 않는다. 따라서 admin 권한을 갖는 그룹을 생성하고 사용자를 만든다.

## SSH 접속
인스턴스 생성 시 받은 `*.pem`을 이용하여 인스턴스에 SSH 접속이 가능하다. `cd ~/.ssh`에서 `config` 파일을 통해 매번 키를 입력해야 하는 수고로움을 덜 수 있다.

## 리눅스 서버 구축
- 먼저 자바 11을 설치해서 JVM 환경을 구축한다. (`yum -y install java-11-openjdk java-11-openjdk-devel`, `sudo /usr/sbin/alternatives --config java`)
- `git`을 설치한 후에 프로젝트가 있는 remote Rep을 `clone`한다. (`yum install git`) `Personal access token`이나 `SSH` 인증 방법이 있는데 나는 전자를 선택했다. remote Rep를 Tracking할 로컬 브랜치를 하나 생성하고 `pull`한다. 
- `git config credential.helper cache`, `git config credential.helper store`로 인증 정보를 저장하여 `pull`할 때 매번 인증해야 하는 수고로움을 덜 수 있다.
- 배포 스크립트 `deploy.sh`를 작성한다. build 시에 `gradle-wrapper.jar`, `gradle-wrapper.properties`가 없으면 오류가 발생하는데 gradle build가 관련이 있는 것 같다. 그 이유에 대해서 공부를 해봐야 될 것 같다.
- 이후 배포 스크립트에 권한을 부여한다. (`chmod 755 ./deploy.sh`)

```yaml
REPOSITORY=/home/ec2-user/app/git/project-movierank-server

cd $REPOSITORY

echo "> Git Pull"

git pull

echo "> 프로젝트 Build 시작"

cd $REPOSITORY/movierank/

./gradlew clean build -x test

echo "> Build 파일 복사"

cp ./build/libs/*.jar $REPOSITORY/

echo "> 현재 구동중인 애플리케이션 pid 확인"

CURRENT_PID=$(pgrep -f movierank)

echo "$CURRENT_PID"

if [ -z $CURRENT_PID ]; then
    echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다."
else
    echo "> kill -15 $CURRENT_PID"
    kill -15 $CURRENT_PID
    sleep 5
fi

echo "> 새 어플리케이션 배포"

JAR_NAME=$(ls $REPOSITORY/ |grep 'movierank' | tail -n 1)

echo "> JAR Name: $JAR_NAME"

nohup java -jar $REPOSITORY/$JAR_NAME --active.profile='dev1' 환경변수
```
- 나는 포트를 8081로 열었으므로 EC2 인바운드 규칙 설정이 필요하다.

## 고찰
- 8081 포트로 서버를 실행했는데 접속이 잘 되었다. Swagger API 문서도 접속이 잘 되었다.
- RDS와 EC2 통신이 잘 수행되었고 DDL에 따라 테이블이 정상적으로 만들어지는 것을 볼 수 있었다. 
- 다음으로는 `prometheus`, `grafana`를 통한 모니터링과 `Jenkins`를 이용한 CI-CD를 구현해 볼 계획이다.