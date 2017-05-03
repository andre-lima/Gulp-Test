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

//////////////Scripts task
//Uglifies
gulp.task('scripts', function () {
    gulp.src('js/*.js')
        .pipe(uglify())
        .on('error', treatError)
        .pipe(gulp.dest('build/js'));
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
    gulp.src('scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .on('error', treatError)
        .pipe(gulp.dest('build/css/'));
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
            baseDir: './'
        }
    });
    gulp.watch('js/*.js', ['watch:scripts']);
    gulp.watch('scss/*.scss', ['watch:styles']);
});
///////////////////

//Default task
gulp.task('default', ['watch:scripts', 'watch:styles', 'watch']);
///////////////////
