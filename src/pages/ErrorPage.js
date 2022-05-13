import React, {Component} from 'react';
import {Link} from "react-router-dom";

class ErrorPage extends Component {
    render() {
        return (
            <>
                <div className="site-wrapper-reveal border-bottom">
                    <div className="error-page-area section-space--ptb_90">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 m-auto">
                                    <div className="error-page-content text-center section-space--ptb_90">
                                        <i className="icon icon-confused"/>
                                        <h4 className="mb-20">Ohh! Page not found</h4>
                                        <span className="description">It seems we can't find what you're looking for.
                                            <br/>Perhaps searching can help or go back to
                                            <p><Link to='/'> Homepage</Link></p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ErrorPage;
