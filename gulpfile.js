const gulp = require('gulp');

const gulpUtil = require('gulp-util');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const jade = require('gulp-jade');
const babel = require('gulp-babel');

const paths = {
  sass: ['**/*.sass', '**/*.scss', '!node_modules/**'],
  jade: ['**/*.jade', '!node_modules/**'],
  babel: ['**/*.babel', '!node_modules/**']
};

function errorHandler (error) {
  gulpUtil.log(gulpUtil.colors.red(error.message));
  this.emit('end');
}

gulp.task('default', ['sass', 'jade', 'babel']);

gulp.task('sass', () => {
  return gulp.src(paths.sass)
    .pipe(sass())
    .on('error', errorHandler)
    .pipe(autoprefixer())
    .on('error', errorHandler)
    .pipe(gulp.dest('.'));
});

gulp.task('jade', () => {
  return gulp.src(paths.jade)
    .pipe(jade())
    .on('error', errorHandler)
    .pipe(gulp.dest('.'));
});

gulp.task('babel', () => {
  return gulp.src(paths.babel)
    .pipe(babel({
      presets: ['es2015']
    }))
    .on('error', errorHandler)
    .pipe(gulp.dest('.'));
});

gulp.task('watch', () => {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.babel, ['babel']);
});
