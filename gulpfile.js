var gulp = require('gulp');  
var nodemon = require('gulp-nodemon');  
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');  
var jshint = require('gulp-jshint');  
var livereload = require('gulp-livereload'); 
var sourcemaps = require('gulp-sourcemaps'); 
var sassdoc = require('sassdoc');

// ... variables
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var sassdocOptions = {
  dest: './public/sassdoc'
};


gulp.task('styles', function() {  
  return gulp.src('app/src/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(sassdoc(sassdocOptions))
    .pipe(livereload());
});

gulp.task('scripts', function() {  
  return gulp.src('public/javascripts/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(livereload());
});

gulp.task('ejs',function(){  
    return gulp.src('views/**/*.ejs')
    .pipe(livereload());
});

gulp.task('watch', function() {  
    livereload.listen();
    gulp.watch('app/src/sass/**/*.scss', ['styles']);
    gulp.watch('public/javascripts/*.js', ['scripts']);
    gulp.watch('views/**/*.ejs', ['ejs']);
});

gulp.task('server',function(){  
    nodemon({
        'script': 'bin/www',
        'ignore': 'public/js/*.js'
    });
});

gulp.task('serve', ['server','watch']); 

