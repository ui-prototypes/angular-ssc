'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var middleware = require('./proxy');
var spawn = require('child_process').spawn;

var node;
var http    = require('http');
var express = require('express');
var logger  = require('morgan');
var path = require('path');



module.exports = function(options) {

  function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if(baseDir === options.src || (util.isArray(baseDir) && baseDir.indexOf(options.src) !== -1)) {
      routes = {
        '/bower_components': 'bower_components'
      };
    }

    var server = {
      baseDir: baseDir,
      routes: routes
    };

    if(middleware.length > 0) {
      server.middleware = middleware;
    }

    browserSync.instance = browserSync.init({
      startPath: '/',
      server: server,
      browser: browser
    });


  }

  browserSync.use(browserSyncSpa({
    selector: '[ng-app]'// Only needed for angular apps
  }));

  gulp.task('serve', ['watch'], function () {
    //browserSyncInit([options.tmp + '/serve', options.src], ['google chrome', 'firefox']);
    browserSyncInit([options.tmp + '/serve', options.src]);
  });

  gulp.task('serve:dist', ['build'], function () {
    browserSyncInit(options.dist);
  });

  gulp.task('serve:e2e', ['inject'], function () {
    browserSyncInit([options.tmp + '/serve', options.src], []);
  });

  gulp.task('serve:e2e-dist', ['build'], function () {
    browserSyncInit(options.dist, []);
  });
//Try to integrate express server 

  gulp.task('express', ['watch'], function(callback){

    if ( node ) {
      console.log('Restarting application server...');
      node.kill();
    } else {
      process.on('exit',function() {
        node.kill();
      });
    }
    node  = spawn('node',['app.js'],{stdio:'inherit'});
    node.on('close',function(code) {
      if ( code === 8 ) {
        console.log('Error detected, waiting for changes...');
      }
    });
    callback();
  });

  gulp.task('exp', ['browser-sync'], function () {
  });

  gulp.task('browser-sync', ['nodemon', 'watch'],function() {
    browserSync.instance = browserSync.init({
        proxy: "http://localhost:3000/",
        //port: 7000,
        browser: ['google chrome', 'firefox']
    });
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
