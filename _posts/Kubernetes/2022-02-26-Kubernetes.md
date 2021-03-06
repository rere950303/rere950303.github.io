---
title: "[Kubernetes] 쿠버네티스"
last\_modified\_at: 2022-02-26T 2:46 +09:00
header:
  overlay\_color: "#333"
Kubernetes_1:
    - url: /assets/images/post/Kubernetes/1.png
      image_path: /assets/images/post/Kubernetes/1.png
Kubernetes_2:
    - url: /assets/images/post/Kubernetes/2.png
      image_path: /assets/images/post/Kubernetes/2.png
Kubernetes_3:
    - url: /assets/images/post/Kubernetes/3.png
      image_path: /assets/images/post/Kubernetes/3.png
Kubernetes_4:
    - url: /assets/images/post/Kubernetes/4.png
      image_path: /assets/images/post/Kubernetes/4.png
Kubernetes_5:
    - url: /assets/images/post/Kubernetes/5.png
      image_path: /assets/images/post/Kubernetes/5.png
Kubernetes_6:
    - url: /assets/images/post/Kubernetes/6.png
      image_path: /assets/images/post/Kubernetes/6.png
Kubernetes_7:
    - url: /assets/images/post/Kubernetes/7.png
      image_path: /assets/images/post/Kubernetes/7.png
Kubernetes_8:
    - url: /assets/images/post/Kubernetes/8.png
      image_path: /assets/images/post/Kubernetes/8.png
Kubernetes_9:
    - url: /assets/images/post/Kubernetes/9.png
      image_path: /assets/images/post/Kubernetes/9.png
Kubernetes_10:
    - url: /assets/images/post/Kubernetes/10.png
      image_path: /assets/images/post/Kubernetes/10.png
Kubernetes_11:
    - url: /assets/images/post/Kubernetes/11.png
      image_path: /assets/images/post/Kubernetes/11.png
Kubernetes_12:
    - url: /assets/images/post/Kubernetes/12.png
      image_path: /assets/images/post/Kubernetes/12.png
Kubernetes_13:
    - url: /assets/images/post/Kubernetes/13.png
      image_path: /assets/images/post/Kubernetes/13.png
Kubernetes_14:
    - url: /assets/images/post/Kubernetes/14.png
      image_path: /assets/images/post/Kubernetes/14.png
Kubernetes_15:
    - url: /assets/images/post/Kubernetes/15.png
      image_path: /assets/images/post/Kubernetes/15.png
Kubernetes_16:
    - url: /assets/images/post/Kubernetes/16.png
      image_path: /assets/images/post/Kubernetes/16.png
Kubernetes_17:
    - url: /assets/images/post/Kubernetes/17.png
      image_path: /assets/images/post/Kubernetes/17.png
Kubernetes_18:
    - url: /assets/images/post/Kubernetes/18.png
      image_path: /assets/images/post/Kubernetes/18.png
Kubernetes_19:
    - url: /assets/images/post/Kubernetes/19.png
      image_path: /assets/images/post/Kubernetes/19.png
categories:
  - Kubernetes
tags:
  - Docker
  - Kubernetes
---
## 들어가며 
해당 게시글은 인프런 subicura 강사님의 [초보를 위한 쿠버네티스 안내서][1] 강의를 바탕으로 쓰였음을 미리 밝힙니다.

## 쿠버네티스 시작하기
### 컨테이너 오케스트레이션 1/4(서버를 관리한다는 것)
- 문서화 -> 서버 관리 도구 -> VM -> 컨테이너
- 문서화를 통해 서버 관리 메뉴얼을 만들수 있지만 누락된 부분이나 버전 변경, 업데이트 누락 등으로 문제가 발생할 수 있다.
- 서버 관리 도구를 통해 중앙 제어를 할 수 있지만 기존에 서버에 설치된 다른 프로그램과 충돌 가능성이 있다.
- 특정 클라우드에 종속적이고 속도가 느리다.

### 컨테이너 오케스트레이션 2/4(도커의 등장)
- 가상머신과 비교하여 컨테이너 생성이 쉽고 효율적
- 컨테이너 이미지를 이용한 배포와 롤백이 간단
- 언어나 프레임워크에 상관없이 애플리케이션을 동일한 방식으로 관리
- 개발, 테스팅, 운영 환경은 물론 로컬 피시와 클라우드까지 동일한 환경을 구축 특정 클라우드 벤더에 종속적이지 않음

### 컨테이너 오케스트레이션 3/4(도커 그 이후)
- 컨테이너를 띄우려면 일일이 각 서버에 ssh 키 접속해야 한다.(관리의 어려움)
- 관리하는 서버가 여러개일 경우 컨테이너를 띄울 여유있는 서버를 찾는것이 어려워진다.
- 버전 업그레이드시 롤아웃과 롤백이 어려워진다.
- 서비스 검색의 어려움 -> Proxy, LoadBalancer의 관리가 어려워진다. 새로운 컨테이너가 추가될때마다 또는 새로운 서비스가 추가될때마다 Proxy, LoadBalancer를 업데이트해야 한다. 
- 서비스 노출의 어려움 -> 새로운 서비스가 추가될때마다 Proxy 서버에서 분기처리를 위한 업데이트가 필요하다.
- 컨테이너 에러가 생겨 죽거나 순간 트래픽이 많이 발생해 컨테이너가 죽은 경우 모니터링 하기가 어렵다.

