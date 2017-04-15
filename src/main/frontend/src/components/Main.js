import React from 'react';
import {Route, Router, browserHistory} from 'react-router';

import $ from 'jquery';

import InitialData from './InitialData';

import Navigation from './Navigation';
import LeftTab from './LeftTab';

class Main extends React.Component {

    constructor() {
        super();
        this.state = {
            users: InitialData.users,
            customers: InitialData.customers,
            orders: InitialData.orders
        };
        this.updateUsers = this.updateUsers.bind(this);
        this.updateCustomers = this.updateCustomers.bind(this);

        this.onAddUser = this.onAddUser.bind(this);
        this.onDeleteUser = this.onDeleteUser.bind(this);
        this.onAddCustomer = this.onAddCustomer.bind(this);

    }

    componentDidMount() {
        this.updateUsers();
        this.updateCustomers();
    }

    updateUsers() {
        $.get("/users", (data) => {
            this.setState({users: data})
        });

    }

    updateCustomers() {
        $.get("/customers", (data) => {
            this.setState({customers: data})
        });

    }

    onAddUser(login, password, role) {
        //   STUB
        // console.log("Add user");
        // let newUsers = this.state.users.slice();
        // newUsers.push({
        //     id: newUsers.length,
        //     login: login,
        //     password: password,
        //     role: role
        // });
        // this.setState({users: newUsers});

        $.ajax({
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "/users/add",
            data: JSON.stringify({login: login, password: password, role: role}),
            success: () => this.updateUsers(),
            error: () => this.updateUsers()
        });
    }

    onDeleteUser(id) {
      //    STUB
      //   console.log("Delete confirm" + id);
      //   let newUsers = this.state.users.slice();
      //   let index = newUsers.indexOf(newUsers.find(user => user.id === id));
      //   newUsers.splice(index, 1);
      //   this.setState({users: newUsers});

             $.post("/users/delete/" + id, null, () => this.updateUsers);
    }

    onAddCustomer(customerName, cellNumber, city, newPostOfficeNumber, balance, additionalInfo) {
        //STUB
        console.log("Add customer");

        // let newCustomers = this.state.customers.slice();
        // newCustomers.push({
        //     id: newCustomers.length,
        //     customerName: customerName,
        //     cellNumber: cellNumber,
        //     city: city,
        //     newPostOfficeNumber: newPostOfficeNumber,
        //     balance: balance,
        //     additionalInfo: additionalInfo,
        //     orders: []
        // });
        // this.setState({customers: newCustomers});

        $.ajax({
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "/customers/add",
            data: JSON.stringify({
                customerName: customerName,
                cellNumber: cellNumber,
                city: city,
                newPostOfficeNumber: newPostOfficeNumber,
                balance: balance,
                additionalInfo: additionalInfo,
            }),
            success: () => this.updateCustomers(),
            error: () => this.updateCustomers()
        });
    }

    render() {
        let LeftPanel = () => <LeftTab users={this.state.users}
                                       onAddUser={this.onAddUser}
                                       onDeleteUser={this.onDeleteUser}
                                       customers={this.state.customers}
                                       onAddCustomer={this.onAddCustomer}
                                       orders={this.state.orders}


        />;

        return (
            <div>
                <Navigation/>
                <Router history={browserHistory}>
                    <Route path="/" component={LeftPanel}/>
                </Router>

            </div>
        );
    }
}

export default Main;