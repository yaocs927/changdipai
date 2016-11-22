// gulp 依赖
var gulp = require('gulp');
// 浏览器自动刷新 依赖
var browserSync = require('browser-sync');
// 自动编译 sass 依赖
var gPlumber = require('gulp-plumber');
var gSourcemaps = require('gulp-sourcemaps');
var gScss = require('gulp-sass');
var gAutoprefixer = require('gulp-autoprefixer');
// 打包相关 依赖
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');

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
  ],
  dist: 'dist/'
};

// 设置 browserSync 根目录
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    }
  });
});

// 编译 sass
gulp.task('startScss', function() {
  return gulp.src(filesPath.scss + '*.scss')
    .pipe(gPlumber())
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
    .pipe(gulp.dest(filesPath.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// 监听文件
gulp.task('watch', ['browserSync', 'startScss'], function() {
  gulp.watch(filesPath.scss + '*.scss', ['startScss']);
  gulp.watch(filesPath.html + '*.html', browserSync.reload);
  gulp.watch(filesPath.html + '**/*.js', browserSync.reload);
});

gulp.task("pack", function() {
  var jsFilter = filter("**/*.js", { restore: true });
  var cssFilter = filter("**/*.css", { restore: true });
  var indexHtmlFilter = filter(['**/*', '!**/*.html'], { restore: true });

  return gulp.src("src/*.html")
    .pipe(useref())      // Concatenate with gulp-useref
    .pipe(jsFilter)
    .pipe(uglify())             // Minify any javascript sources
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(csso())               // Minify any CSS sources
    .pipe(cssFilter.restore)
    .pipe(indexHtmlFilter)
    .pipe(rev())                // Rename the concatenated files (but not index.html)
    .pipe(indexHtmlFilter.restore)
    .pipe(revReplace())         // Substitute in new filenames
    .pipe(gulp.dest('dist'));
});













