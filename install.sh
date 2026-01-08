#!/bin/bash
set -e

echo "🗺️ Installing GitMap..."

command -v git >/dev/null || { echo "❌ git not found"; exit 1; }
command -v curl >/dev/null || { echo "❌ curl not found"; exit 1; }

mkdir -p ~/.gitmap
mkdir -p ~/.local/bin

curl -fsSL https://raw.githubusercontent.com/Seongnam-si/git-map/main/hooks/post-commit \
  -o ~/.gitmap/post-commit

chmod +x ~/.gitmap/post-commit

curl -fsSL https://raw.githubusercontent.com/Seongnam-si/git-map/main/bin/gitmap \
  -o ~/.local/bin/gitmap

chmod +x ~/.local/bin/gitmap

if ! echo "$PATH" | grep -q "$HOME/.local/bin"; then
  echo ""
  echo "⚠️ ~/.local/bin 이 PATH에 없습니다."
  echo "아래를 ~/.zshrc 또는 ~/.bashrc 에 추가하세요:"
  echo 'export PATH="$HOME/.local/bin:$PATH"'
fi

echo ""
echo "✅ GitMap 설치 완료"
echo "👉 다음 명령어로 API Key를 설정하세요:"
echo ""
echo "   gitmap config set"
