'use strict';
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var mocha = require('gulp-spawn-mocha');
var benchmark = require('gulp-benchmark');

gulp.task('default', function (cb) {
  pump([
        gulp.src('src/*.js'),
        uglify(),
        gulp.dest('dist')
    ],
    cb);
});

gulp.task('test', ['default'], function (cb) {
    pump([
        gulp.src('test/*.js'),
        mocha()
    ],
    cb);
});

gulp.task('perf', ['default'], function(cb) {
    pump([
        gulp.src('perf/*.js', { read: false }),
        benchmark({
            reporters: benchmark.reporters.fastest()
        })
    ],
    cb);
});