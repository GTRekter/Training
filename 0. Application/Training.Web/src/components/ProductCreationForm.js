import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import ProductsService from '../services/ProductsServices'

export default class ProductsCreationForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            price: 0
        }
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
        ProductsService.addProduct(this.state.name, this.state.price)
            .then(() => {
                console.log('Product succesfully created');
                this.props.history.push('/products');
            })
            .catch(function (ex) {
                console.log('Response parsing failed. Error: ', ex);
            });
    }
    render() {
        return (
            <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                <FormGroup>
                    <Label className="text-white" for="exampleEmail">Name</Label>
                    <Input type="text" name="name" placeholder="Enter your product's name"
                        value={this.state.name}
                        onChange={(e) => { this.handleChange(e); }} />
                </FormGroup>
                <FormGroup>
                    <Label className="text-white" for="examplePassword">Price</Label>
                    <Input type="number" name="price" placeholder="Enter your product's price"
                        value={this.state.price}
                        onChange={(e) => { this.handleChange(e); }} />
                </FormGroup>
                <Button className="mr-2" color="primary" type="submit">Confirm</Button>
                <Button color="secondary" type="reset">Clear</Button>
            </Form>
        )
    }
}