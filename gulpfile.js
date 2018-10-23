'use strict';

// Variables

var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var del = require('del');
var gulp = require('gulp');
var mincss = require('gulp-csso');
var minjs = require('gulp-uglify');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var pug = require('gulp-pug');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

// Task functions

var clean = function () {
  return del('build');
}

var fonts = function () {
  return gulp.src('./source/fonts/*.{woff,woff2}')
    .pipe(gulp.dest('./build/fonts'));
}

var images = function () {
  return gulp.src('./source/img/*.{jpg,png,svg}')
    .pipe(gulp.dest('./build/img/'));
}

var scripts = function () {
  return gulp.src('./source/js/*.js')
    .pipe(minjs())
    .pipe(gulp.dest('./build/js/'));
}

var style = function () {
  return gulp.src('./source/sass/style.scss')
    .pipe(plumber({
      errorHandler: notify.onError()
    }))
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('./build/css/'))
    .pipe(mincss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./build/css/'))
    .pipe(browserSync.stream());
}

var html = function () {
  return gulp.src('./source/pug/*.pug')
    .pipe(plumber({
      errorHandler: notify.onError()
    }))
    .pipe(pug())
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.stream());
}

var serve = function () {
  browserSync.init({
    server: './build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch('./source/sass/**/*.scss', style);
  // gulp.watch('source/img/*.svg', gulp.series(svgUpdate, html)).on('change', browserSync.reload); //TODO: добавить позже
  gulp.watch('source/js/*.js', scripts).on('change', browserSync.reload);
  gulp.watch('./source/pug/**/*.pug', html);
}

gulp.task('build', gulp.series(clean, fonts, images, scripts, style, html));
gulp.task('serve', serve);