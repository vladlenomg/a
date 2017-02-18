'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');

var watchFiles = {
    html: 'src/**/*.html',
    sass: 'src/sass/**/*.sass',
    js: 'src/js/**/*.js',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/*.*',
    bower: 'bower_components/'
};


gulp.task('watch', function () {

    watch([watchFiles.html], function (event, cb) {
        gulp.start('build-dev:html');
    });

    watch([watchFiles.sass], function (event, cb) {
        gulp.start('build-dev:sass');
    });

    watch([watchFiles.js], function (event, cb) {
        gulp.start('build-dev:js');
    });

    watch([watchFiles.img], function (event, cb) {
        gulp.start('build-dev:img');
    });

    watch([watchFiles.fonts], function (event, cb) {
        gulp.start('build-dev:fonts');
    });

    watch([watchFiles.bower], function (event, cb) {
        gulp.start('build-dev:bower');
    });

});
