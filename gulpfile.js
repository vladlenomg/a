'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

require('require-dir')('./gulp-tasks');

// -------------------- BROWSER SYNC
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './build-dev'
        },
        notify: false,
        port: 8080
    });
});

// -------------------- DEFAULT TASK 
gulp.task('default', ['build-dev', 'browser-sync', 'watch']);