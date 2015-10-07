var gulp = require('gulp');
var gutil = require('gulp-util');
var markdown = require('gulp-markdown-to-json');
 
gulp.task('markdown', function(){
  gulp.src('./notes/*.md')
    .pipe(gutil.buffer())
    .pipe(markdown('notes.json'))
    .pipe(gulp.dest('.'))
});
