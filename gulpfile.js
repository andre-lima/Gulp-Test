var gulp = require('gulp'),
    uglify = require('gulp-uglify');

gulp.task('default',function () {
      return gulp.src('js/*.js')
        .pipe(uglify().on('error', function(e){
            console.log(e);
         }))
        .pipe(gulp.dest('minjs'));
  });