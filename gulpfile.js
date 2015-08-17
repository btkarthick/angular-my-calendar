'use strict';

var gulp = require('gulp'),

$ = require('gulp-load-plugins')(),

browserSync = require('browser-sync').create(),

reload = browserSync.reload;



// Lint JavaScript
gulp.task('jshint', function () {
	
  return gulp.src('./mycal/**/*.js')
  
  	.pipe(reload({stream: true, once: true}))
  
    .pipe($.jshint())
    
	.pipe($.jshint.reporter('jshint-stylish'));
  
    
});





// Sass compile using gulp-sass in turn node-sass

gulp.task('styles', function (){
	
	
	return gulp.src(['sass_files/**/*.scss'])
	
			.pipe($.plumber({
			
								errorHandler : function(error){

									console.log(error.message);
									this.emit('end');
								}
				            }))
		
			.pipe($.sourcemaps.init())		
	
			.pipe(
		
					$.sass({
							  outputStyle: 'compact',
							  precision: 10
							})
				 )
	
			.pipe($.sourcemaps.write('./'))
	
			.pipe(gulp.dest('./css'))
	
			.pipe(browserSync.stream( {match: '**/*.css'} ));
});


// Browser sync

gulp.task('serve', ['styles'] , function(){
	
	browserSync.init({
        
		
		server: { baseDir: "./"  },
		
		logPrefix: 'MYCALANG',
		
		notify : true ,
		
		open: true

    });
	
	
	gulp.watch('sass_files/**/*.scss', ['styles']);
	
	gulp.watch('./mycal/**/*.js', ['jshint']);
	
    gulp.watch('*.html').on('change', reload);
	
	
});


gulp.task('default', ['styles', 'serve']);