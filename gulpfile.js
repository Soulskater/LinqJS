/**
 * Created by gmeszaros on 9/8/2014.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var del = require('del');

var paths = {
    scripts: ['src/**/*.js', '!src/lib/**/*.js']
};

gulp.task('clean', function (cb) {
    // You can use multiple globbing patterns as you would with `gulp.src`
    del(['dist'], cb);
});

//region Live environment

gulp.task('scripts-min', ['clean'], function () {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/'));
});

//endregion Live environment

//region Dev environment

gulp.task('scripts', ['lib'], function () {
    return gulp.src(paths.scripts)
        .pipe(gulp.dest('dist/'));
});

//endregion Dev environment

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['scripts']);
});

// DEV
gulp.task('default', ['scripts']);

gulp.task('dev', ['scripts']);

gulp.task('live', ['scripts-min']);
