var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var autoprefixer = require('autoprefixer');
var csswring = require('csswring');
var uglify = require('gulp-uglify');

gulp.task('stylus', function(){
	var prefix = [autoprefixer];
	return gulp.src('stylus/butns.styl')
	.pipe(stylus())
	.pipe(postcss(prefix))
	.pipe(gulp.dest('dist/'));
});

gulp.task('minify', function(){
	var minify = [csswring];
	return gulp.src('dist/butns.css')
	.pipe(postcss(minify))
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('dist/'));
});

gulp.task('pug', function(){
	return gulp.src('demo/*.pug')
	.pipe(pug())
	.pipe(gulp.dest('demo/'));
});

gulp.task('uglify', function(){
	return gulp.src('demo/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('demo/jsmin/'));
});

gulp.task('demo-stylus', function(){
	var processors = [csswring, autoprefixer];
	return gulp.src('demo/stylus/*.styl')
	.pipe(stylus())
	.pipe(postcss(processors))
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('demo/css/'));
});

gulp.task('watch', function(){
	gulp.watch('stylus/butns.styl', ['stylus']);
	gulp.watch('dist/butns.css', ['minify']);
	gulp.watch('demo/*.pug', ['pug']);
	gulp.watch('demo/stylus/demo.styl', ['demo-stylus']);
	gulp.watch('demo/js/*.js', ['uglify']);
});

gulp.task('default', ['watch']);
