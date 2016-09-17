#!/bin/bash

set -e

cd client && npm run build && pm2 restart iffymirror
