#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <remote> <base-branch>"
  echo "Example: $0 origin main"
  exit 1
fi

remote="$1"
base="$2"

current_branch="$(git branch --show-current)"
if [[ -z "$current_branch" ]]; then
  echo "Could not determine current branch"
  exit 1
fi

echo "Fetching $remote/$base ..."
git fetch "$remote" "$base"

echo "Merging $remote/$base into $current_branch ..."
set +e
git merge "$remote/$base"
merge_status=$?
set -e

if [[ $merge_status -ne 0 ]]; then
  echo
  echo "Merge conflicts detected. Resolve them, then run:"
  echo "  git add <files>"
  echo "  git commit -m 'Resolve merge conflicts with $base'"
  echo "  git push $remote $current_branch"
  exit $merge_status
fi

echo "Merge successful. Push with: git push $remote $current_branch"
