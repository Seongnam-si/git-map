# Gitmap
### My Commit Locations

로컬 커밋 시점을 기준으로 위치를 기록하고, 깃허브에 시각화합니다.

<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/6c1cdb2b-bb79-487c-af9c-dee5f2fd1fb6">

## 사용 방법 
💡 최초 1회 설치 이후 Gitmap 사용 레포지토리를 추가하려면 **4번 단계**만 실행해주세요!

### 해당 레포지토리를 Fork 해주세요!

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

아래 4개를 추가해주세요.   
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
