import React from 'react'
import { Table, Row, Col } from 'reactstrap';
import ProductsService from '../services/ProductsServices'

export default class ProductsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }
    componentDidMount() {
        ProductsService.getAllProducts().then((data) => {
            this.setState({ products: data })
            console.log(this.state.data)
        })
            .catch(function (ex) {
                console.log('Response parsing failed. Error: ', ex);
            });;
    }
    render() {
        return (
            <Row>
                <Col xs="12">
                    <Table dark>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.products.map(product =>
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        )
    }
}