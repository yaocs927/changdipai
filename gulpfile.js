var gulp = require('gulp');

var browserSync = require('browser-sync');

var gPlumber = require('gulp-plumber');
var gSourcemaps = require('gulp-sourcemaps');
var gScss = require('gulp-sass');
var gAutoprefixer = require('gulp-autoprefixer');

var gFilter = require('gulp-fliter');
var gUglify = require('gulp-uglify');
var gMinifyCss = require('gulp-minify-css');
var gUseref = require('gulp-useref');

// 文件路径 储存
var filesPath = {
  html: 'src/',
  js: 'src/js/',
  scss: 'src/scss/',
  css: 'src/css/',
  static: [
    'src/img/*.png',
    'src/img/*.gif',
    'src/img/*.jpg'
  ]
};

// 设置 browserSync 根目录
gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: 'src'
    }
  });
});

// 编译 sass
gulp.task('startScss', function () {
  return gulp.src(filesPath.scss + '*.scss')
    .pipe(gPlumber())
    .pipe(gSourcemaps().init())
    .pipe(gScss({
      outputStyle: 'expanded'
    }).on('error', gScss.logError))
    .pipe(gAutoprefixer({
      browsers: [
        '> 1%',
        'last 2 version',
        'iOS >= 6.0',
        'Android >= 4.0'
      ]
    }))
    .pipe(gSourcemaps.write())
    .pipe(gulp.dest(filesPath.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// 监听文件
gulp.task('watch', ['browserSync', 'startScss'], function () {
  gulp.watch(filesPath.scss + '*.scss', ['startScss']);
  gulp.watch(filesPath.html + '*.html', browserSync.reload);
  gulp.watch(filesPath.html + '**/*.js', browserSync.reload);
});