### 컨테이너 오케스트레이션 4/4(컨테이너 오케스트레이션)
- CLUSTER
  - 마스터 서버와 워커 노드 서버를 합쳐서 CLUSTER라는 단위로 추상화 한다.
  - 마스터 서버를 통해 중앙제어가 가능해지고 워너 코드간 통신과 노드 스케일 설정이 필요하다.
- STATE
  - replicas의 설정을 통해 상태 유지가 가능하다.
  - Pod을 3개 유지해야 한다면 상태 체크를 통해 이를 가능하게 한다.
- SCHEDULING
  - 서비스를 배포할때 여유있는 서버를 모니터링 해서 Pod를 스케쥴링 해준다.
  - 기존 서버에 여유가 없을 경우 새로운 노드에 스케쥴링 한다.
- ROLLOUT & ROLLBACK
  - 버전 업데이트가 용이해진다.
- SERVICE DISCOVERY
  - 자동 설정으로 Proxy에서 각 노드에 떠있는 서비스의 분기 처리를 해준다.

### 왜 쿠버네티스인가?
- 오픈소스
  - 컨테이너를 쉽고 빠르게 배포/확장하고 관리를 자동화해주는 오픈소스 플랫폼
  -  1주일에 20억개의 컨테이너를 생성하는 google이 컨테이너 배포 시스템으로 사용하던 borg를 기반으로 만든 오픈소스
- 무한한 확장성
  - kubeflow, TEKTON, 서비스메시, 서버리스 등 쿠버네티스 위에서 돌아간다.
  - 일종의 플랫폼의 역할
- 사실상의 표준
  - Kubernetes Native Platform
  - EKS, AKS, GKE등 모듈화된 쿠버네티스 서비스 지원
  - Cloud Native의 핵심역할(클라우드 환경에 적합한 컴퓨팅 기술을 지원)

### 어떤걸 배울까?
코딩을 하고 git에 push를 하면 빌드테스트 후에 도커 이미지를 만들어서 저장소에 저장하다. 그 이후가 쿠버네티스의 역할이다. 즉 이미지로 컨테이너를 배포하는 과정을 배우게 된다.

## 쿠버네티스 알아보기
### 쿠버네티스 소개
{% include gallery id="Kubernetes_1" %}

- 컨테이너화된 애플리케이션을 자동으로 배포, 스케일링 및 관리
- 컨테이너를 쉽게 관리하고 연결하기 위해 논리적인 단위로 그룹화
- 자동화
- 논리적인 단위(Pod, ReplicaSet, Deployment, Job, Node, Namespace, Service, Ingress 등)
- 쿠버네티스는 그리스어로 조타수 또는 조종사
- CNCF(CLOUD NATIVE COMPITING FOUNDATION) 졸업 작품, 클라우드 환경에 적합한 애플리케이션 배포(인프라는 쓰고 버림, DevOps, 컨테이너 등)에 적합

### 쿠버네티스 아키텍처 1/3 (구성/설계)
{% include gallery id="Kubernetes_2" %}

- API server는 etcd와 통신을 하면서 상태 변경, 조회, 요청 등을 담당하는 모듈이다.
- Controller를 통해 컨테이너 상태를 모니터링하고 Scheduler를 통해 배포된 Pod을 Node에 할당한다.

{% include gallery id="Kubernetes_3" %}

- etcd: 모든 상태와 데이터를 저장, 분산 시스템으로 구성하여 안전성을 높임(고가용성), 가볍고 빠르면서 정확하게 설계(일관성), Key(directory)-Value 형태로 데이터 저장
- API server: 상태를 바꾸거나 조회, etcd와 유일하게 통신하는 모듈, REST API 형태로 제공, 권한을 체크하여 적절한 권한이 없을 경우 요청을 차단, 관리자 요청 뿐 아니라 다양한 내부 모듈과 통신
- Scheduler: 새로 생성된 Pod을 감지하고 실행할 노드를 선택, 노드의 현재 상태와 Pod의 요구사항을 체크, 노드에 라벨을 부여
- Controller: 논리적으로 다양한 컨트롤러가 존재(복제 컨트롤러, 노드 컨트롤러, 엔드포인트 컨트롤러 등), 끊임 없이 상태를 체크하고 원하는 상태를 유지, 복잡성을 낮추기 위해 하나의 프로세스로 실행

{% include gallery id="Kubernetes_4" %}

- kubelet: 각 노드에서 실행, Pod(컨테이너)을 실행/중지하고 상태를 체크
- proxy: 네트워크 프록시와 부하 분산 역할, 성능상의 이유로 별도의 프록시 프로그램 대신 커널 레벨의 iptables 또는 IPVS를 사용
- 전체적인 흐름: kubectl로 Pod 요청을 마스터로 보내면 API server가 etcd에 기록한다. Controller는 모니터링 과정에서 Pod이 불일치 하므로 Pod 할당을 요청한다. API server은 할당 요청을 etcd에 기록하고 Schedular가 할당 요청을 확인한다. Schedular는 노드를 할당하고 API server는 etcd에 노드할당 / 미실행을 기록한다. 노드의 Kubelet은 자신에게 할당된 Pod의 미실행을 확인하고 Pod을 생성한다. API server는 etcd에 미실행에서 실행중으로 상태를 변경 및 기록한다.

