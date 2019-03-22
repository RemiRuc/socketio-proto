var app = require('express')()
var express = require('express')
var server = require('http').Server(app)

// All computer client
let computers = []

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/desktop/index.html');
    
}).get('/mobile', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/mobile/index.html');
})

app.use(express.static('public'))


let io = require('socket.io').listen(server)

io.sockets.on('connection', function (socket) {

    socket.emit("getRoom", {data: computers })

    socket.on('computerConnexion', function (id) {
        socket.serverId = id.id
        computers.push( socket.serverId.toString() )
        socket.join(socket.serverId.toString())
        socket.broadcast.emit('getRoom', {data: computers })
    })

    socket.on('askMobileConnexion', (code) => {
        let i = computers.indexOf( code )
        if (i > -1) {
            if (io.sockets.adapter.rooms[code].length < 2) {
                console.log(io.sockets.adapter.rooms[code].length)
                socket.clientId = code
                socket.join(code)
                io.sockets.to(code).emit('mobileConnected')
                console.log('connected')
                /** TO DO : SEND MESSAGE TO ROOM TO START THE EXP */
            } else {
                /** TO DO : ERROR MESSAGE */
            }
        }
    })

    socket.on('disconnect', () => {
        if (socket.serverId != undefined) { // Is computer
            let i = computers.indexOf( socket.serverId.toString() )
            if (i > -1) {
                socket.broadcast.to(computers[i]).emit('computerDisconnected')
                delete computers[i]
                socket.broadcast.emit('getRoom', {data: computers })
            }
        } else { // Is mobile
            socket.broadcast.to(socket.clientId).emit('mobileDisconnected')
        }
    })

    socket.on("change_page1", function(chg){
        io.sockets.to(socket.clientId).emit("change_page1", chg);
      })
  
      socket.on("change_page2", function(){
        io.sockets.to(socket.clientId).emit("change_page2");
      })
  
      socket.on("change_page3", function(){
        io.sockets.to(socket.clientId).emit("change_page3");
      })
  
      socket.on("animation", function(data){
        io.sockets.to(socket.clientId).emit("animation", data);
      })
  
      // Register "image" events, sent by the client
      socket.on("image", function(msg) {
        // Broadcast the "image" event to all other clients in the room
        socket.broadcast.to(socket.clientId).emit("image", msg);
      });

      socket.on("test2move", function(data) {
        socket.broadcast.to(socket.clientId).emit("test2move", data);
      });
});

server.listen(1337)