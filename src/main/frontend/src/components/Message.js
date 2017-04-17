import React from 'react';
import {
    Panel,
    FormGroup,
    InputGroup,
    FormControl,
    Button,
    ControlLabel,

} from 'react-bootstrap';

const Message = React.createClass({

    getInitialState() {
        return {
            showButtonSend: false,
            from: "",
            subj: "",
            to: "",
            text: ""
        };
    },

    handleFromChange(e) {
        this.setState({from: e.target.value});
    },

    handleSubjChange(e) {
        this.setState({subj: e.target.value});
    },

    handleToChange(e) {
        this.setState({to: e.target.value});
    },

    handleTextChange(e) {
        this.setState({text: e.target.value});
    },

    render() {

        let buttonDisabled = this.state.from === "" || this.state.subj === "" || this.state.to === "" || this.state.text === "";
        return (
            <div>

                <FormGroup>
                    <InputGroup>
                        <div>
                            <ControlLabel>From</ControlLabel>
                            <FormControl type="text"
                                         value={this.state.from}
                                         placeholder="From"
                                         onChange={this.handleFromChange}/>

                        </div>
                        <div>
                            <ControlLabel>Subject</ControlLabel>
                            <FormControl type="text"
                                         value={this.state.subject}
                                         placeholder="Subject"
                                         onChange={this.handleSubjectChange}/>
                        </div>
                        <div>
                            <ControlLabel>To</ControlLabel>
                            <FormControl type="text"
                                         value={this.state.to}
                                         placeholder="To"
                                         onChange={this.handleToChange}/>
                        </div>
                        <div>
                            <ControlLabel>Text</ControlLabel>
                            <FormControl type="text"
                                         value={this.state.text}
                                         placeholder="Text"
                                         onChange={this.handleTextChange}/>
                        </div>
                    </InputGroup>
                </FormGroup>


            </div>
        );
    }
});

export default Message;








