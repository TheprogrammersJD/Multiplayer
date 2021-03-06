
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var clickx = [];
var clicky = [];

//var socketID = Math.round((Math.random() * 10000))*Math.round(Math.random() * 10);

var playersx = [];
var playersy = [];
var playersonline = 0;
var clients = [];

var mapsize;

app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  playersonline++;
  playersx.push(0);
  playersy.push(0);
  //clients.push(socket.id);
  //socket.emit("playerposition", player);
    
  socket.on('sid', function(socketID){
	clients.push(socketID);
	socket.emit('playerposition', playersx[clients.indexOf(socketID)], playersy[clients.indexOf(socketID]);
  });
	
  for(var n = 0; n < clickx.length; n++){
		socket.emit('click', clickx[n], clicky[n]);
  }
	
  socket.on('disconnect', function(){
    console.log('user disconnected');
    playersonline--;
  });
	
  socket.on('click', function(x, y){
    console.log('Somebody clicked at: ' + x + ", " + y);
	clickx.push(x);
	clicky.push(y);
	socket.broadcast.emit('click', x, y);
  });

	
  socket.on('left', function(socketID){
	playersx[clients.indexOf(socketID)] += 1;
	socket.emit('left', socketID, playersx[clients.indexOf(socketID)], playersy[clients.indexOf(socketID)]);
  });
 
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
