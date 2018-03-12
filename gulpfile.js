const gulp = require('gulp');

// liveload
const connect = require('gulp-connect');

// js minify
const uglify = require('gulp-uglify');

// sass -> css
const sass = require('gulp-ruby-sass');

// image minify
const smushit = require('gulp-smushit');

// html minify
const htmlmin = require('gulp-htmlmin');

const opts = {
  dist: './dist/',

  jsFiles: './src/js/*.js',
  distJs: './dist/js/',

  scssFiles: './src/scss/*.scss',
  distCss: './dist/css',

  imgFiles: './src/img/*.*',
  distImg: './dist/img/',

  htmlFiles: './src/html/*.html',
  distHtml: './',

  watchFiles: ['src/html/*.html', 'src/scss/*.scss', 'src/js/*.js', 'src/img/*.*'],
  watchTasks: ['js', 'sass', 'html'],
};

gulp.task('connect', () => {
  connect.server({
    port: 8001,
    livereload: true,
  });
});

gulp.task('js', () => {
  gulp.src(opts.jsFiles)
    .pipe(connect.reload())
    .pipe(uglify())
    .pipe(gulp.dest(opts.distJs));
});

gulp.task('sass', () => (
  sass(opts.scssFiles, {
    style: 'compressed',
  })
    .pipe(connect.reload())
    .pipe(gulp.dest(opts.distCss))
));

gulp.task('img', () => {
  gulp.src(opts.imgFiles)
    .pipe(connect.reload())
    .pipe(smushit({
      verbose: true,
    }))
    .pipe(gulp.dest(opts.distImg));
});

gulp.task('html', () => {
  gulp.src(opts.htmlFiles)
    .pipe(connect.reload())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(opts.distHtml));
});

gulp.task('watch', () => {
  gulp.watch(
    [opts.watchFiles],
    [opts.watchTasks],
  );
});

gulp.task('default', [...opts.watchTasks, 'connect', 'watch']);
