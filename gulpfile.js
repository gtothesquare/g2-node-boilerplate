var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	minifyCss = require('gulp-minify-css'),
	ghtmlSrc = require('gulp-html-src'),
	htmlreplace = require('gulp-html-replace'),
	flatten = require('gulp-flatten'),
	bower = require('gulp-bower'),
	CacheBuster = require('gulp-cachebust');

var cachebust = new CacheBuster();


var del = require('del'); // rm -rf

gulp.task('clean', function(cb) {
	del(['./build/', './public/'], cb);
});

/**** START copy and cache bust of assets from client to public ***/

gulp.task('copy-img', ['clean'], function () {
	return gulp.src(['./client/img/**/*.*'])
		.pipe(cachebust.resources())
		.pipe(gulp.dest('./public/img'));
});


/**** END copy and cache bust of assets from client to public ****/


gulp.task('copy-js', ['clean', 'bower'], function() {
	return gulp.src('./client/*.html')
		.pipe(ghtmlSrc()) // default is set to script
		// From this point, it's as if you'd used gulp.src() listing each of your
		// javascript files that are in your html as <script src="..."></script>
		.pipe(gulp.dest('./build/'));

});

gulp.task('uglify-js', ['jshint'], function () {
	return gulp.src(['./build/js/**/*.js','!./build/js/**/*.min.js'])
		.pipe(uglify())
		.pipe(gulp.dest('build/js'));
});

gulp.task('index-styles', ['clean'], function () {
	return gulp.src(['./client/css/app.css'])
		.pipe(concat('main.min.css'))
		.pipe(cachebust.resources())
		.pipe(minifyCss())
		.pipe(gulp.dest('./public/css/'));

});


gulp.task('jshint', ['copy-js'], function () {
	return gulp.src(['./build/js/**/*.js', '!./build/js/**/*.min.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('concat-js', ['uglify-js'], function () {

	return gulp.src([

		'./build/lib/**/*.min.js',
		'./build/js/app.js' ])
		.pipe(concat('main.min.js'))
		.pipe(cachebust.resources())
		.pipe(gulp.dest('./public/js'));

});

// here we replace all link and script tags with one respectively

gulp.task('copy-index-html', ['clean'], function () {
	return gulp.src('./client/index.html')
		.pipe(htmlreplace({
			js: 'js/main.min.js',
			css: 'css/main.min.css'
		}))
		.pipe(gulp.dest('./public/'));

});



// Here we define the tasks that will replace the non cache bust ref with the cache bust ones

gulp.task('update-rev-html', ['process-assets'], function () {
	return gulp.src(['./public/*.html'])
		.pipe(cachebust.references())
		.pipe(gulp.dest('./public'))
});

gulp.task('update-rev-css', ['process-assets'], function () {
	return gulp.src(['./public/css/*.css'])
		.pipe(cachebust.references())
		.pipe(gulp.dest('./public/css/'))
});

gulp.task('update-rev-js', ['process-assets'], function () {
	return gulp.src(['./public/js/*.js'])
		.pipe(cachebust.references())
		.pipe(gulp.dest('./public/js/'))
});


gulp.task('bower', ['clean'], function () {
	return bower()
		.pipe(gulp.dest('./client/lib/'));
});

gulp.task('update-revs', ['update-rev-html', 'update-rev-css', 'update-rev-js']);

gulp.task('copy-misc-assets', ['copy-index-html',  'copy-img']);

gulp.task('process-assets', ['concat-js', 'index-styles',  'copy-misc-assets']);

gulp.task('default', ['update-revs']);

gulp.task('heroku:production', ['default']);