import React from 'react';
import {
    Panel,
    FormGroup,
    InputGroup,
    FormControl,
    Button,
    ControlLabel,
    Modal
} from 'react-bootstrap';
import Griddle from 'griddle-react';

const UsersPanel = React.createClass({

    getInitialState() {
        return {showModalAdd: false, showModalEdit: false, login: "", password: "", role: ""};
    },

    closeAdd() {
        this.setState({showModalAdd: false});
    },

    openAdd() {
        this.setState({showModalAdd: true});
    },

    closeEdit() {
        this.setState({showModalEdit: false});
    },

    onRowClick(row) {
        this.setState({showModalEdit: true, activeRow: row});
    },

    handleLoginChange(e) {
        this.setState({login: e.target.value});
    },

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    },

    handleRoleChange(e) {
        this.setState({role: e.target.value});
    },

    render() {

        let users = this.props.users;
        let buttonDisabled = this.state.login === "" || this.state.password === "" || this.state.role === "";
        return (
            <div>
                <Panel className="TablePanel">
                    <Button onClick={this.openAdd}>Add User</Button>
                    <Griddle results={users} tableClassName="UsersTable" showFilter={true} onRowClick={this.onRowClick}
                             showSettings={true}/>
                </Panel>

                <Modal show={this.state.showModalAdd} onHide={this.closeAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <InputGroup>
                                <div>
                                    <ControlLabel>Login</ControlLabel>
                                    <FormControl type="text"
                                                 value={this.state.login}
                                                 placeholder="Login"
                                                 onChange={this.handleLoginChange}/>

                                </div>
                                <div>
                                    <ControlLabel>Password</ControlLabel>
                                    <FormControl type="text"
                                                 value={this.state.password}
                                                 placeholder="Password"
                                                 onChange={this.handlePasswordChange}/>
                                </div>
                                <div>
                                    <ControlLabel>Role</ControlLabel>
                                    <FormControl type="text"
                                                 value={this.state.role}
                                                 placeholder="Role"
                                                 onChange={this.handleRoleChange}/>
                                </div>
                            </InputGroup>
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeAdd}>Close</Button>
                        <Button bsStyle="success" disabled={buttonDisabled} onClick={() => {
                            this.setState({login: "", password: "", role: ""});
                            this.props.onAddUser(this.state.login, this.state.password, this.state.role);
                            this.closeAdd();

                        }}>Add User</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showModalEdit} onHide={this.closeEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Are you sure you want to delete?</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeEdit}>Close</Button>
                        <Button bsStyle="danger" onClick={() => {
                            this.props.onDeleteUser(this.state.activeRow.props.data.id);
                            this.closeEdit();
                        }}>Delete User</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
});

export default UsersPanel;








