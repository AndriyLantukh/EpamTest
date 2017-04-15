import React from 'react';
import {Navbar} from 'react-bootstrap';

class Navigation extends React.Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">GSS</a>
                    </Navbar.Brand>
                </Navbar.Header>
            </Navbar>
        );
    }
}

export default Navigation;