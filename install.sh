#!/bin/bash
set -e

echo "🗺️ Installing GitMap..."

command -v git >/dev/null || { echo "git not found"; exit 1; }
command -v curl >/dev/null || { echo "curl not found"; exit 1; }

mkdir -p ~/.gitmap

echo "🔑 Enter your GitMap API Key:"
read -r API_KEY

cat <<EOF > ~/.gitmap/config
API_KEY="$API_KEY"
ENDPOINT="https://wrbyuqqtpdrvudgtskaq.supabase.co/functions/v1/commit"
EOF

curl -fsSL https://raw.githubusercontent.com/Seongnam-si/git-map/main/hooks/post-commit \
  -o ~/.gitmap/post-commit

chmod +x ~/.gitmap/post-commit

if [ -d ".git" ]; then
  ln -sf ~/.gitmap/post-commit .git/hooks/post-commit
  echo "post-commit hook linked"
fi

echo "🎉 Gitmap installed!"
