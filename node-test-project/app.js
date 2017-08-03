var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var count = 0;

io.on('connection', function(socket){
  console.log('a user connected');
  count++;
  socket.emit("common","Active users " + count);
  socket.broadcast.emit('chat message',"One more user joined! Total : " + count);
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
	count--;
	var u = '';
	if(count == 1)
		u = '(everyone left!)';
	else u = ''; 
	socket.broadcast.emit('chat message',"A User left (" + count + " is/are active) " + u);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
