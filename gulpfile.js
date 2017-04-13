var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');
var config = {

  ngFiles : ['bower_components/angular/angular.min.js',
             'bower_components/angular-ui-router/release/angular-ui-router.min.js',
             'bower_components/angular-cookies/angular-cookies.min.js'],

  bootstrapJs: ['bower_components/jquery/dist/jquery.min.js',
                'bower_components/tether/dist/js/tether.min.js',
                'bower_components/bootstrap/dist/js/bootstrap.min.js'],

  bootstrapCss:'bower_components/bootstrap/dist/css/bootstrap.min.css'

}
var jsFiles = [...config.bootstrapJs, ...config.ngFiles]
var scripts = ['app/scripts/app.js', 'app/scripts/**/*.js', 'app/modules/**/*.js']

gulp.task('buildJsLib',function(){
  gulp.src(jsFiles)
  .pipe(concat('lib.min.js'))
  .pipe(gulp.dest('dist'))
})

gulp.task('buildScripts',function(){
  gulp.src(scripts)
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('dist',{overwrite:true}))
})

gulp.task('watch', function() {
  gulp.watch('app/**/*.js', ['buildScripts']);
});
