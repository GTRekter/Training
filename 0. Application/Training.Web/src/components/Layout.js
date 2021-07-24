import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavigationBar from './NavigationBar';

export class Layout extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}