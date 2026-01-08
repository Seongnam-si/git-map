# Gitmap
### My Commit Locations

로컬 Git 커밋 시점을 기준으로 위치를 기록하고, 도시별 커밋 비율 Top 5를 Github README에 시각화합니다.

<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/9c88e031-b40f-4aa5-a5e9-b55939e28667">

## 사용 방법 (4단계)

### Step 1. API Key 발급
Gitmap은 개인 키로 동작합니다. 아래와 같이 키를 발급받아 주세요.  
(해당 키는 비밀번호처럼 소중하게 다뤄주세요. <span style="background: red">**공개 금지입니다!**</span>)  
[발급 사이트 바로가기](https://git-map.netlify.app)  

<table>
	<tr>
		<td>
			메인 화면
		</td>
		<td>
			깃허브 로그인 후 화면
		</td>
		<td>
			API Key 발급 후 화면
		</td>
	</tr>
	<tr>
		<td>
			<img width="500" height="500" alt="Image" src="https://github.com/user-attachments/assets/b9f9d8d7-27f5-45d3-9b13-77be6cadd0b4" />
		</td>
		<td>
			<img width="500" height="500" alt="Image" src="https://github.com/user-attachments/assets/e9e39d2c-3bb7-43b9-b683-70a1e805d825" />
		</td>
		<td>
			<img width="500" height="500" alt="Image" src="https://github.com/user-attachments/assets/7559a829-1bf3-4660-8e24-8102df8e5b0b" />
		</td>
	</tr>
</table>

### Step 2. 1줄 설치
아래 명령어 한줄을 터미널에 입력해주세요.

```
curl -fsSL https://raw.githubusercontent.com/Seongnam-si/git-map/main/install.sh | bash
```

설치 과정에서 1에서 발급받은 API Key를 요구합니다. Key를 입력해주세요.

### Step 3. 특정 레포에 훅 연결
보안에 민감한 사용자를 위해 원하는 레포의 커밋에만 반응합니다.  
```bash
cd /path/your_repo_dir
ln -sf ~/.gitmap/post-commit .git/hooks/post-commit
```

### Step 4. 리드미에 마커 삽입
원하는 리드미 파일에 아래 마커를 추가해주세요!
```
<!-- GITMAP_START -->
🗺️ GitMap - My Coding Locations

| Seoul | ██████████ 95% |
| Haegok | █░░░░░░░░░ 5% |
<!-- GITMAP_END -->
```
