import React, {Component} from 'react';
import Banner from "../components/Banner";

import Wrapper from "../components/Wrapper";
import SendMessage from "../components/SendMessage";

class Contact extends Component {
    render() {
        return (
            <div className="box-home">
                <div className="page-box">
                    <div className='contact-container'>
                        <Wrapper>
                            <Banner bannerData='Contact'/>

                            <div id="main-wrapper">

                                <div className="site-wrapper-reveal border-bottom">
                                    <div className="contact-us-info-area mt-30 section-space--mb_60">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-3">
                                                    <div className="single-contact-info-item">
                                                        <div className="icon">
                                                            <i className="icon-clock3"/>
                                                        </div>
                                                        <div className="iconbox-desc">
                                                            <h6 className="mb-10">Open houses</h6>
                                                            <p className='contact_text'>Mon – Fri : 8:30 – 18:00 </p>
                                                            <p className='contact_text'> Sat – Sun : 9:00 – 17:00</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="single-contact-info-item">
                                                        <div className="icon">
                                                            <i className="icon-telephone"/>
                                                        </div>
                                                        <div className="iconbox-desc">
                                                            <h6 className="mb-10">Phone number</h6>
                                                            <p className='contact_text'>(504) 586 256 23 </p>
                                                            <p className='contact_text'> (306) 574 326 56</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="single-contact-info-item">
                                                        <div className="icon">
                                                            <i className="icon-envelope-open"/>
                                                        </div>
                                                        <div className="iconbox-desc">
                                                            <h6 className="mb-10">Our email</h6>
                                                            <p className='contact_text'>office@helentheme.com </p>
                                                            <p className='contact_text'>Info@helentheme.com</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="single-contact-info-item">
                                                        <div className="icon">
                                                            <i className="icon-map-marker"/>
                                                        </div>
                                                        <div className="iconbox-desc">
                                                            <h6 className="mb-10">Our location</h6>
                                                            <p className='contact_text'>1102 Helen Estates, Guys </p>
                                                            <p className='contact_text'>Store, San Diego, USA.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-lg-12">
                                    <div className="border-top">
                                        <div className="row">
                                            <div className="contact-us-info-area mt-30 section-space--mb_60">
                                                <div className="container">
                                                    <div className="row">

                                                        <SendMessage/>
                                                        <div className="col-lg-4 ms-auto">
                                                            <div className="contact-info-text section-space--mt_60">
                                                                <h5 className="mb-10">Our address</h5>
                                                                <p>Duis aute irure dolor in reprehenderit ioluptate
                                                                    velit esse
                                                                    cillum dolore pariatur.</p>
                                                                <p className="mt-30">1102 Helen Estates, Guys Store, San
                                                                    Diego,
                                                                    USA. <br/>(693) 650-2389 <br/>office@helentheme.com
                                                                </p>
                                                                <div className="product_socials mt-30">
                                                                    <span className="label">FOLLOW US:</span>
                                                                    <ul className="helendo-social-share socials-inline">
                                                                        <li>
                                                                            <a className="share-twitter helendo-twitter"
                                                                               href="https://twitter.com/"
                                                                               target="_blank"><i
                                                                                className="social_twitter"/></a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="share-facebook helendo-facebook"
                                                                               href="https://www.facebook.com/"
                                                                               target="_blank"><i
                                                                                className="social_facebook"/></a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="share-pinterest helendo-pinterest"
                                                                               href="https://www.pinterest.com/"
                                                                               target="_blank"><i
                                                                                className="social_pinterest"/></a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="share-linkedin helendo-linkedin"
                                                                               href="https://www.linkedin.com/"
                                                                               target="_blank"><i
                                                                                className="social_linkedin"/></a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Wrapper>
                    </div>
                </div>
            </div>
        );
    }
}


export default Contact;
