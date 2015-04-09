//var request = require('supertest');
var request = require('superagent');
require('superagent-csrf')(request);
var token = connect.csrf();
var agent;
/*
var req = request('http://sv-cs35.lab.nbttech.com').post('/login')
    //agent.attachCookies(req);
    req.send({my: 'JSON'});
    var csrfToken = (/XSRF-TOKEN=(.*?);/.exec(req.cookies)[1]);
    req.set('X-XSRF-TOKEN', unescape(csrfToken));
    req.end(function(err, result){
      expect(res.status).to.eql(200);
      done();
    });

*/
var csrfToken = (/XSRF-TOKEN=(.*?);/.exec(req.cookies)[1]);
  var r = request
   .post('http://sv-cs35.lab.nbttech.com/login')
   .send({ name: 'Manny', species: 'cat' })
   .set('X-API-Key', 'foobar')
   .csrf(token)
   .set('Accept', 'application/json')
   .end(function(err, res){
     if (res.ok) {
       console.log('yay got ' + JSON.stringify(res.body));
     } else {
       console.log('Oh no! error ' + res.text);
     }
   });