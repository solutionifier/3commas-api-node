var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');

function compile(done, watch) {
  let b = browserify('./index.js', { debug: true })
  b.require('./index.js', {expose: '3commas-api-node'})

  var bundler = watchify(b.transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
      done();
    });
  }

  rebundle();
  done();
}

function watch(done) {
  compile(done, true);
  done();
}

exports.build = compile;
exports.watch = watch;
exports.default = watch;
