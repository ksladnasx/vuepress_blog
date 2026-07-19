#!/usr/bin/env sh

set -eu

REMOTE="${DEPLOY_REMOTE:-origin}"
BRANCH="${DEPLOY_BRANCH:-gh-pages}"
DIST_DIR="docs/.vuepress/dist"
WORKTREE_DIR=".deploy-${BRANCH}"

if ! REPO_URL="$(git remote get-url "$REMOTE" 2>/dev/null)"; then
  REPO_URL="git@github.com:ksladnasx/vuepress_blog.git"
fi

if [ -e "$WORKTREE_DIR" ]; then
  echo "Deploy worktree already exists: $WORKTREE_DIR"
  echo "Remove it with: git worktree remove $WORKTREE_DIR"
  exit 1
fi

echo "Building site..."
npm run docs:build

if [ ! -d "$DIST_DIR" ]; then
  echo "Build output not found: $DIST_DIR"
  exit 1
fi

echo "Preparing $BRANCH worktree..."
FETCHED_REMOTE_BRANCH=0
if git fetch "$REPO_URL" "$BRANCH"; then
  FETCHED_REMOTE_BRANCH=1
fi

if [ "$FETCHED_REMOTE_BRANCH" -eq 1 ]; then
  git worktree add -B "$BRANCH" "$WORKTREE_DIR" FETCH_HEAD
else
  echo "Remote branch $BRANCH not found, creating a new orphan branch."
  git worktree add --detach "$WORKTREE_DIR"
  git -C "$WORKTREE_DIR" checkout --orphan "$BRANCH"
fi

echo "Syncing build output..."
git -C "$WORKTREE_DIR" rm -r --ignore-unmatch . >/dev/null 2>&1 || true
cp -R "$DIST_DIR"/. "$WORKTREE_DIR"/
touch "$WORKTREE_DIR/.nojekyll"

git -C "$WORKTREE_DIR" add -A

if git -C "$WORKTREE_DIR" diff --cached --quiet; then
  echo "No changes to deploy."
  git worktree remove "$WORKTREE_DIR"
  exit 0
fi

git -C "$WORKTREE_DIR" commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git -C "$WORKTREE_DIR" push "$REPO_URL" "$BRANCH:$BRANCH"
git worktree remove "$WORKTREE_DIR"

echo "Deploy success: https://www.xhblog.cc.cd/"
