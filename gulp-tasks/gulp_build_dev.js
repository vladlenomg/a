'use strict';

var gulp = require('gulp'),

// add vendor prefixes https://github.com/postcss/autoprefixer
    autoprefixer = require('gulp-autoprefixer'),
// mixin library for sass  http://bourbon.io/
    bourbon = require('node-bourbon'),
// time-saving synchronised browser testing https://www.browsersync.io/
    browserSync = require('browser-sync'),
// minify CSS
    cleanCSS = require('gulp-clean-css'),
// minify images
    imagemin = require('gulp-imagemin'),
// minify png
    pngquant = require('imagemin-pngquant'),
// plumper
    plumber = require('gulp-plumber'),
// rename files easily https://github.com/hparra/gulp-rename
    rename = require('gulp-rename'),
// include engine
    rigger = require('gulp-rigger'),
// rm -rf
    rimraf = require('rimraf'),
// sass to css
    sass = require('gulp-sass'),
// css sourcemaps
    sourcemaps = require('gulp-sourcemaps'),
// file watcher
    watch = require('gulp-watch'),
// minify js
    uglify = require('gulp-uglify'),
// Merge (interleave) a bunch of streams
    stream = require('merge-stream'),
// Concatenates files
    concat = require('gulp-concat');


var bower_components_js = [
    "bower_components/jquery/dist/jquery.min.js",
    "bower_components/bootstrap/dist/js/bootstrap.min.js"
];

var bower_components_css = [
    "bower_components/bootstrap/dist/css/bootstrap.min.css",
    "bower_components/font-awesome/css/font-awesome.min.css"
];

var bower_components_fonts = [
    "bower_components/font-awesome/fonts/*"
];


gulp.task('build-dev:html', function (callback) {
    return gulp.src('src/index.html')
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest('build-dev/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('build-dev:js', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(plumber())
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build-dev/js/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('build-dev:sass', function () {
    return gulp.src('src/sass/style.sass')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: bourbon.includePaths,
            errLogToConsole: true,
            sourceComments: 'map',
            // TODO: change path in comments
            sourceMap: 'sass',
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer({
            browsers: ['last 20 versions']
        }))
        // style.css
        .pipe(gulp.dest('build-dev/css/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('build-dev:img', function () {
    return gulp.src('src/img/*')
        .pipe(plumber())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest('build-dev/img/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('build-dev:fonts', function () {
    return gulp.src('src/fonts/*')
        .pipe(plumber())
        .pipe(gulp.dest('build-dev/fonts/'))
});

gulp.task('build-dev:bower', function () {
    var bowe_js = gulp.src(bower_components_js)
        .pipe(plumber())
        .pipe(concat('assets.js'))
        .pipe(gulp.dest('build-dev/js/'));
    var bower_css = gulp.src(bower_components_css)
        .pipe(plumber())
        .pipe(concat('assets.css'))
        .pipe(gulp.dest('build-dev/css/'));
    var bowe_fonts = gulp.src(bower_components_fonts)
        .pipe(plumber())
        .pipe(gulp.dest('build-dev/fonts/'));
    return stream(bowe_js, bower_css)
});

gulp.task('build-dev', [
    'build-dev:html',
    'build-dev:sass',
    'build-dev:js',
    'build-dev:img',
    'build-dev:fonts',
    'build-dev:bower'
]);