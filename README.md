# README

# 🐶🐱 펫투닥터

![Untitled](Images/Untitled.png)

반려동물가구 700만 시대! 여러분들의 소중한 반려동물을 지킬수 있는 병원 선택은 어떻게 하고 계신가요? 펫투닥터는 반려동물이 이상 증상을 보일 때, 진료가 필요한 상황인지 판단하여 불필요한 병원 방문으로 인한 돈과 시간의 낭비를 줄일 수 있는 반려동물 비대면 원격진료 플랫폼입니다.

-   병원 찾기 데이터는 [https://www.data.go.kr/index.do](https://www.data.go.kr/index.do)(공공데이터)를 사용했기 때문에 경기도 지역권의 병원만 검색이 가능합니다.

# 👇 펫투닥터 소개 및 시연 영상 👇

**펫투닥터 UCC** : [https://youtu.be/TdUwbNEi2O8](https://youtu.be/TdUwbNEi2O8)


# ✨펫투닥터의 기획의도

-   천차만별인 동물병원 진료비를 투명하게 공개하여 병원을 선택할 때 참고할 수 있는 새로운 기준 마련
-   시간과 지리적 제약조건에 벗어나서 진료를 받을 수 있도록 함
-   불필요한 진료를 줄여 돈과 시간의 낭비를 줄일 수 있도록 함

# 🙍 펫투닥터 타겟층

-   평소 지병이 있거나 사정이 있어 주기적으로 같은 약을 처방을 받아야 하는 반려동물의 보호자
-   희귀동물과 함께하고 있어 근처 진료하는 병원이 많지 않아 방문이 어려운 보호자
-   여러 동물병원을 한눈에 비교하고 체험하여 합리적인 선택을 하고싶은 보호자
-   외진곳에 있어 병원홍보가 어렵거나 의료보복이 두려운 수의사

# 💻프로젝트 기간 - [2021.01.10 ~ 2021.02.18]

# 👀펫투닥터 서비스 화면

###   - 병원 예약 및 결제
![Untitled](Images/%EB%B3%91%EC%9B%90%EC%98%88%EC%95%BD%EB%B0%8F%EA%B2%B0%EC%A0%9C.gif)
###   - 예약 승인
![Untitled](Images/%EC%98%88%EC%95%BD%EC%8A%B9%EC%9D%B8.gif)
###   - 화상 진료

![Untitled](Images/Untitled%201.png)

###   - 진료 완료 후 리뷰 작성
![Untitled](Images/%EC%A7%84%EB%A3%8C%EC%99%84%EB%A3%8C_%ED%9B%84_%EB%A6%AC%EB%B7%B0%EC%9E%91%EC%84%B1.gif)
###   - 처방전 작성
![Untitled](Images/%EC%B2%98%EB%B0%A9%EC%A0%84%EC%9E%91%EC%84%B1.gif)
###  - 약값 결제
![Untitled](Images/%EC%95%BD%EA%B0%92%EA%B2%B0%EC%A0%9C.gif)

# ✨ 주요 기능

-   회원가입시 이메일 인증
-   카카오 소셜로그인
-   병원이름, 동이름으로 동물병원 검색 기능
-   WebRTC를 이용한 실시간 화상진료/상담
-   예약 시스템 및 결제 시스템(카카오 간편결제)
    -   예약 및 결제 신청 후 3분 이내 미결제시 자동취소
-   예약, 결제 관련 알림

# 🖥️ 개발 환경

### 🖱**Backend**

-   IntelliJ
-   Spring Boot 2.6.3
-   Spring Boot JPA
-   Spring Security
-   MySQL 8.0.26
-   Tomcat 9.0.50
-   JWT(Json Web Token)
-   NodeJS

### 🖱Frontend

-   Create-React-App
-   React 17.02
-   Redux 7.2.6
-   Material-UI 5.x.x
-   React-Dom-Router 6.21
-   Axios 0.25.0

### 🖱 기타

-   WebRTC
-   Socket IO
-   Docker-Compose
-   KakaoOauth API
-   KakaoPay API
-   KakaoMap API
-   Iamport API
-   JavaMail
-   Daum 주소 API

# 💫 서비스 아키텍처

![Untitled](Images/Untitled%202.png)

-   NGINX를 사용하게 된 이유 : WebRTC P2P를 연결하기 위한 시그널링 서버와 프론트 서버를 같은 포트 사용(브라우저 https 프로토콜 기본 포트가 443 이기 때문.)

# ✨SSL 인증서 적용 및 Dockerize Project

-   **Certbot를 이용해 인증서 파일 생성**
    -   certbot \*\*\*\*은 Let’s Encrypt 인증서를 자동으로 발급 및 갱신을 해주는 봇 프로그램입니다.
    -   certbot 다운로드
    -   certbot certonly --standalone [-d]
        -   domain name과 email 등록
    -   VM 내 /etc/letsencrypt/live/{domain name}[/](http://i6b209.p.ssafy.io/) 경로에 인증서 파일 생성
-   **Dockerize Project**
    -   docker, docker-compose 명령어를 이용해 편리하게 프로젝트를 컨테이너로 만들어 관리할 수 있습니다.
    -   Dockerfile, docker-compose.yml 작성 (github 에 상세한 내용이 담겨져 있습니다. (링크))

# ✨기술 특이점

-   **WebRTC** ( 시그널링 서버 구현)
    -   프로젝트 특성상 화상 화면만 연결시켜주면 되기 때문에 NodeJS를 이용하여 시그널링 서버를 구축하여 예약 ID를 체크하여 해당 의사와 고객과의 연결을 할 수 있도록 구현하였습니다.
-   **배포**
    -   Docker, Nginx로 구현하였습니다. 백엔드를 도커 컨테이너로 배포하였고, 프론트와 시그널링 서버는 Nginx와 함께 도커 컨테이너로 배포하였습니다.
-   회원가입 시 인증과 비밀번호 찾기 서비스를 위해 javax mail을 통해 메일 송신을 구현했습니다.
-   서비스 특성 상 매일 db를 관리해야 했기에 java scheduler를 활용하여 매일 00시에 DB를 확인, 갱신하게 하였습니다.
-   비동기로 진료 예약이 진행되지 않는 예약에 대해선 자동 취소 기능을 도입했습니다.

# 👨‍👩‍👧 협업 툴

-   Gitlab
-   Jira
-   Notion
-   Mattermost
-   Webex

# 💭요구사항 정의서

![Untitled](Images/Untitled%203.png)

# 🎨 화면 설계서

![Untitled](Images/Untitled%204.png)

# ✨코드 컨벤션

```jsx
Backend
- 클래스 이름은 대문자로 시작해요

- 변수명, 메서드 이름은 카멜케이스

- 변수명은 직관적으로 내용을 파악할 수 있도록 축약을 지양해요
```

```jsx
Frontend
- 클래스 이름은 대문자로 시작해요

- 변수명, 메서드 이름은 카멜케이스

- 변수명은 직관적으로 내용을 파악할 수 있도록 축약을 지양해요
```

# ✨Git 컨벤션

```jsx
feat : 새로운 기능에 대한 커밋
modify : 기존 기능 수정에 대한 커밋
fix : 버그 수정에 대한 커밋
build : 빌드 관련 파일 수정에 대한 커밋
chore : 코드 의미에 영향을 주지 않는 변경사항 (포맷, 세미콜론 누락, 공백 등)
ci : CI 관련 설정 수정에 대한 커밋
docs : 문서 수정에 대한 커밋
style : 코드 스타일 혹은 포맷 등에 관한 커밋
design : 화면 디자인에 관한 커밋
refactor : 코드 리팩토링에 대한 커밋
test : 테스트 코드에 대한 커밋

ex )
Feat: 관심지역 알림 ON/OFF 기능 추가(#123)

시군구의 알림을 각각 ON/OFF 할 수 있도록 기능을 추가함
- opnion0055: 구분 코드

해결: close #123
```

# 💡Git Flow 브랜치 전략

```jsx
Git Flow model을 사용하고, Git 기본 명령어 사용한다.

Git Flow 사용 브랜치

main: 배포
develop: 개발
feat: 기능 개발
modify : 기존 기능 수정
fix: 급한 에러 수정

feature 브랜치가 완성되면 develop 브랜치로 merge request를 통해 merge한다.

⇒ merge request가 요청되면, 모든 팀원들이 코드 리뷰를 하여 안전하게 merge한다.

feature 브랜치 이름 명명 규칙

feature/[기능 이름]/[frontend or backend]

ex) feature/webrtc/backend

ex) feature/login/frontend
```

# 👨‍👩‍👧 Jira

지라를 통해 일정및 업무 관리와 협업을 진행했습니다. 일주일 단위로 진행하며, 일주일의 시작인 월요일에 그 주에 진행되어야 할 범위를 정하고 계획을 정했습니다.

![Untitled](Images/Untitled%205.png)

# 👨‍👩‍👧 Notion

프로젝트 진행 과정에서 필요한 회의, 공지, 일정 등을 원페이지 협업 툴인 노션을 통해 관리했습니다. 또한 컨벤션 규칙, 브랜치 활용 규칙 등을 노션에 명시해두었고, 팀 미팅에 대한 피드백과 질문을 기록해 두어 언제든 확인할 수 있도록 관리하고 있습니다.

![Untitled](Images/Untitled%206.png)

# 👨‍👩‍👧 Scrum

매일 아침 10시에 팀 단위로 할 일을 20분 정도 공유하고 각자 팀으로 가서 지라에 이슈를 등록했습니다. 유연한 분위기에서 스크럼을 통해서 개발에 집중할 수 있는 팀 분위기를 만들었습니다.

# ✨ ER Diagram

![Untitled](Images/Untitled%207.png)

# ✨ EC2 포트 정리

| 443  | nginx Container( ‘/petodoctor’ - 메인페이지, ‘/signaling’ - 시그널링 서버) |
| ---- | -------------------------------------------------------------------------- |
| 8080 | 8080 → 8443 - redirect                                                     |
| 8443 | Tomcat Container                                                           |
| 7777 | MySQL Container                                                            |

# 🐞 힘들었던 점 ( / 문제 / 버그 )

## **FE**

-   API 통신 비동기 처리 : 처음 여러 번 API 통신을 했기 때문에 콜백 지옥을 겪는 와중 async await 를 배우게 되어서 처리를 할 수 있게 되었습니다.
-   React를 사용했는데 컴포넌트를 어디까지 나눠야 하는지 기준을 제대로 잡기 어려웠습니다.
-   디자인을 하는데 MUI를 처음 사용해 힘든 점이 있었지만 팀원들 간의 공유를 통해 완성시킬 수 있었습니다.
-   React는 Vue와 달리 생각보다 러닝커브가 있었고 상태(State)관리와 랜더링 사이클을 이해하는데 어려웠습니다.
-   UX를 위해 처리해야 하는 validation, alert 등이 생각보다 많았고 고려하지 못한 부분이 많아 아쉬웠습니다.

## **BE**

-   진료 자동 취소 기능 구현 : ExecuterService로 async task 처리 할 때,
    -   객체A(implements Runnable)를 만들어 execute로 실행하였지만 Task로 매개 변수를 넘기기 위해 객체B(implements Callable)를 만들어 submit으로 실행했습니다.
    -   Spring Core로부터 Service 객체를 Dependency Injection 받아야 했기 때문에 new 를 사용하여 해당 객체를 만들 수 없었습니다.
    -   그래서 생성자로 매개변수를 받는 CheckTask(implements Callable) 객체를 inner class로 갖는 CheckTaskUtil 객체를 만들어 사용하였습니다.
    -   또한 기존 TreatmentService 객체를 주입 받을 경우 circular injection이 발생해서 새로운 PaymentService 객체를 만들어 사용하여 문제를 해결했습니다.
-   DB에 쿼리문을 날릴 때 N+1 문제를 해결하기위해 `fetch JOIN`을 사용했는데, 두 개 이상의 1 : N 관계의 자식 테이블 내용을 fetch JOIN할 때 `MultipleBagFetchException` 문제가 생겼다. 이를 해결하기 위해 한 번의 fetch JOIN으로 데이터를 가져온 뒤 다시 다른 자식 테이블을 확인하는 방식으로 두개의 쿼리문을 활용해 처리했다.

# 😃 팀원 역할

**FE** : **곽명필** (JIRA) / **김정빈** (UCC/디자인) / **박다원** (팀장)

**BE** : **김두회** (배포) / **정지욱** (배포) / **이준형** (배포)

# ⁉펫투닥터의 개발 과정이 궁금하다면?!

**> [펫투닥터 노션](https://www.notion.so/9-b2440fee59fd4ff7920552ca5576d958)에서 자세히 보실 수 있습니다!**

# 🐣펫투닥터를 개발하고 난 후의 느낀점

-   4주 차에는 완성할 수 있을까라는 걱정이 있었는데 모든 팀원들이 **새벽까지** 할 일을 다 했기 때문에 결과물을 낼 수 있었다고 생각합니다.
-   **처음 해보는 배포**였기 때문에 뭐가 잘못된 지 찾는데도 시간이 많이 들었지만 해결을 했을 때 성취감을 느낄 수 있었습니다.
-   개발하는 시간이 많이 부족했고 기획 단계에서 꼼꼼히 했다고 생각했는데 수정이 많아져서 **기획의 중요성**을 느꼈습니다.
-   해결이 안 되는 문제는 혼자 끙끙 앓지 말고, **팀원과 적극 상의**해야 한다고 느꼈습니다.
-   **기초가 중요**하다는 것을 깨달았습니다. 내가 쓰는 코드를 제대로 알고 써야 추후에 생길 수 있는 오류를 방지하고 코드를 수정할 일이 생겼을 때 빠르게 고칠 수 있음을 느꼈습니다.
-   앞으로 **코드 컨벤션**을 상세히 한다면 배포 시 예상치 못한 문제를 사전에 해결할 수 있을 거라 생각합니다.
-   팀원 간의 **소통과 설계의 중요성**을 느꼈습니다. erd 구조를 짤 때 프론트분들과 충분히 상의를 거쳤다면 연결 과정에서 쓴 시간을 아낄 수 있었을 것 같습니다.
-   **하이고 힘들다~**
