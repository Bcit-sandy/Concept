#!/bin/bash

# Simple script to automate git add, commit, and push
# Usage: ./git-sync.sh "Your commit message"

COMMIT_MSG=${1:-"Update by agent"}

echo "Adding all changes..."
git add .

echo "Committing changes with message: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

echo "Pushing to origin..."
git push origin main

echo "Done!"
