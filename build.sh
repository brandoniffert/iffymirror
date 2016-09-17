#!/bin/bash

set -e

cd client && npm run build && pm2 restart iffymirror && /usr/bin/curl 192.168.0.104:3001/refresh
