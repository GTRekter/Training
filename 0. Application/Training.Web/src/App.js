import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import ProductsList from './components/ProductsList';
import ProductCreationForm from './components/ProductCreationForm';

export default class App extends Component {
    render () {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/products' component={ProductsList} />
                <Route exact path='/addproduct' component={ProductCreationForm} />
            </Layout>
        );
    }
}