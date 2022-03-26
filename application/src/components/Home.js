import React, { Component } from 'react';
import octocatImage from '../images/octocat.png';
import './home.css';

export default class Home extends Component {
    render() {
        return (
            <div className="full-height-container">
                <div className="bg-white text-center py-5 octocat-container">
                    <img src={octocatImage} className="img-fluid" id="octocat-logo" alt="Octocat Logo" />
                </div>
                <div className="text-center text-white py-5">
                    <h1>Welcome to this Demo</h1>
                    <p className="lead">This project is for demo purposes only and is used to demonstrate a very simple approach to DevOps.</p>
                </div>
            </div>
        )
    }
}