var http = require('http');

var port = process.env.PORT || 8080;

var app = http.createServer().listen(port, function () {
    console.log('Server listening on port ' + port);
});

var io = require('socket.io').listen(app);

var socketClients = [];
var socketAdmins = [];

io.on('connection', function (socket) {
    
    socket.on('new-user', onNewUser);

    socket.on('new-admin', onNewAdmin);

    socket.on('disconnect', onDisconnect);

});

function onNewUser(socket) {
    socketClients.push(socket);
    console.log(socketClients.length+" clients connected !");
}

function onNewAdmin(socket) {
    socketAdmins.push(socket);
}

function onDisconnect(socket) {
    var index = socketClients.indexOf(socket);
    if (index != -1) {
        socketClients.splice(index, 1);
        console.info('Client gone (id=' + socket.id + ').');
    }
}