### 쿠버네티스 아키텍처 2/3 (오브젝트)
#### Pod
가장 작은 배포 단위, 여러개의 컨테이너를 포함할 수 있다. 전체 클러스터에서 고유한 IP를 할당한다.

#### ReplicaSet
여러개의 Pod을 관리, 신규 Pod을 생성하거나 기존 Pod을 제거하여 원하는 수(Replicas)를 유지

#### Deployment
배포 버전을 관리, 내부적으로 ReplicaSet을 이용

{% include gallery id="Kubernetes_5" %}

#### Service - ClusterIP
클러스터 내부에서 사용하는 프록시, Pod은 동적이지만 서비스는 고유 IP를 가짐, 클러스터 내부에서 서비스 연결은 DNS를 이용, 클러스터 내부에서 Pod를 한번 더 추상화해서 서비스 단위로 Pod을 묶는다.

{% include gallery id="Kubernetes_6" %}

#### Service - NodePort
노드(host)에 노출되어 외부에서 접근 가능한 서비스, 모든 노드에 동일한 포트로 생성

{% include gallery id="Kubernetes_7" %}

#### Service - LoadBalancer
하나의 IP주소를 외부에 노출

{% include gallery id="Kubernetes_8" %}

#### Ingress
도메인 또는 경로별 라우팅(Nginx 등을 쿠버네티스로 추상화)

{% include gallery id="Kubernetes_9" %}

#### 전체적인 구성
하나의 클러스터에서 여러개의 서비스가 있을때 Ingress는 들어온 요청에 맞게 Service - LoadBalancer로 전달한다. Service - LoadBalancer는 현재 가능한 Service - NodePort로 전달하고 특정 service의 ClusterIP로 전달된다. 이후 Pod으로 전달된다.

{% include gallery id="Kubernetes_10" %}

#### 그 외 기본 오브젝트
- Volume - Storage (EBS, NFS, ...)
- Namespace - 논리적인 리소스 구분
- ConfigMap/Secret - 설정
- ServiceAccount - 권한 계정
- Role/ClusterRole - 권한 설정 (get, list, watch, create, ...)

### 쿠버네티스 아키텍처 3/3 (API 호출)
- Object Spec
  - apiVersion: apps/v1, v1, batch/v1, networking.k8s.io/v1, ...
  - kind: Pod, Deployment, Service, Ingress, ...
  - metadata: name, label, namespace, ...
  - spec: 각종 설정 (https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18)
  - status(read-only): 시스템에서 관리하는 최신 상태
- 원하는 상태(desired state)를 다양한 오브젝트(object)로 정의(spec)하고 API server에 yaml형식으로 전달

{% include gallery id="Kubernetes_11" %}

## 쿠버네티스 실습 준비
- minikube 설치: 쿠버네티스 클러스터를 실행하려면 최소한 scheduler, controller, api-server, etcd, kubelet, kube-proxy를 설치해야 하고 필요에 따라 dns, ingress controller, storage class등을 설치해야 한다. 이러한 설치를 쉽고 빠르게 하기 위한 도구가 minikube다. minikube는 windows, macOS, linux에서 사용할 수 있고 다양한 가상 환경(Hyperkit, Hyper-V, Docker, VirtualBox등)을 지원하여 대부분의 환경에서 문제없이 동작합니다.

```zsh
$ brew install minikube
```

- 기본 명령어

```zsh
# 버전확인
$ minikube version

# 가상머신 시작
$ minikube start --driver=docker // Docker Desktop이 설치되어 있으면 minikube가 기본으로 docker driver를 사용한다.
# 특정 k8s 버전 실행
$ minikube start --kubernetes-version=v1.20.0

# 상태확인
$ minikube status

# 정지
$ minikube stop

# 삭제
$ minikube delete

# ssh 접속
$ minikube ssh

# ip 확인
$ minikube ip
```

- 서비스 노출(docker driver로 서비스 노출시 포트가 프록시로 매핑된다.)

```zsh
# 쿠버네티스 서비스 이름이 wordpress라면..
$ minikube service wordpress
```

## 쿠버네티스 기본 실습
### 시작하기
- wordpress와 mysql 배포

{% include gallery id="Kubernetes_12" %}

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wordpress-mysql
  labels:
    app: wordpress
spec:
  selector:
    matchLabels:
      app: wordpress
      tier: mysql
  template:
    metadata:
      labels:
        app: wordpress
        tier: mysql
    spec:
      containers:
        - image: mariadb:10.7
          name: mysql
          env:
            - name: MYSQL_ROOT_PASSWORD
              value: password
          ports:
            - containerPort: 3306
              name: mysql

---
apiVersion: v1
kind: Service
metadata:
  name: wordpress-mysql
  labels:
    app: wordpress
spec:
  ports:
    - port: 3306
  selector:
    app: wordpress
    tier: mysql

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wordpress
  labels:
    app: wordpress
