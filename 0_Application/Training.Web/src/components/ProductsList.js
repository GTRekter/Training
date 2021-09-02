import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ProductsService from '../services/ProductsServices'

export default class ProductsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
        this.onClickDelete = this.onClickDelete.bind(this);
    }
    componentDidMount() {
        ProductsService.getAllProducts()
            .then((data) => {
                this.setState({ products: data })
                console.log(this.state.data)
            })
            .catch(function (ex) {
                console.log('Response parsing failed. Error: ', ex);
            });;
    }
    onClickDelete = (id) => {
        console.log(id);
        ProductsService.deleteProduct(id)
            .then(() => {
                console.log('Product succesfully deleted');
                const products = this.state.products.filter(prod => prod.id !== id)
                this.setState({products})
            })
            .catch(function (ex) {
                console.log('Response parsing failed. Error: ', ex);
            });
    };
    render() {
        return (
            <Table dark data-element-id="products">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.products.map(product =>
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td><Button onClick={(e) => { this.onClickDelete(product.id); }}>Delete</Button></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        )
    }
}