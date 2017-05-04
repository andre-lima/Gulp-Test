'use strict';

var CONFIG = {
    url: 'localhost:8080'
};

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var browsersync = require('browser-sync').create();

//Used to avoid Gulp closing when there's an error
function treatError(error) {
    console.log(error.toString());
    this.emit('end');
}

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
        .pipe(uglify())
        .on('error', treatError)
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
        .on('error', treatError)
        .pipe(gulp.dest('build/css'));
});

//After running 'styles' do a live reload
gulp.task('watch:styles', ['styles'], function (done) {
    browsersync.reload();
    done();
});
///////////////////

//Watch task
gulp.task('watch', function () {
    // Serve files from the root of this project
    browsersync.init({
        //proxy: CONFIG.url //*****DOESNT WORK*******
        server: {
            baseDir: './build/'
        }
    });
    gulp.watch('src/*.html', ['watch:html']);
    gulp.watch('src/js/*.js', ['watch:scripts']);
    gulp.watch('src/scss/*.scss', ['watch:styles']);
});
///////////////////

//Default task
gulp.task('default', ['watch:html', 'watch:scripts', 'watch:styles', 'watch']);
///////////////////
