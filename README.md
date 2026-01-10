
# Gitmap
### My Commit Locations

로컬 Git 커밋 시점의 위치 정보를 수집,   
개발자의 활동 지역을 Github 프로필에서 Gist 형태로 자동 시각화 해주는 CLI 기반 도구입니다.  
Github API가 제공하지 않는 "위치"라는 새로운 관점에 집중했습니다.

<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/6c1cdb2b-bb79-487c-af9c-dee5f2fd1fb6">

## 목차

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

  - [설치 방법](#%EC%84%A4%EC%B9%98-%EB%B0%A9%EB%B2%95)
    - [상세 설치 방법](#%EC%83%81%EC%84%B8-%EC%84%A4%EC%B9%98-%EB%B0%A9%EB%B2%95)
    - [Step 0. ***해당 레포지토리를 Fork 해주세요!***](#step-0-%ED%95%B4%EB%8B%B9-%EB%A0%88%ED%8F%AC%EC%A7%80%ED%86%A0%EB%A6%AC%EB%A5%BC-fork-%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94)
    - [Step 1. API Key 발급](#step-1-api-key-%EB%B0%9C%EA%B8%89)
    - [Step 2. 1줄 설치](#step-2-1%EC%A4%84-%EC%84%A4%EC%B9%98)
    - [Step 3. API Key 설정](#step-3-api-key-%EC%84%A4%EC%A0%95)
    - [Step 4. 특정 레포에 훅 연결](#step-4-%ED%8A%B9%EC%A0%95-%EB%A0%88%ED%8F%AC%EC%97%90-%ED%9B%85-%EC%97%B0%EA%B2%B0)
    - [Step 5. Gist 생성](#step-5-gist-%EC%83%9D%EC%84%B1)
    - [Step 6. Github Token 생성](#step-6-github-token-%EC%83%9D%EC%84%B1)
    - [Step 7. Gitmap repo의 secrets 설정](#step-7-gitmap-repo%EC%9D%98-secrets-%EC%84%A4%EC%A0%95)
    - [Step 8.  🎉 실행 및 결과 확인](#step-8---%EC%8B%A4%ED%96%89-%EB%B0%8F-%EA%B2%B0%EA%B3%BC-%ED%99%95%EC%9D%B8)
  - [기술 스택](#%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D)
  - [주요 기능](#%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5)
    - [로컬 Git Hook 기반 커밋 위치 수집](#%EB%A1%9C%EC%BB%AC-git-hook-%EA%B8%B0%EB%B0%98-%EC%BB%A4%EB%B0%8B-%EC%9C%84%EC%B9%98-%EC%88%98%EC%A7%91)
    - [API Key 기반 사용자 식별](#api-key-%EA%B8%B0%EB%B0%98-%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%8B%9D%EB%B3%84)
    - [Github Gist 자동 갱신](#github-gist-%EC%9E%90%EB%8F%99-%EA%B0%B1%EC%8B%A0)
    - [서버리스 통계 처리](#%EC%84%9C%EB%B2%84%EB%A6%AC%EC%8A%A4-%ED%86%B5%EA%B3%84-%EC%B2%98%EB%A6%AC)
  - [시스템 구조](#%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%A1%B0)
  - [개발 동기 및 확장 방향성](#%EA%B0%9C%EB%B0%9C-%EB%8F%99%EA%B8%B0-%EB%B0%8F-%ED%99%95%EC%9E%A5-%EB%B0%A9%ED%96%A5%EC%84%B1)
  - [라이선스](#%EB%9D%BC%EC%9D%B4%EC%84%A0%EC%8A%A4)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 설치 방법 

Gitmap은 Mac OS 및 Window Gitbash 환경에서 설치 및 사용이 가능합니다.

더 자세한 설치 방법 및 문의 사항은 아래 링크를 클릭해주세요!  
### [상세 설치 방법](https://velog.io/@seongnam-si/%EB%8B%A4%EA%BE%B8-%EA%B9%83%EA%BE%B8-%EA%B9%83%ED%97%88%EB%B8%8C-%EA%BE%B8%EB%AF%B8%EA%B8%B0)

### Step 0. ***해당 레포지토리를 Fork 해주세요!***

### Step 1. API Key 발급
Gitmap은 개인 키로 동작합니다. 아래와 사이트에 방문해 키를 발급받아 주세요.  
(해당 키는 비밀번호처럼 소중하게 다뤄주세요. **공개 금지입니다!**)    

[발급 사이트 바로가기](https://git-map.netlify.app)  

### Step 2. 1줄 설치
아래 명령어를 터미널에 입력해주세요.  
(어느 경로에서 설치해도 상관없어요.)

```
curl -fsSL https://raw.githubusercontent.com/Seongnam-si/git-map/main/install.sh | bash
```

해당 단계에서 설치 완료 메시지를 확인한 후 ```source ~/.zshrc``` 명령어를 입력하거나 터미널 재시작을 권장드려요!

### Step 3. API Key 설정
아래 명령어를 터미널에 입력한 후 Step 1에서 발급 받은 API Key를 입력해주세요.  
(어느 경로에서 설치해도 상관없어요.)

```
gitmap config set
```

### Step 4. 특정 레포에 훅 연결
보안에 민감한 사용자를 위해 원하는 레포의 커밋에만 반응합니다.  
아래 명령어를 터미널에 입력해주세요.  
(Gitmap 사용을 원하는 레포지토리 경로에서 입력해주세요)  

```bash
ln -sf ~/.gitmap/post-commit .git/hooks/post-commit
```

### Step 5. Gist 생성

1. [https://gist.github.com](https://gist.github.com) 접속
2. 파일명을 gitmap.md로 public gist를 생성해주세요. (내용은 비워져있어도 괜찮습니다.)
3. 생성 후 Gist URL의 ID에 해당하는 부분을 복사해주세요!  

```
https://gist.github.com/username/123123asdfasdf

ID -> 123123asdfasdf
```

### Step 6. Github Token 생성

1. [https://github.com/settings/tokens](https://github.com/settings/tokens) 접속
2. Tokens(classic) 클릭
3. Select Scopes 의 gist 항목 선택
4. 토큰 생성후 다음 단계를 위해 반드시 복사해주세요!

### Step 7. Gitmap repo의 secrets 설정

Gitmap repo -> Settings -> Secrets and variables -> Actions -> Secrets 

아래 3개를 추가해주세요.   
Name 값은 반드시 아래 예시와 동일하게 작성해주세요!

<table>
	<tr>
		<td>
			Name
		</td>
		<td>
			Value
		</td>
	</tr>
	<tr>
		<td>
			GITMAP_API_KEY
		</td>
		<td>
			Step 1에서 발급한 API Key
		</td>
	</tr>
	<tr>
		<td>
			GITMAP_GIST_ID
		</td>
		<td>
			Step 5에서 복사한 GIST ID
		</td>
	</tr>
	<tr>
		<td>
			GITMAP_GIST_TOKEN
		</td>
		<td>
			STEP 6에서 생성한 GITHUB TOKEN
		</td>
	</tr>
</table>

### Step 8.  🎉 실행 및 결과 확인

Actions 탭에서 Update Gist 워크플로우를 실행해주세요!  
Overview 탭에서 gitmap.md pin 지정후 결과물을 확인해주세요!

💡 최초 1회 설치 이후 Gitmap 사용 레포지토리를 추가하려면 **4번 단계**만 실행해주세요!

## 기술 스택

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

## 주요 기능

### 로컬 Git Hook 기반 커밋 위치 수집

- Git post-commit 훅을 활용, 로컬 커밋 시점의 위치 정보를 자동으로 수집합니다.
- 커밋 데이터와 IP 기반 위치 정보를 함께 전송하는 Bash 스크립트 구현했습니다.
- 사용자가 활성화한 레포지토리에서만 동작하여 보안을 고려했습니다.

### API Key 기반 사용자 식별

- 사용자별 API Key 발급 및 SHA-256 해시 저장
- 서버에 원본 키를 저장하지 않으며, 단순한 사용자 식별에만 활용됩니다. 

### Github Gist 자동 갱신

- Github Actions을 활용해 Gist의 내용을 하루에 한번 자동으로 갱신해줍니다.
- 초기 설정 이후, 커밋 -> 데이터 수집 -> 통계 계산 -> 갱신 까지 모든 과정이 자동입니다.
- 사용자의 별다른 개입 없이 Gitmap을 계속 사용할 수 있습니다. 

### 서버리스 통계 처리

- Supabase Edge Function 기반 서버리스 구조
- 커밋 데이터를 사용자 단위로 집계, 지역 단위 통계값을 생성합니다. 
- 불필요한 상태를 저장하지 않고, 요청 시점에 계산됩니다.

## 시스템 구조

```
[Local Git Commit]
		↓
[post-commit hook]
		↓
[Supbase Edge Funcion]
		↓
[Commit Location DB]
		↓
[Github Actions]
		↓
[Github Gist]
```

## 개발 동기 및 확장 방향성

깃허브의 커밋 기록은 얼마나 자주, 많이 개발했는지를 잘 보여줍니다.  
하지만, 어디에서 개발했는지에 대한 정보를 알 수 없습니다.  

"나는 어느 지역에서 개발을 했을까?"  
"이 기록을 내 깃허브 프로필에서 보여줄 수 있을까?"  

Gitmap은 이러한 궁금증에서 시작된 프로젝트입니다.

현재 Gitmap은 가장 많이 개발한 위치 Top 5 정보를 시각화합니다.  
단순한 통계이지만, 개발자의 활동이 어떤 공간에서 발생했는지 처음으로 드러나는 지점입니다.  
앞으로 이 위치 정보 위에 개발자의 흔적, 이야기를 덧붙이려합니다.  

어디에서 집중적으로 개발했는지, 어떤 시기에 환경이 변했는지, 또 그 변화가 개발 흐름에 어떤 흔적을 남겼는지까지  
나의 개발 기록을 공간, 시간의 이야기로 남기는 Gitmap을 목표로 하겠습니다. 

## 라이선스

MIT License