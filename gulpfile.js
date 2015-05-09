'use strict'

// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    open = require('gulp-open'),
    gutil = require('gulp-util'),
    copy = require('gulp-copy'),
    browsersync = require('browser-sync').create();


//Lint our scripts (NOT VENDOR)
gulp.task('lint', function() {
    return gulp.src('assets/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Compile Our Sass for build (NOT VENDOR)
gulp.task('sass', function() {
    return gulp.src('assets/scss/*.scss')
        //.pipe(scsslint())                           //Lints my SCSS
        .pipe(sass())
        .pipe(cssmin())
        .pipe(rename({ suffix : '.min' }))
        .pipe(gulp.dest('dist/assets/css'));           //Default file name is style.css
});


gulp.task('dev-sass', function(){
  return gulp.src('assets/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('assets/css'));
});

// Concatenate & Minify our scripts
gulp.task('scripts', function() {
    return gulp.src(['assets/js/models.js',          //Order here is important to ensure
                     'assets/js/collections.js',     //to ensure dependencies are loaded
                     'assets/js/views.js',           //in the correct order.
                     'assets/js/main.js'
                    ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'));
});

// Concatenate & Minify (VENDOR)
gulp.task('vscripts', function() {
    return gulp.src(['lib/jquery/*.js',              //Order here is important to ensure
                     'lib/underscore/*.js',          //to ensure dependencies are loaded
                     'lib/backbone/*.js',            //in the correct order.
                     'lib/backbone.babysitter/*.js',
                     'lib/backbone.wreqr/*.js',      //-note: find solution to pull order from index page
                     'lib/marionette/*.js',
                     'lib/dustjs-linkedin/*.js',
                     'lib/**/*.js'
                    ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/vendor'))
        .pipe(rename('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/vendor'));
});


//BUILD SERVER via browsersync
gulp.task('buildserver', function(){
  browsersync.init({
    server: "./dist",
    port: 4040
  });
});

//DEVELOPMENT SERVER via browsersync
gulp.task('devserver', function(){
  browsersync.init({
    server: "./",
    port: 3030
  });
});

//Browser task
gulp.task('reload', function(){
  browsersync.reload();
  return gutil.log('Reloading your browser....');
});

// Watch Files For Changes in assets/js (any .js file)
gulp.task('watch',  function() {
    // livereload.listen({ basePath: 'dist' });
    gulp.watch('assets/js/*.js', ['lint', 'reload']);             //Lints and concat/minifies these script if a change is detected
    gulp.watch('assets/scss/*.scss', ['sass', 'reload']);         //Runs the sass compile found above if changes are made
    //gulp.watch('index.html', ['html', 'reload']);
});

// Default Task - run in terminal by typing 'gulp'. Runs all commands and then runs the watch task directly above.
// gulp.task('default', ['lint', 'sass', 'devserver', 'watch'], function(){
// });


//Dev task - run in terminal by typing 'gulp dev' - Fires up server on 3030
gulp.task('dev', ['lint', 'dev-sass', 'devserver'], function(){
  gulp.watch('assets/scss/*.scss', ['dev-sass']);
  gulp.watch('assets/css/*.css', ['reload']);
  gulp.watch('assets/js/*.js', ['reload']);
  gulp.watch('index.html', ['reload']);
  return gutil.log('Gulp is running your development server ...watching Javascripts and SCSS for changes.');
});

//Build task - run in terminal by typing 'gulp dev' - Fires up server on 4040
gulp.task('build', ['lint', 'sass', 'scripts', 'vscripts', 'buildserver', 'watch'], function(){
  gulp.watch('./dist/index.html', ['reload']);
  return gutil.log('Gulp has built your project and is serving the the from the dist folder. Cheers!')
});
