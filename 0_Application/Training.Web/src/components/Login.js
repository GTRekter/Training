import React, { Component } from 'react';
import { Form, FormGroup, FormFeedback, Label, Input, Button } from 'reactstrap';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            valid: false,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        this.setState({
            [name]: value,
        });
    };
    submitForm(e) {
        e.preventDefault();
    }
    render() {
        return (
            <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" placeholder="Enter your email"
                        value={this.state.email}
                        onChange={(e) => { this.handleChange(e); }} />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" placeholder="**********"
                        valid={this.state.validate.emailState === "has-success"}
                        invalid={this.state.validate.emailState === "has-danger"} 
                        value={this.state.password}
                        onChange={(e) => this.handleChange(e)}/>
                    <FormFeedback>
                        Uh oh! Looks like there is an issue with your email. Please input
                        a correct email.
                    </FormFeedback>
                </FormGroup>
                <Button color="primary" type="submit">Login</Button>
            </Form>
        )
    }
}