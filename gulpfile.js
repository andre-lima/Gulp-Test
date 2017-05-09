'use strict';

var CONFIG = {
    url: 'localhost:8080'
};

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var imagemin = require('gulp-imagemin');
var prefix = require('gulp-autoprefixer');
var browsersync = require('browser-sync').create();
var notify = require("gulp-notify");


//////////////Html task
//Moves html
gulp.task('html', function () {
    gulp.src('src/index.html')
        .pipe(gulp.dest('build'));
});

//After running 'scripts' do a live reload
gulp.task('watch:html', ['html'], function (done) {
    browsersync.reload();
    done();
});
////////////////////////

//////////////Scripts task
//Uglifies
gulp.task('scripts', function () {
    gulp.src('src/**/*.js')
        /*.pipe(babel({
            presets: ['es2015']
        }))*/
        .pipe(uglify())
        .on('error', notify.onError('Error: <%= error.message %>'))
        .pipe(gulp.dest('build'));
});

//After running 'scripts' do a live reload
gulp.task('watch:scripts', ['scripts'], function (done) {
    browsersync.reload();
    done();
});
////////////////////////

/////////////Styles task
//Compile sass
gulp.task('styles', function () {
    gulp.src('src/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .on('error', notify.onError('Error: <%= error.message %>'))
        .pipe(prefix('last 2 versions'))
        .pipe(gulp.dest('build/css'));
});

//After running 'styles' do a live reload
gulp.task('watch:styles', ['styles'], function (done) {
    browsersync.reload();
    done();
});
///////////////////

/////////////Image task
//Compile sass
gulp.task('image', function () {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
});

//After running 'styles' do a live reload
gulp.task('watch:image', ['image'], function (done) {
    browsersync.reload();
    done();
});
///////////////////

//Watch task
gulp.task('watch', function () {
    // Serve files from the root of this project
    browsersync.init({
        proxy: CONFIG.url //Needs dev server to work
        //server: {
        //    baseDir: './build/'
        //}
    });
    gulp.watch('src/*.html', ['watch:html']);
    gulp.watch('src/js/*.js', ['watch:scripts']);
    gulp.watch('src/scss/*.scss', ['watch:styles']);
    gulp.watch('src/images/*', ['watch:image']);
});
///////////////////

//Default task
gulp.task('default', [
    'watch:html',
    'watch:scripts',
    'watch:styles',
    'watch:image',
    'watch'
]);
///////////////////
