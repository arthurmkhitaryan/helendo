import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Logo from "../assets/images/logo/logo.svg"

class Footer extends Component {
    render() {
        return (
            <div className="footer-area-wrapper">
                <div className="footer-area section-space--ptb_120">
                    <div className="container">
                        <div className="row footer-widget-wrapper">
                            <div className="col-lg-3 col-md-4 col-sm-6 footer-widget">
                                <h6 className="footer-widget__title mb-20">Address</h6>
                                <ul className="footer-widget__list">
                                    <li><i className="icon_pin"/> Helendo, Chicago, USA 2018</li>
                                    <li><i className="icon_phone"/><a href="tel:846677028028" className="hover-style-link">+846677028028</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6 footer-widget">
                                <h6 className="footer-widget__title mb-20">Help & Information</h6>
                                <ul className="footer-widget__list">
                                    <li><Link to='/terms_conditions' className="hover-style-link">Terms & Conditions</Link></li>
                                    <li><Link to='/policy' className="hover-style-link">Policy</Link></li>
                                </ul>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6 footer-widget">
                                <h6 className="footer-widget__title mb-20">About Us</h6>
                                <ul className="footer-widget__list">
                                    <li><Link to='/about_us' className="hover-style-link">About</Link></li>
                                    <li><Link to='/contact' className="hover-style-link">Contact</Link></li>
                                    <li><Link to='/faq_page' className="hover-style-link">FAQ Page</Link></li>
                                </ul>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6 footer-widget">
                                <h6 className="footer-widget__title mb-20">Follow Us On Social</h6>
                                <ul className="list footer-social-networks mt-25">

                                    <li className="item">
                                        <a href="https://twitter.com/" className="hover-style-link" target="_blank" aria-label="Twitter">
                                            <i className="social social_twitter"/>
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a href="https://facebook.com/" className="hover-style-link" target="_blank" aria-label="Facebook">
                                            <i className="social social_facebook"/>
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a href="https://instagram.com/" className="hover-style-link" target="_blank" aria-label="Instagram">
                                            <i className="social social_instagram"/>
                                        </a>
                                    </li>
                                    <li className="item">
                                        <a href="https://www.pinterest.com/" className="hover-style-link" target="_blank" aria-label="Pinterest"><i
                                            className="social social_pinterest"/></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright-area section-space--pb_30">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-4 col-md-5 text-center text-md-start">
                            </div>
                            <div className="col-lg-4 col-md-2 text-center">
                                <div className="footer-logo">
                                    <a href="#"><img src={Logo} alt="Logo images"/></a>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <span
                                    className="copyright-text text-center  section-space--mt_40">&copy; 2022 Helendo. <a
                                    href="https://hasthemes.com/" target="_blank">All Rights Reserved.</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
