var gulp = 		require('gulp'),
 concat = 		require('gulp-concat');
 jshint = 		require('gulp-jshint');
 uglify = 		require('gulp-uglify');
 imagemin = 	require('gulp-imagemin'),
 minifycss = 	require('gulp-minify-css');
 sass = 		  require('gulp-sass');
 ts = 			  require('gulp-typescript');
 gulpTypings = 	require("gulp-typings");
 tsProject = 	ts.createProject("tsconfig.json");
 browserSync = 	require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./dist"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('images', function(){
  gulp.src('src/img/**/*')
    .pipe(imagemin({ optimizationLevel: 1, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/img/'));
});

gulp.task('styles', function(){
  gulp.src(['src/sass/**/*.scss'])
    .pipe(sass())
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
  return gulp.src('src/ts/**/*.ts')
	.pipe(tsProject())
    /*.pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(uglify())*/
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task("typings",function(){
    var stream = gulp.src("./typings.json")
        .pipe(gulpTypings()); //will install all typingsfiles in pipeline.
    return stream; // by returning stream gulp can listen to events from the stream and knows when it is finished.
});

gulp.task('default', ['browser-sync'], function(){
  gulp.watch("src/sass/**/*.scss", ['styles']);
  gulp.watch("src/ts/**/*.js", ['scripts']);
  gulp.watch("*.html", ['bs-reload']);
});