spec:
  selector:
    matchLabels:
      app: wordpress
      tier: frontend
  template:
    metadata:
      labels:
        app: wordpress
        tier: frontend
    spec:
      containers:
        - image: wordpress:5.5.3-apache
          name: wordpress
          env:
            - name: WORDPRESS_DB_HOST
              value: wordpress-mysql
            - name: WORDPRESS_DB_PASSWORD
              value: password
          ports:
            - containerPort: 80
              name: wordpress

---
apiVersion: v1
kind: Service
metadata:
  name: wordpress
  labels:
    app: wordpress
spec:
  type: NodePort
  ports:
    - port: 80
  selector:
    app: wordpress
    tier: frontend
```

```zsh
# wordpress-k8s.yml 설정 적용
$ kubectl apply -f wordpress-k8s.yml

# 현재 상태 확인
$ kubectl get all

# 리소스 제거
$ kubectl delete -f wordpress-k8s.yml
```

### 기본 명령어
{% include gallery id="Kubernetes_13" %}

#### alias로 편하게
```zsh
# alias 설정
$ alias k='kubectl'

# shell 설정 추가
$ echo "alias k='kubectl'" >> ~/.zshrc
$ source ~/.zshrc
```
#### 상태 설정하기 (apply)
- kubectl apply -f [파일명 또는 URL]

```zsh
$ kubectl apply -f https://subicura.com/k8s/code/guide/index/wordpress-k8s.yml
```

#### 리소스 목록보기 (get)
- kubectl get [TYPE]

```zsh
# Pod 조회
$ kubectl get pod

# 줄임말(Shortname)과 복수형 사용가능
$ kubectl get pods
$ kubectl get po

# 여러 TYPE 입력
$ kubectl get pod,service
# 한번에 여러 TYPE 조회
$ kubectl get po,svc

# Pod, ReplicaSet, Deployment, Service, Job 조회 => all
$ kubectl get all

# 결과 포멧 변경
$ kubectl get pod -o wide
$ kubectl get pod -o yaml
$ kubectl get pod -o json

# Label 조회
$ kubectl get pod --show-labels
```
#### 리소스 상세 상태보기 (describe)
- kubectl describe [TYPE]/[NAME] 또는 [TYPE] [NAME]

```zsh
# Pod 조회로 이름 검색
$ kubectl get pod

# 조회한 이름으로 상세 확인
$ kubectl describe pod/wordpress-5f59577d4d-8t2dg // 환경마다 이름은 상이
```
### 리소스 제거 (delete)
- kubectl delete [TYPE]/[NAME] 또는 [TYPE] [NAME]

```zsh
# Pod 조회로 이름 검색
$ kubectl get pod

# 조회한 Pod 제거
$ kubectl delete pod/wordpress-5f59577d4d-8t2dg
```
#### 컨테이너 로그 조회 (logs)
- kubectl logs [POD_NAME](실시간 로그를 보고 싶다면 -f 옵션을 이용하고 하나의 Pod에 여러 개의 컨테이너가 있는 경우는 -c 옵션으로 컨테이너를 지정)

```zsh
# Pod 조회로 이름 검색
$ kubectl get pod

# 조회한 Pod 로그조회
$ kubectl logs wordpress-5f59577d4d-8t2dg

# 실시간 로그 보기
$ kubectl logs -f wordpress-5f59577d4d-8t2dg
```
#### 컨테이너 명령어 전달 (exec)
- kubectl exec [-it] [POD_NAME] -- [COMMAND](쉘로 접속하여 컨테이너 상태를 확인하는 경우에 `-it` 옵션을 사용하고 여러 개의 컨테이너가 있는 경우엔 `-c` 옵션으로 컨테이너를 지정)

```zsh
# Pod 조회로 이름 검색
$ kubectl get pod

# 조회한 Pod의 컨테이너에 접속
$ kubectl exec -it wordpress-5f59577d4d-8t2dg -- bash
```
#### 설정 관리 (config)
- kubectl은 여러 개의 쿠버네티스 클러스터를 컨텍스트(context)로 설정하고 필요에 따라 선택할 수 있다. 현재 어떤 컨텍스트로 설정되어 있는지 확인하고 원하는 컨텍스트를 지정한다. 선택한 컨텍스트의 API server로 kubectl 명령이 전달된다.(중앙 통제 가능)

```zsh
# 현재 컨텍스트 확인
$ kubectl config current-context

# 컨텍스트 설정
$ kubectl config use-context minikube
```

#### 그외
```zsh
# 전체 오브젝트 종류 확인
$ kubectl api-resources

# 특정 오브젝트 설명 보기
$ kubectl explain pod
```

### Pod
#### 빠르게 Pod 만들기
```zsh
$ kubectl run echo --image ghcr.io/subicura/echo:v1
```

#### Pod 생성 분석
{% include gallery id="Kubernetes_14" %}

- Scheduler는 API서버를 감시하면서 할당되지 않은 unassigned Pod이 있는지 체크
- Scheduler는 할당되지 않은 Pod을 감지하고 적절한 노드node에 할당 (minikube는 단일 노드)
- 노드에 설치된 kubelet은 자신의 노드에 할당된 Pod이 있는지 체크
- kubelet은 Scheduler에 의해 자신에게 할당된 Pod의 정보를 확인하고 컨테이너 생성
- kubelet은 자신에게 할당된 Pod의 상태를 API 서버에 전달

#### YAML로 설정파일 작성하기
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: echo
  labels:
    app: echo
spec:
  containers:
    - name: app
      image: ghcr.io/subicura/echo:v1
```
```zsh
# Pod 생성
$ kubectl apply -f echo-pod.yml

# Pod 목록 조회
$ kubectl get pod

# Pod 로그 확인
$ kubectl logs echo
$ kubectl logs -f echo

# Pod 컨테이너 접속
$ kubectl exec -it echo -- sh
# ls
# ps
# exit

# Pod 제거
$ kubectl delete -f echo-pod.yml
```

