//require gulp
var gulp = require('gulp');

// require other packages
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var rename = require("gulp-rename");
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');


// scripts task
gulp.task('scripts', function() {
    return gulp.src('./src/js/**')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/js/'));
});

// styles task
gulp.task('styles', function() {
    return gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/css/'));
});

//browserify
gulp.task('browserify',['scripts'], function(){
    return browserify('./dist/js/app.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./build/'));
});

// watch task
gulp.task('watch', function() {
    gulp.watch('./src/less/*.less', ['styles']);
    gulp.watch('./src/js/**', ['browserify']);
});