var http = require('http');

var port = process.env.PORT || 8090;

var app = http.createServer().listen(port, function () {
    console.log('Server listening on port ' + port);
});

var io = require('socket.io').listen(app);

var socketClients = [];
var socketAdmins = [];

io.on('connection', function (socket) {

    socket.on('new-user', function() {
        onNewUser(socket)
    });

    socket.on('new-admin', function() {
        onNewAdmin(socket)
    });

    socket.on('disconnect', function() {
        onDisconnect(socket)
    });

});

function onNewUser(socket) {
    socketClients.push(socket);
    updateAdmin();
}

function onNewAdmin(socket) {
    socketAdmins.push(socket);
}

function onDisconnect(socket) {
    var index = socketClients.indexOf(socket);
    if (index != -1) {
        socketClients.splice(index, 1);
        updateAdmin();
    }
}

function updateAdmin() {
    socketAdmins.forEach(function(socket) {
        io.to(socket.id).emit('update', {'nbClients':socketClients.length});
    })
}
