import React from 'react'
import io from 'socket.io-client'

export default class App extends React.Component {
    
    componentDidMount() {
        var socket = io.connect("http://localhost:8090");
        socket.emit('new-user');
    }
    
    render() {
        return (<h1>Hello</h1>);
    }
}