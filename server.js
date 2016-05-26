

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var argv = require('yargs').argv;


var positions;
var currentI = 0;

fs.readFile(argv.f, 'utf8', function (err, data) {
  if (err) throw err;
  positions = JSON.parse(data);
  setInterval(function() {
    console.log(currentI);
    //console.log(positions[currentI]);
    io.emit('positions', positions[currentI]);
    currentI=(currentI+1)%positions.length;
  }, 1000);
});


app.get('/', function(req, res){
  res.sendfile('remote.html');
});


io.on('connection', function(socket){
  console.log("new socket!");
  // socket.on('chat message', function(msg){
  //   io.emit('chat message', msg);
  // });
  // socket.on('touch', function(msg){
  //   io.emit('touch', msg);
  // });
  // // socket.on('devicemotion', function(msg){
  // //   console.log(JSON.parse(msg));
  // // });
  // socket.on('deviceorientation', function(msg){
  //   io.emit('deviceorientation', msg);
  // });
});


http.listen(3001, function(){
  console.log('listening on *:3001');
});
