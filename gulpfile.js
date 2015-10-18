'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');

gulp.task('browserify', function () {
  return browserify('./src/main.js').bundle()
    .pipe(plumber())
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./public/scripts'));
});

gulp.task('watch', function () {
  return gulp.watch('./src/*.js', ['browserify']);
});

gulp.task('default', ['browserify']);
