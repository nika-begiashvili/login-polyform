var gulp = require('gulp'),
	bs = require('browser-sync').create(),
	bg = require("gulp-bg"),
	ps = require('ps-node');

var POLYSERVE_PORT = 8080;

var browserSyncConfig = function(path, cb) {
  bs.init({
    proxy: 'localhost:' + POLYSERVE_PORT,
    startPath: path
  });

  bs.reload;

  process.on('exit', function() {
    bs.exit();
  });
};

var watchComponent = function() {
  gulp.watch(['./*.html', 'demo/**/*.html', 'test/**/*.html'], bs.reload);
};

gulp.task('polyserve', function(cb) {
  ps.lookup({
    command: 'polyserve',
    psargs: '-f'
  }, function(err, resultList) {
    if (err) {
      throw new Error(err);
    }
 
    if (!resultList.length) {
      bg('polyserve', '-p ' + POLYSERVE_PORT)();
    }
    cb();
  }); 
});
	
gulp.task('serve', ['polyserve'], function(cb) {
  browserSyncConfig('/components/login-form/demo/', cb);
  watchComponent();
});

gulp.task('serve:doc', ['polyserve'], function(cb) {
  browserSyncConfig('/components/login-form/', cb);
  watchComponent();
});

gulp.task('test:watch', ['polyserve'], function(cb) {
  browserSyncConfig('/components/login-form/test/', cb);
  watchComponent();
});