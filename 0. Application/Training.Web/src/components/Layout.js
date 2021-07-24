  
import React, { Component } from 'react';
import { Container } from 'reactstrap';

export class Layout extends Component {
    render() {
        return (
            <Container>
                {this.props.children}
            </Container>
        );
    }
}