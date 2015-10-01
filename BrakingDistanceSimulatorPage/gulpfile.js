//require gulp
var gulp = require('gulp');

// require other packages
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var rename = require("gulp-rename");
var less = require('gulp-less');
var uglify = require('gulp-uglify');

gulp.task('default', ['scripts', 'styles']);

// scripts task
gulp.task('scripts', function() {
    return gulp.src('./src/js/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
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

// watch task
gulp.task('watch', function() {
    gulp.watch('./src/js/*.js', ['scripts']);
    gulp.watch('./src/less/*.less', ['styles']);
});