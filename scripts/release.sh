#!/bin/bash
set -e

if [[ -z $1 ]]; then
  echo "Enter new version: "
  read -r VERSION
else
  VERSION=$1
fi

read -p "Releasing $VERSION - are you sure? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "Releasing $VERSION ..."

  # lint 
  # npm run lint
  # build
  rm -rf ./release

  npm version "$VERSION" --allow-same-version

  npm run build
  
  # check dir release exists.
  if [ ! -d "./release" ]; then
    mkdir release
  fi
  cd release
  cp ../package.json ./
  cp ../README.md ./
  mv ../lib lib/
  mv ../dist dist/
  mv ../es es/
  mv ../esm esm/
  
  # commit
  #  git add -A
  #  git commit -m "build: build $VERSION"
  # publish
  #  git push origin refs/tags/v"$VERSION"
  #  git push

  # release
  snpm publish
fi
