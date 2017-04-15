import React from 'react';
import {
    Panel,
    FormGroup,
    FormControl,
    Button,
    ControlLabel,
    Modal,
    Form,
    Col
} from 'react-bootstrap';
import Griddle from 'griddle-react';

const CustomersPanel = React.createClass({


    getInitialState() {
        return {
            showModalAdd: false, showModalEdit: false,
            customerName: "",
            cellNumber: "",
            city: "",
            newPostOfficeNumber: "",
            balance: 0,
            additionalInfo: ""
        };
    },

    closeAdd() {

        this.setState({showModalAdd: false});
    },

    openAdd() {
        var state = this.getInitialState();
        state.showModalAdd = true;
        this.setState(state);
    },

    closeEdit() {
        this.setState({showModalEdit: false});
    },

    onRowClick(row) {
        this.setState({showModalEdit: true, activeRow: row});
    },

    handleNameChange(e) {
        this.setState({customerName: e.target.value});
    },

    handleCellNumberChange(e) {
        this.setState({cellNumber: e.target.value});
    },

    handleCityChange(e) {
        this.setState({city: e.target.value});
    },

    handleNewPostOfficeNumberChange(e) {
        this.setState({newPostOfficeNumber: e.target.value});
    },

    handleBalanceChange(e) {
        this.setState({balance: e.target.value});
    },

    handleAdditionalInfoChange(e) {
        this.setState({additionalInfo: e.target.value});
    },

    render() {

        let customers = this.props.customers;
        let buttonDisabled = this.state.customerName === "" || this.state.cellNumber === "" || this.state.city === "";

        let ModalBody = () => {
            if (this.state.activeRow != null) {
                let activeRow = this.state.activeRow;

                return <Form horizontal>
                    <FormGroup controlId="EditCustomerFormId">
                        <Col componentClass={ControlLabel} sm={4}>
                            ID
                        </Col>
                        <Col sm={8}>
                            <FormControl
                                readOnly
                                type="text"
                                value={activeRow.props.data.id}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="EditCustomerFormName">
                        <Col componentClass={ControlLabel} sm={4}>
                            Customer name
                        </Col>
                        <Col sm={8}>
                            <FormControl
                                readOnly
                                type="text"
                                value={activeRow.props.data.customerName}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="EditCustomerFormPhoneNumber">
                        <Col componentClass={ControlLabel} sm={4}>
                            Phone number
                        </Col>
                        <Col sm={8}>
                            <FormControl
                                type="text"
                                value={activeRow.props.data.cellNumber}
                                onChange={this.handleCellNumberChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="EditCustomerFormCity">
                        <Col componentClass={ControlLabel} sm={4}>
                            City
                        </Col>
                        <Col sm={8}>
                            <FormControl
                                type="text"
                                value={activeRow.props.data.city}
                                //         onChange={props.handleCityChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="EditCustomerFormNewPostOfficeNumber">
                        <Col componentClass={ControlLabel} sm={4}>
                            NewPost Office Number
                        </Col>
                        <Col sm={8}>
                            <FormControl
                                type="text"
                                value={activeRow.props.data.newPostOfficeNumber}
                                //           onChange={props.handleNewPostOfficeNumberChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="EditCustomerFormBalance">
                        <Col componentClass={ControlLabel} sm={4}>
                            Balance
                        </Col>
                        <Col sm={8}>
                            <FormControl
                                type="text"
                                value={activeRow.props.data.balance}
                                //          onChange={props.handleBalanceChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="EditCustomerFormAdditionalInfo">
                        <Col componentClass={ControlLabel} sm={4}>
                            Additional information
                        </Col>
                        <Col sm={8}>
                            <FormControl
                                type="text"
                                value={activeRow.props.data.additionalInfo}
                                //          onChange={props.handleAdditionalInfoChange}
                            />
                        </Col>
                    </FormGroup>
                </Form>
            }
        };

        return (
            <div>
                <Panel className="TablePanel">
                    <Button onClick={this.openAdd}>Add Customer</Button>
                    <Griddle results={customers} tableClassName="CustomersTable" showFilter={true}
                             onRowClick={this.onRowClick}
                             showSettings={true}
                             columns={["id", "customerName", "city", "balance"]}
                    />
                </Panel>

                <Modal show={this.state.showModalAdd} onHide={this.closeAdd} className="Modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Add customer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup controlId="AddCustomerFormName">
                                <Col componentClass={ControlLabel} sm={4}>
                                    Customer name
                                </Col>
                                <Col sm={8}>
                                    <FormControl
                                        type="text"
                                        value={this.state.customerName}
                                        placeholder="Person name or organisation name"
                                        onChange={this.handleNameChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="AddCustomerFormPhone">
                                <Col componentClass={ControlLabel} sm={4}>
                                    Phone number
                                </Col>
                                <Col sm={8}>
                                    <FormControl
                                        type="text"
                                        value={this.state.cellNumber}
                                        placeholder="Enter phone number in format +380 00 000 00 00"
                                        onChange={this.handleCellNumberChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="AddCustomerFormCity">
                                <Col componentClass={ControlLabel} sm={4}>
                                    Phone number
                                </Col>
                                <Col sm={8}>
                                    <FormControl
                                        type="text"
                                        value={this.state.city}
                                        placeholder="City"
                                        onChange={this.handleCityChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="AddCustomerFormNewPostOffice">
                                <Col componentClass={ControlLabel} sm={4}>
                                    New post office number
                                </Col>
                                <Col sm={8}>
                                    <FormControl
                                        type="text"
                                        value={this.state.newPostOfficeNumber}
                                        placeholder="Specify number of office 'Нова пошта'"
                                        onChange={this.handleNewPostOfficeNumberChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="AddCustomerFormBalance">
                                <Col componentClass={ControlLabel} sm={4}>
                                    Start balance
                                </Col>
                                <Col sm={8}>
                                    <FormControl
                                        type="text"
                                        value={this.state.balance}
                                        placeholder="0"
                                        onChange={this.handleBalanceChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="AddCustomerFormInfo">
                                <Col componentClass={ControlLabel} sm={4}>
                                    Additional information
                                </Col>
                                <Col sm={8}>
                                    <FormControl
                                        type="text"
                                        value={this.state.additionalInfo}
                                        placeholder=""
                                        onChange={this.handleAdditionalInfoChange}
                                    />
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeAdd}>Close</Button>
                        <Button bsStyle="success" disabled={buttonDisabled} onClick={() => {
                            this.setState({
                                showModalAdd: false, showModalEdit: false,
                                customerName: "",
                                cellNumber: "",
                                city: "",
                                newPostOfficeNumber: "",
                                balance: 0,
                                additionalInfo: ""
                            });
                            this.props.onAddCustomer(this.state.customerName, this.state.cellNumber, this.state.city, this.state.newPostOfficeNumber, this.state.balance, this.state.additionalInfo);
                            this.closeAdd();
                        }}>Add Customer</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showModalEdit} onHide={this.closeEdit} className="Modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit customer's data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ModalBody

                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeEdit}>Close</Button>
                        <Button bsStyle="success" onClick={() => {
                        }}>Save Data</Button>
                    </Modal.Footer>
                </Modal>


            </div>
        );
    }
});


export default CustomersPanel;








