import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer py-4 bg-dark">
                <div className="container-fluid">
                    <div className="row align-items-center justify-content-lg-between">
                        <div className="col-lg-12 mb-lg-0">
                            <div className="copyright text-center text-sm text-muted text-lg-start">
                                © 2021, made with
                                <FontAwesomeIcon className='mx-1' icon={faHeart} />
                                by
                                <a href="https://ivanporta.net/" rel="noreferrer" className="font-weight-bold text mx-1 text-decoration-none text-white" target="_blank">Ivan Porta</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}