#### 컨테이너 상태 모니터링
컨테이너 생성과 실제 서비스 준비는 약간의 차이가 있다. 서버를 실행하면 바로 접속할 수 없고 짧게는 수초, 길게는 수분의 초기화 시간이 필요한데 실제로 접속이 가능할 때 서비스가 준비되었다고 말할 수 있다. 쿠버네티스는 컨테이너가 생성되고 서비스가 준비되었다는 것을 체크하는 옵션을 제공하여 초기화하는 동안 서비스되는 것을 막을 수 있습니다.

- livenessProbe: 컨테이너가 정상적으로 동작하는지 체크하고 정상적으로 동작하지 않는다면 컨테이너를 재시작하여 문제를 해결한다. 정상이라는 것은 여러 가지 방식으로 체크할 수 있는데 여기서는 `http get` 요청을 보내 확인하는 방법을 사용한다. `httpGet` 외에 `tcpSocket`, `exec` 방법으로 체크할 수 있다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: echo-lp
  labels:
    app: echo
spec:
  containers:
    - name: app
      image: ghcr.io/subicura/echo:v1
      livenessProbe:
        httpGet:
          path: /not/exist
          port: 8080
        initialDelaySeconds: 5
        timeoutSeconds: 2 # Default 1
        periodSeconds: 5 # Defaults 10
        failureThreshold: 1 # Defaults 3
```

- readinessProbe: 컨테이너가 준비되었는지 체크하고 정상적으로 준비되지 않았다면 Pod으로 들어오는 요청을 제외한다. livenessProbe와 차이점은 문제가 있어도 Pod을 재시작하지 않고 요청만 제외한다는 점이다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: echo-rp
  labels:
    app: echo
spec:
  containers:
    - name: app
      image: ghcr.io/subicura/echo:v1
      readinessProbe:
        httpGet:
          path: /not/exist
          port: 8080
        initialDelaySeconds: 5
        timeoutSeconds: 2 # Default 1
        periodSeconds: 5 # Defaults 10
        failureThreshold: 1 # Defaults 3
```
- livenessProbe + readinessProbe: 보통 livenessProbe와 readinessProbe를 같이 적용

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: echo-health
  labels:
    app: echo
spec:
  containers:
    - name: app
      image: ghcr.io/subicura/echo:v1
      livenessProbe:
        httpGet:
          path: /
          port: 3000
      readinessProbe:
        httpGet:
          path: /
          port: 3000
```

#### 다중 컨테이너
대부분 `1 Pod = 1 컨테이너`지만 여러 개의 컨테이너를 가진 경우도 꽤 흔하다. 하나의 Pod에 속한 컨테이너는 서로 네트워크를 localhost로 공유하고 동일한 디렉토리를 공유할 수 있다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: counter
  labels:
    app: counter
spec:
  containers:
    - name: app
      image: ghcr.io/subicura/counter:latest
      env:
        - name: REDIS_HOST
          value: "localhost"
    - name: db
      image: redis
```
```zsh
# Pod 생성
$ kubectl apply -f counter-pod-redis.yml

# Pod 목록 조회
$ kubectl get pod

# Pod 로그 확인
$ kubectl logs counter app
$ kubectl logs counter db

# Pod의 app컨테이너 접속
$ kubectl exec -it counter -c app -- sh
# apk add curl busybox-extras # install curl, telnet
# curl localhost:3000
# curl localhost:3000
$ telnet localhost 6379
$ dbsize
$ KEYS *
$ GET count
$ quit

# Pod 제거
$ kubectl delete -f counter-pod-redis.yml
```

### ReplicaSet
Pod을 단독으로 만들면 Pod에 어떤 문제(서버가 죽어서 Pod이 사라졌다던가)가 생겼을 때 자동으로 복구되지 않는다. 이러한 Pod을 정해진 수만큼 복제하고 관리하는 것이 ReplicaSet이다.

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: echo-rs
spec:
  replicas: 1 // 원하는 Pod의 개수
  selector: // label 체크 조건
    matchLabels:
      app: echo
      tier: app
  template: // 생성할 Pod의 명세
    metadata:
      labels:
        app: echo
        tier: app
    spec:
      containers:
        - name: echo
          image: ghcr.io/subicura/echo:v1
```
```zsh
# ReplicaSet 생성
$ kubectl apply -f echo-rs.yml

