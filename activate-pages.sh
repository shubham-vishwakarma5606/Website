#!/usr/bin/env bash
#
# Activate the GitHub Pages deploy workflow.
#
# Why this script exists: GitHub blocks apps/bots from creating or updating
# anything under .github/workflows/ unless the token carries the `workflows`
# scope. The deploy workflow is therefore parked at the repo root, and this
# last move has to be made from a human account.
#
# Usage:  ./activate-pages.sh
#
set -euo pipefail

SRC="deploy-github-pages.yml"
DEST_DIR=".github/workflows"
DEST="$DEST_DIR/deploy.yml"

cd "$(git rev-parse --show-toplevel)"

if [[ -f "$DEST" ]]; then
  echo "✓ $DEST already exists — workflow is already activated."
  echo
  echo "  If the live site still shows the README, the remaining step is:"
  echo "  Settings → Pages → Source → \"GitHub Actions\""
  exit 0
fi

if [[ ! -f "$SRC" ]]; then
  echo "✗ Cannot find $SRC at the repo root. Nothing to move." >&2
  exit 1
fi

if [[ -n "$(git status --porcelain --untracked-files=no)" ]]; then
  echo "✗ Working tree has uncommitted changes. Commit or stash them first." >&2
  git status --short
  exit 1
fi

echo "→ Moving $SRC → $DEST"
mkdir -p "$DEST_DIR"
git mv "$SRC" "$DEST"

echo "→ Committing"
git commit -q -m "Enable Pages deploy workflow"

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
echo "→ Pushing to origin/$BRANCH"
git push origin "$BRANCH"

cat <<'EOF'

✓ Workflow activated.

One step left — it cannot be scripted:

    Settings → Pages → Source → "GitHub Actions"

Until that is set, GitHub keeps using its legacy Jekyll builder, which
ignores ./out and serves README.md as the home page.

Once the workflow is on main and the source is set to Actions, watch it with:

    gh run watch

Then load: https://shubham-vishwakarma5606.github.io/Website/
EOF
