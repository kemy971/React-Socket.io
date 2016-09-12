import React from 'react'
import io from 'socket.io-client'

export default class App extends React.Component {

    constructor(){
        super();
        this.state = {
            nbConnectedUsers: 0
        }
    }
    
    componentDidMount() {
        var socket = io.connect("http://localhost:8090");
        socket.emit('new-admin');
        socket.on('update',(data) => {
            this.updateData(data)
        })
    }

    updateData(data) {
        this.setState({nbConnectedUsers:data.nbClients})
    }
    
    render() {
        return (<h1>Connected Users : {this.state.nbConnectedUsers}</h1>);
    }
}