import React from 'react'

export default class App extends React.Component {
    
    componentDidMount() {
        var socket = io.connect("127.0.0.1:8080");
        socket.emit('new-client');
    }
    
    render() {
        return (<h1>Hello</h1>);
    }
}