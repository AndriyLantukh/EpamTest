import React from 'react';
import {Route, Router, browserHistory} from 'react-router';



import Navigation from './Navigation';
import Message from './Message';

class Main extends React.Component {

    constructor() {
        super();

        this.onSend = this.onSend.bind(this);


    }

    componentDidMount() {

    }

    onSend() {
        //   STUB
        // console.log("Send");
        // let newUsers = this.state.users.slice();
        // newUsers.push({
        //     id: newUsers.length,
        //     login: login,
        //     password: password,
        //     role: role
        // });
        // this.setState({users: newUsers});

        // $.ajax({
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json"
        //     },
        //     type: "POST",
        //     url: "/message",
        //     data: JSON.stringify({login: login, password: password, role: role}),
        //     success: () => this.updateUsers(),
        //     error: () => this.updateUsers()
        // });
    }



    render() {
        let Message = <Message/>;

        return (
            <div>
                <Navigation/>
                <Router history={browserHistory}>
                    <Route path="/" component={Message}/>
                </Router>

            </div>
        );
    }
}

export default Main;