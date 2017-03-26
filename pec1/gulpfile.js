// GULP REQUIRES
var gulp = 		    require('gulp'),
  runSequence =   require('run-sequence');
  clean =         require('gulp-clean');
  concat = 		    require('gulp-concat');
  uglify = 		    require('gulp-uglify');
  sourcemaps =    require('gulp-sourcemaps');
  imagemin = 	    require('gulp-imagemin'),
  minifycss = 	  require('gulp-minify-css');
  sass = 		      require('gulp-sass');
  ts = 			      require('gulp-typescript');
  gulpTypings = 	require("gulp-typings");
  tsProject = 	  ts.createProject("tsconfig.json" );
  browserSync = 	require('browser-sync');

// BROWSER SYNC CONFIG
gulp.task('browser-sync', function() {
  browserSync({
    server: { baseDir: "./dist" }
  });
});

// BROWSER SYNC RELOAD
gulp.task('bs-reload', function () {
  browserSync.reload();
});

// IMAGE OPTIMIZATION
gulp.task('images', function(){
  gulp.src('src/img/**/*')
    .pipe(imagemin({ optimizationLevel: 1, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/img/'));
});

// STYLE SASS MINIFY + MINIFY
gulp.task('styles', function(){
  gulp.src(['src/sass/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifycss())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({stream:true}))
});

// TYPESCRIPT CONF
gulp.task('typings',function(){
    var stream = gulp.src("./typings.json")
        .pipe(gulpTypings()); //will install all typingsfiles in pipeline.
    return stream; // by returning stream gulp can listen to events from the stream and knows when it is finished.
});

// TYPESCRIPT TO JS + CONCAT + UGLIFY
gulp.task('scripts', function() {
    var tsResult = tsProject.src() // or tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
    return tsResult
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/js'));
});

// COPY BASE / UNTOUCHED FILES
gulp.task('copy', function() {
    gulp.src(['src/index.html']).pipe(gulp.dest('dist/'));
    gulp.src(['src/vendor/**/*']).pipe(gulp.dest('dist/vendor'));
});

// DELETE ALL
gulp.task('delete', function () {
    return gulp.src('dist/', {read: true})
        .pipe(clean());
});

// DEFAULT TASK: BUILD ALL! + runSequence
gulp.task('default', function(callback) {
  runSequence('delete',
              ['images',
              'styles',
              'scripts',
              'copy'],
              'browser-sync');
              gulp.watch("src/sass/**/*.scss", ['styles']);
              gulp.watch("src/ts/*.ts", ['scripts']);
              gulp.watch("src/*.html", ['copy','bs-reload']);
});
