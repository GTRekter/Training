import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import NavigationBar from './NavigationBar';

export class Layout extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <Container>
                    <Row className="mt-5">
                        <Col xs="12">
                            {this.props.children}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}