#!/usr/bin/env sh
# abort on errors
set -e
# install dependencies
npm ci
# build static files
npm run build
# navigate into the build output directory
cd build
# create a fresh new git repo in the output directory
git init
git config --global user.email "christopher.ferreira@consensys.net"
git config --global user.name "Christopher Ferreira"
git config --global init.defaultBranch main
git add -A
git commit -m 'deploy'
# Force push to the "publishing source" of your GitHub pages site
# in this case, the gh-pages branch


git push -f git@github.com:christopherferreira9/sdk-bug.git main:gh-pages
# Back to previous directory (the root of your repo)
cd -