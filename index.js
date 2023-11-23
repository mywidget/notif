const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const hostname = '0.0.0.0';
const port = 8443;

// app.get('/', (req, res) => {
	// res.send('<h1>Hello world</h1>');
// });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on("connection", function (socket) {
	socket.on('data_masuk', (data) => {
		io.emit('data_masuk', data)
	})
	socket.on('load_antrian', (data) => {
        io.emit('load_antrian', data)
	})
		 
	socket.on('data_refresh', (data) => {
        io.emit('data_refresh', data)
	})
	socket.on('start_kbm', (data) => {
        io.emit('start_kbm', data)
	})
	socket.on('stop_kbm', (data) => {
        io.emit('stop_kbm', data)
	})
	socket.on('reload_monitoring', (data) => {
        io.emit('reload_monitoring', data)
	})
	
	socket.on('logout', (data) => {
        io.emit('logout', data)
	})
	
	socket.on('reset', (data) => {
        io.emit('reset', data)
	})
	
    socket.on('data_masuk', (data) => {
        socket.broadcast.emit("reload",data);
	})
	socket.on('load_antrian', (data) => {
        socket.broadcast.emit("panggil",data);
	})
	socket.on('panggil_antrian', (data) => {
        socket.broadcast.emit("panggil_antrian",data);
	})
	socket.on('disable_button', (data) => {
        socket.broadcast.emit("disable_button",data);
	})
	socket.on('enable_button', (data) => {
        socket.broadcast.emit("enable_button",data);
	})
	socket.on('reload_nomor', (data) => {
        socket.broadcast.emit("reload_nomor",data);
	})
	socket.on('data_refresh', (data) => {
        socket.broadcast.emit("refresh",data);
	})
	
    socket.on('monitor', () => {
        socket.broadcast.emit("monitor");
	}) 
    socket.on('buka', () => {
        socket.broadcast.emit("buka");
	})    
    socket.on('ambil', () => {
        socket.broadcast.emit("ambil");
	})
    socket.on('bukat', () => {
        socket.broadcast.emit("bukat");
	})
    socket.on('hapus', () => {
        socket.broadcast.emit("hapus");
	})
    socket.on('lock', () => {
        socket.broadcast.emit("lock");
	})
    socket.on('teredit', () => {
        socket.broadcast.emit("teredit");
	})
    socket.on('lunas', () => {
        socket.broadcast.emit("lunas");
	})
    socket.on('terbuka', () => {
        socket.broadcast.emit("terbuka");
	})
    socket.on('gagal', (data) => {
        socket.broadcast.emit("gagal",data);
	})
    
    socket.on('global', (data) => {
        socket.broadcast.emit("global",data);
	})
});

// server.listen(5000, () => {
	// console.log('listening on *:5000');
// });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// server.listen(5000,'0.0.0.0', () => {
// console.log('Server listening on 0.0.0.0:5000');
// });