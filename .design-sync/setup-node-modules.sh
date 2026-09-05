#!/usr/bin/env bash
# Build the node_modules tree the design-sync converter runs against.
#
# Why this exists: the app is pinned to React 16 (Gatsby 4), but the preview
# cards the converter emits mount with ReactDOM.createRoot — the React 18 root
# API — so a React 16 _vendor/react.js makes every card fail with
# "ReactDOM.createRoot is not a function" and fall back to the floor card.
# claude.ai/design renders designs on a modern React anyway, so previewing on
# React 18 is both the fix and the closer match to the target runtime.
#
# The result is a tree that symlinks every real dependency from the repo's own
# node_modules (styled-components, styled-system, framer-motion, ...) and
# overrides only react/react-dom with 18.x. react/react-dom/react-is/scheduler
# are externalised to window globals by the bundler, so this swap changes the
# runtime React without altering a single bundled dependency.
#
# Safe to re-run. Output is gitignored (.design-sync/.cache/).
set -euo pipefail
cd "$(dirname "$0")/.."

REACT_VERSION=18.3.1
CACHE=.design-sync/.cache
PIN="$CACHE/react18"
MERGED="$CACHE/nm"

[ -d node_modules ] || { echo "run the repo install first (yarn install --frozen-lockfile)" >&2; exit 1; }

mkdir -p "$PIN"
if [ ! -d "$PIN/node_modules/react-dom" ]; then
  echo '{"name":"ds-sync-react-pin","private":true}' > "$PIN/package.json"
  (cd "$PIN" && npm i --silent --no-audit --no-fund \
     "react@$REACT_VERSION" "react-dom@$REACT_VERSION")
fi

rm -rf "$MERGED"
mkdir -p "$MERGED"
# Symlink every top-level entry (including scoped @dirs) from the repo tree.
for entry in node_modules/*; do
  name=$(basename "$entry")
  case "$name" in
    react|react-dom) continue ;;
  esac
  ln -sfn "$(cd "$entry" && pwd)" "$MERGED/$name"
done
# Override react/react-dom with the pinned 18.x copies.
for name in react react-dom; do
  ln -sfn "$(cd "$PIN/node_modules/$name" && pwd)" "$MERGED/$name"
done

echo "merged node_modules -> $MERGED"
echo "  react     $(node -p "require('./$MERGED/react/package.json').version")"
echo "  react-dom $(node -p "require('./$MERGED/react-dom/package.json').version")"
