'use strict';

// Variables

var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var del = require('del');
var gulp = require('gulp');
var mincss = require('gulp-csso');
var minimage = require('gulp-imagemin');
var minjs = require('gulp-uglify');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var pngquant = require('imagemin-pngquant');
var postcss = require('gulp-postcss');
var pug = require('gulp-pug');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var webp = require('gulp-webp');

// Task functions

var clean = function () {
  return del('./build/');
}

var fonts = function () {
  return gulp.src('./source/fonts/*.{woff,woff2}')
    .pipe(gulp.dest('./build/fonts'));
}

var images = function () {
  return gulp.src('./source/img/*.{jpg,png,svg}')
    .pipe(minimage([
      pngquant({
        speed: 1,
        quality: 80
      }),
      minimage.jpegtran({
        progressive: true
      }),
      minimage.svgo({
        plugins: [
          {removeDoctype: true},
          {removeXMLProcInst: true},
          {removeComments: true},
          {removeMetadata: true},
          {convertTransform: true},
          {removeViewBox: false}
        ]
      })
    ]))
    .pipe(gulp.dest('./build/img/'))
    .pipe(gulp.src('./build/img/*.{jpg,png}'))
    .pipe(webp({
      quality: 80
    }))
    .pipe(gulp.dest('./build/img/'));
}

var updatesvg = function () {
  del('./build/img/*.svg');
  return gulp.src('./source/img/*.svg')
    .pipe(minimage(
      minimage.svgo({
        plugins: [
          {removeDoctype: true},
          {removeXMLProcInst: true},
          {removeComments: true},
          {removeMetadata: true},
          {convertTransform: true},
          {removeViewBox: false}
        ]
      })
    ))
    .pipe(gulp.dest('./build/img/'));
}

var updatebitmaps = function () {
  del('./build/img/*.{jpg,png,webp}');
  return gulp.src('.source/img/*.{jpg,png,webp}')
    .pipe(minimage([
      pngquant({
        speed: 1,
        quality: 80
      }),
      minimage.jpegtran({
        progressive: true
      })
    ]))
    .pipe(gulp.dest('./build/img/'))
    .pipe(gulp.src('./build/img/*.{jpg,png}'))
    .pipe(webp({
      quality: 80
    }))
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
  gulp.watch('./source/js/*.js', scripts).on('change', browserSync.reload);
  gulp.watch('./source/pug/**/*.pug', html);
  gulp.watch('./source/img/*.svg', updatesvg).on('change', browserSync.reload);
  gulp.watch('./source/img/*.{jpg,png}', updatebitmaps).on('change', browserSync.reload);
}

gulp.task('build', gulp.series(clean, fonts, images, scripts, style, html));
gulp.task('serve', serve);
