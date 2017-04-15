import React from 'react';
import {Tab, Row, Col, Nav, NavItem} from 'react-bootstrap';
import UsersPanel from './UsersPanel';
import CustomersPanel from './CustomersPanel';
import OrdersPanel from './OrdersPanel';


class LeftTab extends React.Component {
    render() {
        return (
            <Tab.Container id="left-tab" defaultActiveKey="first" className="LeftTab">
                <Row>
                    <Col sm={2}>
                        <Nav bsStyle="pills" stacked>
                            <NavItem eventKey="first" className="LeftTab__NavItem">
                                Orders
                            </NavItem>
                            <NavItem eventKey="second" className="LeftTab__NavItem">
                                Customers
                            </NavItem>
                            <NavItem eventKey="third" className="LeftTab__NavItem">
                                Users
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="first">
                                <OrdersPanel orders={this.props.orders}

                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <CustomersPanel customers={this.props.customers}
                                            onAddCustomer={this.props.onAddCustomer}

                                />                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <UsersPanel users={this.props.users}
                                            onAddUser={this.props.onAddUser}
                                            onDeleteUser={this.props.onDeleteUser}
                                />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                    <Col sm={1}>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
}

export default LeftTab;
