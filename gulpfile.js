// Include gulp
var gulp = require('gulp');

// Include plugins
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');
var cache        = require('gulp-cache');
var cached       = require('gulp-cached');
var imagemin     = require('gulp-imagemin');
var sass         = require('gulp-ruby-sass');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');
var autoprefixer = require('gulp-autoprefixer');
var stripDebug   = require('gulp-strip-debug');

// Paths
var PATH_DEV   = 'dev/';
var PATH_BUILD = 'build/';

// Lint dev Javascript
gulp.task('lint', function() {
    return gulp.src([ PATH_DEV + 'scripts/**/*.js',
                      '!' + PATH_DEV + 'scripts/vendor/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

// Build & Minify scripts
gulp.task('scripts', ['lint'], function() {
    return gulp.src([ PATH_DEV + 'scripts/modules/ui.js',
                    PATH_DEV + 'scripts/modules/player.js',
                    PATH_DEV + 'scripts/modules/game.js',
                    PATH_DEV + 'scripts/main.js'])
        // .pipe(cached(''))
        // .pipe(stripDebug()) 
        // .pipe(uglify())
        .pipe(concat({ path: 'main.min.js', stat: { mode: 0666 }}))
        .pipe(gulp.dest(PATH_BUILD + 'scripts/'));
});

// Clear cache
gulp.task('cache', function() {
    cached.caches = {};
});

// Clear cache and force scripts rebuild
gulp.task('flush', ['cache', 'scripts']);

// Build & Minify CSS
gulp.task('sass', function() {
    return sass(PATH_DEV + 'styles/main.scss', {style: 'compressed'})
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(PATH_BUILD + 'styles'));
});

// Minify images
 gulp.task('images', function() {
    return gulp.src(PATH_DEV + 'images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest(PATH_BUILD + 'images'));
});

// Watch for changes
gulp.task('watch', function() {
    // Watch .js files
    gulp.watch(PATH_DEV + 'scripts/**/*.js', ['scripts']);
    // Watch .scss files
    gulp.watch(PATH_DEV + 'styles/**/*.scss', ['sass']);
    // Watch image files
    gulp.watch(PATH_DEV + 'images/**/*', ['images']);
 });

// Default Task
gulp.task('default', [ 'scripts', 'sass', 'images' ]);