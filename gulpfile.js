var gulp = require('gulp');
var spritesmith  = require('gulp.spritesmith');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var svgSprite = require("gulp-svg-sprites");

gulp.task('sprite', function () {
    return gulp.src('src/dist/images/icons/*.svg')
        .pipe(svgSprite())
        .pipe(gulp.dest("src/dist/sprite"));
});

gulp.task('scripts', function() {
  gulp.src('src/scripts/*.*')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/dist/scripts/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('src/dist/scripts/'))
});

gulp.task('vendorScripts', function() {
  gulp.src([
      'src/vendor/jquery.min.js',
      'src/vendor/slick.js',
      'src/vendor/select2.full.js',
      'src/vendor/jquery-ui.js',
      'src/vendor/jquery.fancybox.js',
      'src/vendor/jquery.fancybox-thumbs.js',
    ])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/dist/scripts/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('src/dist/scripts/'))
});

gulp.task('vendorStyles', function() {
  gulp.src('src/vendor/*.css')
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('src/dist/styles/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('src/dist/styles/'))
});

gulp.task('styles', function () {
  return gulp.src('src/styles/main.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(rename('style.css'))
  .pipe(gulp.dest('src/dist/styles'))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('src/dist/styles'));
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
})

gulp.task('watch', function() {
    gulp.watch('src/styles/**/*.scss', ['styles'])
    gulp.watch('src/scripts/*.*', ['scripts'])
});

gulp.task('default', function () {
    runSequence('sprite', 'scripts', 'styles', 'vendorScripts', 'vendorStyles', 'serve', 'watch');
});