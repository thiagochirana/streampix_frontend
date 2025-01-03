#!/bin/bash
rm -rf dist

pm2 stop all && pm2 delete all

cd dist/

pm2 start "http-server ./ -p 5000"