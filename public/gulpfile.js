// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var minifyCss = require('gulp-minify-css');
//var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
// var csslint = require('gulp-csslint');

// gulp.task('css', function() {
//   gulp.src('css/*.css')
//     .pipe(csslint())
//     .pipe(csslint.reporter());
// });

// //Concatenate & Minify CSS
// gulp.task('minify-css', function() {
//   return gulp.src('css/*.css')
//     .pipe(concat('all.css'))
//     .pipe(gulp.dest('dist'))
//     .pipe(rename('all.min.css'))
//     .pipe(minifyCss({compatibility: 'ie8'}))
//     .pipe(gulp.dest('dist'))
//     .pipe(livereload());
// });

// Lint JS
gulp.task('lint', function() {
    return gulp.src(['js/*.js','!js/*.min.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['js/*.js','!js/*.min.js'])
        .pipe(rename(function (path) {
            path.basename += ".min";
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
    });

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    //gulp.watch('css/*.css', ['css']);
    //gulp.watch('css/*.css', ['minify-css']);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'watch']);