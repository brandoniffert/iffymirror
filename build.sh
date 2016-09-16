#!/bin/bash

set -e

./node_modules/gulp/bin/gulp.js && pm2 restart iffymirror
