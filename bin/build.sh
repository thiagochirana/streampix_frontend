#!/bin/bash
rm -rf dist

git fetch && git pull

pm2 stop all && pm2 delete all

npm run build

cd dist/

pm2 start "http-server ./ -p 5000 --spa"
# pm2 start "serve -s dist -l 5000"