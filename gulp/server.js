'use strict';

var gulp = require('gulp');

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
  /*
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


  gulp.task('server', function() {

  var server = express();

  // log all requests to the console
  server.use(logger('dev'));
  server.use(express.static(options.tmp + '/serve'));
  
  server.use(express.static('/.tmp/serve'));
  server.use(express.static('/bower_components'));
  server.use(express.static('/src'));


  // Serve index.html for all routes to leave routing up to Angular
  server.all('/*', function(req, res) {
      res.sendFile('index.html');
  });

  // Start webserver if not already running
  var s = http.createServer(server);
  s.on('error', function(err){
    if(err.code === 'EADDRINUSE'){
      gutil.log('Development server is already started at port 3000' );
    }
    else {
      throw err;
    }
  });

  s.listen(3000);

});*/
};
