var http = require('http');
var _ = require('underscore');

var port = process.env.PORT || 8090;

var app = http.createServer().listen(port, function () {
    console.log('Server listening on port ' + port);
});

var io = require('socket.io').listen(app);

var socketClients = [];
var socketAdmins = [];

io.on('connection', function (socket) {

    socket.on('new-user', function(data) {
        onNewUser(socket, data.username);
    });

    socket.on('user-online', function() {
        var user = _.findWhere(socketClients, {id : socket.id});
        user.status = 'online';
    });

    socket.on('new-admin', function() {
        onNewAdmin(socket);
    });

    socket.on('disconnect', function() {
        onDisconnect(socket);
    });

});

function onNewUser(socket, username) {
    socketClients.push({
        id: socket.id,
        socket,
        username,
        status: "online",
    });

    updateAdmin();
}

function onNewAdmin(socket) {
    socketAdmins.push(socket);
}

function onDisconnect(socket) {
    var index = _.findIndex(socketClients, { id : socket.id });
    if (index != -1) {
        socketClients.splice(index, 1);
        updateAdmin();
    }
}

function updateAdmin() {
    socketAdmins.forEach(function(socket) {
        io.to(socket.id).emit('update', {'datas': socketClients});
    })
}
