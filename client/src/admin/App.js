import React from 'react'
import io from 'socket.io-client'

export default class App extends React.Component {

    constructor(){
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        var socket = io.connect("http://127.0.0.1:8090");
        socket.emit('new-admin');
        socket.on('update',(resp) => {
            console.log(resp.datas);
            this.updateData(resp.datas)
        })
    }

    updateData(data) {
        this.setState({users: data})
    }

    render() {
        const { users } = this.state;
        return (
            <div>
                <h1>Connected Users : {users.length}</h1>
                <table>
                    <tbody>
                { users.map(user => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.status}</td>
                    </tr>
                )) }
                </tbody>
                </table>
            </div>
        );
    }
}