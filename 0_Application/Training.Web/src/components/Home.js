import React, { Component } from 'react';
// import globalazurelogo from '../images/globalazure2021.png';
// import cloudgenlogo from '../images/cloudgen.png';

export default class Home extends Component {
    render() {
        return (
            <div>
                {/* <Row className="mt-5">
                    <Col xs="6">
                        <div className="text-center">
                            <img src={globalazurelogo} className="img-fluid me-300" id="globalazure-logo" alt="Global Azure logo" />
                        </div>
                    </Col>
                    <Col xs="6">
                        <div className="text-center">
                            <img src={cloudgenlogo} className="img-fluid me-300" id="cloudgen-logo" alt="CloudGen logo" />
                        </div>
                    </Col>
                </Row> */}
                <div className="text-center text-white">
                    <h1>Welcome to this Demo</h1>
                    <p className="lead">Cypress</p>
                </div>
            </div>
        )
    }
}