const gulp = require('gulp');

gulp.task('copy:all', function () {
    return gulp.src([
            'js/**',
            'src/assets/**',
        ])
        .pipe(gulp.dest('dist/assets'));
});