# 리소스 확인
$ kubectl get po,rs
```
- ReplicaSet은 labels의 key-vaule의 쌍으로 Pod을 Tracking하면서 Pod의 개수를 유지한다.

{% include gallery id="Kubernetes_15" %}

- ReplicaSet Controller는 ReplicaSet조건을 감시하면서 현재 상태와 원하는 상태가 다른 것을 체크
- ReplicaSet Controller가 원하는 상태가 되도록 Pod을 생성하거나 제거
- Scheduler는 API서버를 감시하면서 할당되지 않은 unassigned Pod이 있는지 체크
- Scheduler는 할당되지 않은 새로운 Pod을 감지하고 적절한 노드에 배치

### Deployment
Deployment는 쿠버네티스에서 가장 널리 사용되는 오브젝트다. ReplicaSet을 이용하여 Pod을 업데이트하고 이력을 관리하여 롤백하거나 특정 버전으로 돌아갈 수 있다.

#### Deployment 만들기
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: echo-deploy
spec:
  replicas: 4
  selector:
    matchLabels:
      app: echo
      tier: app
  template:
    metadata:
      labels:
        app: echo
        tier: app
    spec:
      containers:
        - name: echo
          image: ghcr.io/subicura/echo:v1
```
```zsh
# Deployment 생성
$ kubectl apply -f echo-deployment.yml

# 리소스 확인
$ kubectl get po,rs,deploy
```
- 이미지의 버전만 다르게 해서 다시 배포

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: echo-deploy
spec:
  replicas: 4
  selector:
    matchLabels:
      app: echo
      tier: app
  template:
    metadata:
      labels:
        app: echo
        tier: app
    spec:
      containers:
        - name: echo
          image: ghcr.io/subicura/echo:v2
```
```zsh
# 새로운 이미지 업데이트
$ kubectl apply -f echo-deployment-v2.yml

# 리소스 확인
$ kubectl get po,rs,deploy
```
- Deployment는 새로운 이미지로 업데이트하기 위해 ReplicaSet을 이용한다. 버전을 업데이트하면 새로운 ReplicaSet을 생성하고 해당 ReplicaSet이 새로운 버전의 Pod을 생성한다.

{% include gallery id="Kubernetes_16" %}

- v1의 Pod를 1개씩 줄여나가고 v2의 Pod를 1개씩 늘려가면서 업데이트를 한다.

```zsh
$ kubectl describe deploy/echo-deploy
```

{% include gallery id="Kubernetes_17" %}

- Deployment Controller는 Deployment조건을 감시하면서 현재 상태와 원하는 상태가 다른 것을 체크
- Deployment Controller가 원하는 상태가 되도록 ReplicaSet 설정
- ReplicaSet Controller는 ReplicaSet조건을 감시하면서 현재 상태와 원하는 상태가 다른 것을 체크
- ReplicaSet Controller가 원하는 상태가 되도록 Pod을 생성하거나 제거
- Scheduler는 API서버를 감시하면서 할당되지 않은 Pod이 있는지 체크
- Scheduler는 할당되지 않은 새로운 Pod을 감지하고 적절한 노드에 배치

#### 버전관리
```zsh
# 히스토리 확인
$ kubectl rollout history deploy/echo-deploy

# revision 1 히스토리 상세 확인
$ kubectl rollout history deploy/echo-deploy --revision=1

# 바로 전으로 롤백
$ kubectl rollout undo deploy/echo-deploy

# 특정 버전으로 롤백
$ kubectl rollout undo deploy/echo-deploy --to-revision=2
```

#### 배포 전략 설정
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: echo-deploy-st
spec:
  replicas: 4
  selector:
    matchLabels:
      app: echo
      tier: app
  minReadySeconds: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 3 // rolling update 중 정해진 Pod 수 이상으로 만들 수 있는 Pod의 최대 개수. 기본값은 25%
      maxUnavailable: 3 // rolling update 중 unavailable 상태인 Pod의 최대 개수를 설정. 값은 0보다 큰 정수를 통해 Pod의 절대 개수 설정이 가능하고, “25%“와 같이 percentage 표현 가능. maxUnavailable에서 percentage 계산은 rounding down(내림) 방식이며 기본값은 25% 이다.
  template:
    metadata:
      labels:
        app: echo
        tier: app
    spec:
      containers:
        - name: echo
          image: ghcr.io/subicura/echo:v1
          livenessProbe:
            httpGet:
              path: /
              port: 3000
```
- 명령어로 이미지 변경이 가능하다.

```zsh
# 이미지 변경 (명령어로)
$ kubectl set image deploy/echo-deploy-st echo=ghcr.io/subicura/echo:v2
```

### Service
Pod은 자체 IP를 가지고 다른 Pod과 통신할 수 있지만, 쉽게 사라지고 생성되는 특징 때문에 직접 통신하는 방법은 권장하지 않는다. 쿠버네티스는 Pod과 직접 통신하는 방법 대신, 별도의 고정된 IP를 가진 서비스를 만들고 그 서비스를 통해 Pod에 접근하는 방식을 사용한다.

#### Service(ClusterIP) 만들기
ClusterIP는 클러스터 내부에 새로운 IP를 할당하고 여러 개의 Pod을 바라보는 로드밸런서 기능을 제공한다. 그리고 서비스 이름을 내부 도메인 서버에 등록하여 Pod 간에 서비스 이름으로 통신할 수 있다.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
spec:
  selector:
    matchLabels:
      app: counter
      tier: db
  template:
    metadata:
      labels:
        app: counter
        tier: db
    spec:
      containers:
        - name: redis
          image: redis
          ports:
            - containerPort: 6379
              protocol: TCP

---
apiVersion: v1
kind: Service
metadata:
  name: redis
