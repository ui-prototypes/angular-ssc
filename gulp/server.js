'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

var node;

module.exports = function(options) {
  gulp.task('serve',['nodemon', 'watch'], function () {
  });

  gulp.task('exp',['nodemon', 'watch'], function () {
  });

  gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
      script: 'app.js'
    }).on('start', function onStart() {
      if (!called) {
        //cb();
      }
      called = true;

            
    }).on('restart', function onRestart(){

      setTimeout(function reload() {
      browserSync.reload({
        stream: false
      });
    }, 500);

    });    
  });
};
