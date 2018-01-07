'use strict';

const drizzle = require('drizzle-builder');
const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');
const helpers = require('@cloudfour/hbs-helpers');
const tasks = require('@cloudfour/gulp-tasks');
const env = require('gulp-util').env;
const config = require('./config');

const sass = require('gulp-sass');
const shorthand = require('gulp-shorthand');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css')

var svgSprite = require('gulp-svg-sprite');

// Append config
Object.assign(config.drizzle, { helpers });

// Register core tasks
[
  'clean',
  'copy',
  'js',
  'serve',
  'watch'
].forEach(name => tasks[name](gulp, config[name]));

// Register special CSS tasks
//tasks.css(gulp, config['css:toolkit']);
tasks.css(gulp, config['css:drizzle']);
gulp.task('css', ['css:drizzle']);

// Register Drizzle builder task
gulp.task('drizzle', () => {
  const result = drizzle(config.drizzle);
  return result;
});

gulp.task('sass:dev', function () {
  return gulp.src('./src/assets/toolkit/styles/toolkit.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets/toolkit/styles/'));
});

gulp.task('sass:dist', function () {
  return gulp.src('./src/assets/toolkit/styles/toolkit.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(shorthand())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/assets/toolkit/styles/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/assets/toolkit/styles/**/*.scss', ['sass:dev']);
});

var spriteConfig		= {
    shape				: {
        dimension		: {			// Set maximum dimensions
            maxWidth	: 32,
            maxHeight	: 32
        },
        spacing			: {			// Add padding
            padding		: 0
        }
    },
    mode				: {
        symbol			:{
            render		: {
                scss	: true,
                json    :{
                    dest: "../../../../../data/icons",
                    template: "./src/assets/toolkit/icons/icons-template.json",
                }
                }
        }
    }
};

gulp.task('iconSprites', function () {
    return gulp.src('*.svg', {cwd: './src/assets/toolkit/icons/src'})
    .pipe(svgSprite(spriteConfig))
    .pipe(gulp.dest('./src/assets/toolkit/icons/dist'))
});

gulp.task('copySprite',['iconSprites'], function(){
     return gulp.src('./src/assets/toolkit/icons/dist/symbol/svg/*.svg')
    .pipe(gulp.dest('./dist/assets/toolkit/svg'));
});



// Register frontend composite task
gulp.task('frontend:dev', [
  'drizzle',
  'copy',
  'css',
  'js',
  'sass:dev',
  'sass:watch',
  'iconSprites',
  'copySprite'
]);


gulp.task('frontend:dist', [
  'drizzle',
  'copy',
  'css',
  'js',
  'sass:dist'
]);

// Register build task (for continuous deployment via Netflify)
gulp.task('build', ['clean'], done => {
  gulp.start('frontend:dist');
  done();
});

/**
 * Register demo task (deploy output to GitHub Pages)
 * NOTE: Run this after building.
 */
gulp.task('demo', () => {
  const buildDest = `${config.drizzle.dest.pages}/**/*`;
  return gulp.src(buildDest)
    .pipe(ghPages({
      cacheDir: 'demo'
    }));
});



// Register default task
gulp.task('default', ['frontend:dev'], done => {
  gulp.start('serve');
  if (env.dev) {
    gulp.start('watch');
  }
  done();
});
