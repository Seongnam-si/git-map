#!/bin/bash
set -e

echo "🗺️ Installing GitMap..."

command -v git >/dev/null || { echo "❌ git not found"; exit 1; }
command -v curl >/dev/null || { echo "❌ curl not found"; exit 1; }

GITMAP_DIR="$HOME/.gitmap"
BIN_DIR="$HOME/.local/bin"

mkdir -p "$GITMAP_DIR"
mkdir -p "$BIN_DIR"

curl -fsSL https://raw.githubusercontent.com/Seongnam-si/git-map/main/hooks/post-commit \
  -o "$GITMAP_DIR/post-commit"

chmod +x "$GITMAP_DIR/post-commit"

curl -fsSL https://raw.githubusercontent.com/Seongnam-si/git-map/main/bin/gitmap \
  -o "$BIN_DIR/gitmap"

chmod +x "$BIN_DIR/gitmap"

SHELL_NAME=$(basename "$SHELL")

if [[ "$SHELL_NAME" == "zsh" ]]; then
  PROFILE_FILE="$HOME/.zshrc"
elif [[ "$SHELL_NAME" == "bash" ]]; then
  PROFILE_FILE="$HOME/.bashrc"
else
  PROFILE_FILE=""
fi

if ! echo "$PATH" | grep -q "$BIN_DIR"; then
  if [[ -n "$PROFILE_FILE" ]]; then
    echo "" >> "$PROFILE_FILE"
    echo '# GitMap CLI' >> "$PROFILE_FILE"
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$PROFILE_FILE"

    echo "✅ PATH 설정이 $PROFILE_FILE 에 추가되었습니다."
    echo "ℹ️ 현재 터미널에 적용하려면 아래 명령어를 실행하세요:"
    echo ""
    echo "   source $PROFILE_FILE"
  else
    echo "⚠️ PATH를 자동 설정하지 못했습니다."
    echo "아래를 셸 설정 파일에 수동으로 추가하세요:"
    echo 'export PATH="$HOME/.local/bin:$PATH"'
  fi
else
  echo "✅ PATH 설정 확인됨"
fi

echo ""
echo "🎉 GitMap 설치 완료!"
echo ""
echo "👉 다음 단계:"
echo "   1) 터미널을 재시작하거나"
echo "   2) source ~/.zshrc  (또는 ~/.bashrc)"
echo ""
echo "그 다음 아래 명령어로 API Key를 설정해주세요:"
echo ""
echo "   gitmap config set"
echo ""