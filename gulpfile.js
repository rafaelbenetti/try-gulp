var gulp = require('gulp');
var minifyCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var del = require('del');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');

gulp.task('delete', function() {
    del(['assets/*'], function(err) {
      console.log('Files deleted');
    })
})

gulp.task('style', function() {
    return gulp
        .src('css/style.css')
        .pipe(minifyCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('assets'));
});

gulp.task('script', function(){
    return gulp
        .src('js/script.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(jshint())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('assets'));
});

gulp.task('watch', function(){
    gulp.watch('css/style.css', ['style']);
    gulp.watch('js/script.js', ['script']);
});

gulp.task('default', ['delete', 'style', 'script', 'watch']);