spec:
  ports:
    - port: 6379 // 서비스의 포트를 말한다. Pod의 targetport도 필요한데 기본값은 port다.
      protocol: TCP
  selector: // 서비스에 연결한 Pod의 labels 정의
    app: counter
    tier: db
```
같은 클러스터에서 생성된 Pod이라면 redis라는 도메인으로 redis Pod에 접근 할 수 있다.(`redis.default.svc.cluster.local`로도 접근가능 하다. 서로 다른 `namespace`와 `cluster`를 구분할 수 있다.)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: counter
spec:
  selector:
    matchLabels:
      app: counter
      tier: app
  template:
    metadata:
      labels:
        app: counter
        tier: app
    spec:
      containers:
        - name: counter
          image: ghcr.io/subicura/counter:latest
          env:
            - name: REDIS_HOST
              value: "redis" // 서비스 metaname
            - name: REDIS_PORT
              value: "6379"
```
```zsh
$ kubectl apply -f counter-app.yml

# counter app에 접근
$ kubectl get po
$ kubectl exec -it counter-<xxxxx> -- sh

# apk add curl busybox-extras # install telnet
# curl localhost:3000
# curl localhost:3000
$ telnet redis 6379
$ dbsize
$ KEYS *
$ GET count
$ quit
```

#### Service 생성 흐름
{% include gallery id="Kubernetes_18" %}

- Endpoint Controller는 Service와 Pod을 감시하면서 조건에 맞는 Pod의 IP를 수집
- Endpoint Controller가 수집한 IP를 가지고 Endpoint 생성
- Kube-Proxy는 Endpoint 변화를 감시하고 노드의 iptables을 설정
- CoreDNS는 Service를 감시하고 서비스 이름과 IP를 CoreDNS에 추가

#### Service(NodePort) 만들기
CluterIP는 클러스터 내부에서만 접근할 수 있다. 클러스터 외부(노드)에서 접근할 수 있도록 NodePort 서비스가 필요하다.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: counter-np
spec:
  type: NodePort
  ports:
    - port: 3000 // Pod의 targetport를 의미한다.
      protocol: TCP
      nodePort: 31000
  selector:
    app: counter
    tier: app
```
NodePort는 클러스터의 모든 노드에 포트를 오픈한다. 지금은 테스트라서 하나의 노드밖에 없지만 여러 개의 노드가 있다면 아무 노드로 접근해도 지정한 Pod으로 접근할 수 있다. NodePort는 CluterIP의 기능을 기본으로 포함한다.

#### Service(LoadBalancer) 만들기
NodePort의 단점은 노드가 사라졌을 때 자동으로 다른 노드를 통해 접근이 불가능하다는 점이다. 예를 들어, 3개의 노드가 있다면 3개 중에 아무 노드로 접근해도 NodePort로 연결할 수 있지만 어떤 노드가 살아 있는지는 알 수가 없다.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: counter-lb
spec:
  type: LoadBalancer
  ports:
    - port: 30000 // LoadBalancer의 포트
      targetPort: 3000 // Pod의 targetport
      protocol: TCP
  selector:
    app: counter
    tier: app
```

#### minikube에 가상 LoadBalancer 만들기
Load Balancer를 사용할 수 없는 환경에서 가상 환경을 만들어 주는 것이 `MetalLB`라는 것이다. minikube에서는 현재 떠 있는 노드를 Load Balancer로 설정한다.

```zsh
$ minikube addons enable metallb
```
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  namespace: metallb-system
  name: config
data:
  config:
    address-pools:
    - name: default
      protocol: layer2
      addresses:
      - 192.168.64.4/32 # minikube ip
```

### 웹 애플리케이션 배포
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sharing
spec:
  replicas: 2
  selector:
    matchLabels:
      app: sharing
      tier: app
  template:
    metadata:
      labels:
        app: sharing
        tier: app
    spec:
      containers:
        - name: app
          image: rere95/sharing:latest
          ports:
            - containerPort: 8081
              name: app
          env:
            - name: jwt.key
              value: "~"
            - name: active.profile
              value: "local1"
            - name: jwt.time
              value: "86400"
            - name: file.path
              value: "/images/"
        - name: redis
          image: redis
          ports:
            - containerPort: 6379
              name: redis
---
apiVersion: v1
kind: Service
metadata:
  name: sharing-lb
spec:
  type: LoadBalancer
  ports:
    - port: 30000
      targetPort: 8081
      protocol: TCP
  selector:
    app: sharing
    tier: app
---
```

### Ingress
하나의 클러스터에서 여러 가지 서비스를 운영한다면 외부 연결을 어떻게 할까? NodePort를 이용하면 서비스 개수만큼 포트를 오픈하고 사용자에게 어떤 포트인지 알려줘야 한다.

#### Ingress 만들기
```zsh
$ minikube addons enable ingress

# ingress 컨트롤러 확인
$ kubectl -n ingress-nginx get pod
```

#### echo 웹 애플리케이션 배포
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: echo-v1
spec:
  rules:
    - host: v1.echo.192.168.64.5.sslip.io // minikube ip로 변경
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: echo-v1
                port:
                  number: 3000
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: echo-v1
spec:
  replicas: 3
  selector:
    matchLabels:
      app: echo
      tier: app
      version: v1
  template:
    metadata:
      labels:
        app: echo
        tier: app
        version: v1
    spec:
      containers:
        - name: echo
          image: ghcr.io/subicura/echo:v1
          livenessProbe:
            httpGet:
              path: /
              port: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: echo-v1
