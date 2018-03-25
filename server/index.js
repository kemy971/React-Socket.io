var server = require('http').createServer();
var io = require('socket.io')(server);
var _ = require('underscore');

var port = process.env.PORT || 8090;
var socketClients = [];
var socketAdmins = [];

io.on('connection', function (socket) {

    socket.on('new-user', function(data) {
        onNewUser(socket, data.username);
    });

    socket.on('user-online', function() {
        updateUserStatus(socket, 'online');
    });

    socket.on('user-busy', function() {
        updateUserStatus(socket, 'busy');
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
        username,
        status: "online",
    });

    updateAdmin();
}

function updateUserStatus(socket, status) {
    var user = _.findWhere(socketClients, {id : socket.id});
    if (user) {
        user.status = status;
        updateAdmin();
    }
}

function onNewAdmin(socket) {
    socketAdmins.push(socket);
    io.to(socket.id).emit('update', {'datas': socketClients});
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

server.listen(port, function () {
    console.log(`Server listening on port ${port}`);
});
