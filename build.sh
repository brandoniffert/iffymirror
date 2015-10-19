#!/bin/bash

set -e

./node_modules/gulp/bin/gulp.js && forever restart app.js
