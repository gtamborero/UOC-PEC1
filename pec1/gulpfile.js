var gulp = require('gulp'),
 concat = require('gulp-concat');
 jshint = require('gulp-jshint');
 uglify = require('gulp-uglify');
 imagemin = require('gulp-imagemin'),
 minifycss = require('gulp-minify-css');
 sass = require('gulp-sass');
 browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./src"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('images', function(){
  gulp.src('src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img/'));
});

gulp.task('styles', function(){
  gulp.src(['src/sass/**/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('dist/css/'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
  return gulp.src('src/ts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('default', ['browser-sync'], function(){
  gulp.watch("src/sass/**/*.scss", ['styles']);
  gulp.watch("src/ts/**/*.js", ['scripts']);
  gulp.watch("*.html", ['bs-reload']);
});