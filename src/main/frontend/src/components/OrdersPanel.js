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

const OrdersPanel = React.createClass({








    render() {

        let orders = this.props.orders;
  //      let buttonDisabled = this.state.customerName === "" || this.state.cellNumber === "" || this.state.city === "";



        return (
            <div>
                <Panel className="TablePanel">
                    <Button >Add Order</Button>
                    <Griddle results={orders} tableClassName="OrdersTable" showFilter={true}
                             showSettings={true}
                             columns={["id", "customerId", "startDate", "status"]}
                    />
                </Panel>




            </div>
        );
    }
});


export default OrdersPanel;