spec:
  ports:
    - port: 3000
      protocol: TCP
  selector:
    app: echo
    tier: app
    version: v1
```
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: echo-v2
spec:
  rules:
    - host: v2.echo.192.168.64.5.sslip.io  // minikube ip로 변경
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: echo-v2
                port:
                  number: 3000
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: echo-v2
spec:
  replicas: 3
  selector:
    matchLabels:
      app: echo
      tier: app
      version: v2
  template:
    metadata:
      labels:
        app: echo
        tier: app
        version: v2
    spec:
      containers:
        - name: echo
          image: ghcr.io/subicura/echo:v2
          livenessProbe:
            httpGet:
              path: /
              port: 3000

---
apiVersion: v1
kind: Service
metadata:
  name: echo-v2
spec:
  ports:
    - port: 3000
      protocol: TCP
  selector:
    app: echo
    tier: app
    version: v2
```

#### Ingress 생성 흐름
{% include gallery id="Kubernetes_19" %}

- Ingress Controller는 Ingress 변화를 체크
- Ingress Controller는 변경된 내용을 Nginx에 설정하고 프로세스 재시작

### Volume (local)
#### empty-dir
Pod 안에 속한 컨테이너 간 디렉토리를 공유하는 방법

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: sidecar
spec:
  containers:
    - name: app
      image: busybox
      args:
        - /bin/sh
        - -c
        - >
          while true;
          do
            echo "$(date)\n" >> /var/log/example.log;
            sleep 1;
          done
      volumeMounts:
        - name: varlog
          mountPath: /var/log
    - name: sidecar
      image: busybox
      args: [/bin/sh, -c, "tail -f /var/log/example.log"]
      volumeMounts:
        - name: varlog
          mountPath: /var/log
  volumes:
    - name: varlog
      emptyDir: {}
```

#### hostpath
호스트(노드) 디렉토리를 컨테이너 디렉토리에 연결하는 방법

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: host-log
spec:
  containers:
    - name: log
      image: busybox
      args: ["/bin/sh", "-c", "sleep infinity"]
      volumeMounts:
        - name: varlog
          mountPath: /host/var/log
  volumes:
    - name: varlog
      hostPath:
        path: /var/log
```

### ConfigMap
#### ConfigMap 만들기
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: prometheus
    metrics_path: /prometheus/metrics
    static_configs:
      - targets:
          - localhost:9090
```
```zsh
# ConfitMap 생성 configmap -> cm
$ kubectl create cm my-config --from-file=config-file.yml

# ConfitMap 조회
$ kubectl get cm

# ConfigMap 내용 상세 조회
$ kubectl describe cm/my-config
```
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: alpine
spec:
  containers:
    - name: alpine
      image: alpine
      command: ["sleep"]
      args: ["100000"]
      volumeMounts:
        - name: config-vol
          mountPath: /etc/config
  volumes:
    - name: config-vol
      configMap:
        name: my-config
```

#### env 파일로 만들기
```env
hello=world
haha=hoho
```
```zsh
# env 포멧으로 생성
$ kubectl create cm env-config --from-env-file=config-env.yml

# env-config 조회
$ kubectl describe cm/env-config
```

#### YAML 선언하기
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-config
data:
  hello: world
  kuber: netes
  multiline: |-
    first
    second
    third
```
```zsh
# 기존 configmap 삭제
$ kubectl delete cm/my-config

# configmap 생성
$ kubectl apply -f config-map.yml

# alpine 적용
$ kubectl apply -f alpine.yml

# 적용내용 확인
$ kubectl exec -it alpine -- cat /etc/config/multiline
```

#### ConfigMap을 환경변수로 사용하기
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: alpine-env
spec:
  containers:
    - name: alpine
      image: alpine
      command: ["sleep"]
      args: ["100000"]
      env:
        - name: hello
          valueFrom:
            configMapKeyRef:
              name: my-config
              key: hello
```

### Secret
쿠버네티스는 ConfigMap과 유사하지만, 보안 정보를 관리하기 위해 Secret을 별도로 제공한다. ConfigMap과 차이점은 데이터가 base64로 저장된다는 점 말고는 거의 없다.

- username.txt

```txt
admin
```
- password.txt

```txt
1q2w3e4r
```

```zsh
# secret 생성
$ kubectl create secret generic db-user-pass --from-file=./username.txt --from-file=./password.txt

# secret 상세 조회
$ kubectl describe secret/db-user-pass

# -o yaml로 상세 조회
$ kubectl get secret/db-user-pass -o yaml

# 저장된 데이터 base64 decode
$ echo 'MXEydzNlNHI=' | base64 --decode
```
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: alpine-env
spec:
  containers:
    - name: alpine
      image: alpine
      command: ["sleep"]
      args: ["100000"]
      env:
        - name: DB_USERNAME
          valueFrom:
            secretKeyRef:
              name: db-user-pass
              key: username.txt
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-user-pass
              key: password.txt
```

[1]: https://www.inflearn.com/course/쿠버네티스-입문/dashboard