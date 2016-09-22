var gulp = require('gulp');
var del = require('del');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var mqpacker = require('css-mqpacker');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var flexibility = require('postcss-flexibility');

var sass = require('gulp-sass');
var bourbon = require('bourbon').includePaths;
var neat = require('bourbon-neat').includePaths;
var rename = require('gulp-rename');

var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');

var pug = require('gulp-pug');

var browserify = require( 'browserify' );
var source = require( 'vinyl-source-stream' );
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

var babel = require('gulp-babel');
var paths = {
    css: ['./*.css', '!*.min.css'],
    //icons: 'assets/images/svg-icons/*.svg',
    //images: ['assets/images/*', '!assets/images/*.svg'],
    sass: 'sass/**/*.scss',
    //concat_scripts: 'assets/scripts/concat/*.js',
    scripts: ['assets/scripts/*.js', '!assets/scripts/*.min.js', '!assets/scripts/customizer.js'],
    sprites: 'assets/images/sprites/*.png'
};


function handleErrors () {
	var args = Array.prototype.slice.call(arguments);

	notify.onError({
		title: 'Task Failed [<%= error.message %>',
		message: 'See console.',
		sound: 'Sosumi' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
	}).apply(this, args);

	gutil.beep(); // Beep 'sosumi' again

	// Prevent the 'watch' task from stopping
	this.emit('end');
}

/**
 * Compile Sass and run stylesheet through PostCSS.
 */
gulp.task('postcss', ['clean:styles'], function() {
    return gulp.src('sass/*.scss', paths.css)
	// Deal with errors.
    .pipe(plumber({ errorHandler: handleErrors }))
	// Wrap tasks in a sourcemap.
    .pipe(sourcemaps.init())
		// Compile Sass using LibSass.
        .pipe(sass({
            includePaths: [].concat(bourbon, neat),
            errLogToConsole: true,
            outputStyle: 'expanded' // Options: nested, expanded, compact, compressed
        }))
		// Parse with PostCSS plugins.
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 2 version','ie >= 9']
            }),
            mqpacker({
                sort: true
            }),
            flexibility(),
        ]))
	// Create sourcemap.
    .pipe(sourcemaps.write())
	// Create style.css.
    .pipe(gulp.dest('../app/css'))
    .pipe(browserSync.stream());
});

/**
 * Delete style.css and style.min.css before we minify and optimize
 */
gulp.task('clean:styles', function() {
    return del(['style.css', 'style.min.css'])
});

/**
 * Minify and optimize style.css.
 *
 */
gulp.task('cssnano', ['postcss'], function() {
    return gulp.src('../app/css/style.css')
    .pipe(plumber({ errorHandler: handleErrors }))
    .pipe(cssnano({
        safe: true // Use safe optimizations
    }))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('../app/css'))
    .pipe(browserSync.stream());
});


// Compile pug to HTML
gulp.task('pug', function() {
  return gulp.src('html/module/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('../app'));
});

gulp.task('styles', ['cssnano']);

gulp.task( 'transform-runtime', function(){
    return browserify({
        entries:"src/js/es6.js",
        debug:true
    })
    .transform( "babelify", { presets:["es2015"],plugins: ['babel-polyfill'] } )
    .bundle()
    .pipe( source('es6.js') )
    .pipe(buffer())
    .pipe(uglify())
    .pipe( gulp.dest('../app/js') );
});

gulp.task('js', () =>
    gulp.src('src/js/es6.js')
        .pipe(babel({
            presets: ['es2015'],
            plugins: ['babel-polyfill']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('../app/js'))
);

/**
 * Process tasks and reload browsers on file changes.
 *
 * https://www.npmjs.com/package/browser-sync
 */
gulp.task('watch', function() {

    browserSync.init({
        server: {
            baseDir: "../app"
        }
    });

    // Run tasks when files change.
    gulp.watch(['html/**/*.pug'], ['pug']);
    gulp.watch('../app/*.html').on('change', browserSync.reload);
    gulp.watch(paths.sass, ['styles']);
    //gulp.watch(paths.scripts, ['scripts']);
    //gulp.watch(paths.concat_scripts, ['scripts']);
});
