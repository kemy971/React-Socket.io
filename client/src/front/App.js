import React from 'react'
import io from 'socket.io-client'

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            isLogged: false,
        };
    }
    
    login = () => {
        const username = this.input.value;
        this.setState({username}, () => {
            this.socket = io.connect("http://localhost:8090");
            this.socket.emit('new-user', {username});
            window.addEventListener('focus', () => {
                this.socket.emit('user-online');
            });

            window.addEventListener('blur', () => {
                this.socket.emit('user-busy');
            });

            this.setState({isLogged: true});
        })
    }

    logout = () => {
        this.socket.close();
        this.setState({username: '', isLogged: false});
    }

    render() {
        const { isLogged, username } = this.state;
        return (
            !isLogged ?
            <div>
                <input defaultValue={username} ref={_input => this.input = _input} />
                <br/>
                <button onClick={this.login}>Login !</button>
            </div> :
            <div>
                <h3>{`${username}, logged !`}</h3>
                <button onClick={this.logout}>logout</button>
            </div>


        );
    }
}