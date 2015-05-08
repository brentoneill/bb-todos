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
    livereload = require('gulp-livereload'),
    express = require('express'),
    open = require('gulp-open'),
    gutil = require('gulp-util'),
    browsersync = require('browser-sync').create();

function startExpress(){
  var app = express();
  app.use(express.static('dist'));
  app.listen(4000);
}

//Lint our scripts (NOT VENDOR)
gulp.task('lint', function() {
    return gulp.src('assets/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Compile Our Sass (NOT VENDOR)
gulp.task('sass', function() {
    return gulp.src('assets/scss/*.scss')
        //.pipe(scsslint())                           //Lints my SCSS
        .pipe(sass())
        .pipe(cssmin())
        .pipe(rename({ suffix : '.min' }))
        .pipe(gulp.dest('dist/assets/css'));           //Default file name is style.css
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


//Spins up browser sync server
gulp.task('server', function(){
  browsersync.init({
    server: "./dist"
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
    gulp.watch('assets/js/*.js', ['lint', 'scripts', 'reload']);  //Lints and concat/minifies these script if a change is detected
    gulp.watch('assets/scss/*.scss', ['sass', 'reload']);         //Runs the sass compile found above if changes are made

});

// Default Task - run in terminal by typing 'gulp'. Runs all commands and then runs the watch task directly above.
gulp.task('default', ['lint', 'sass', 'scripts', 'vscripts', 'server', 'watch'], function(){
  return gutil.log('Gulp is running...watching Javascripts and SCSS for changes!');
});
