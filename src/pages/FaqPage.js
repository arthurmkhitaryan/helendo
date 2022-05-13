import React, {Component} from 'react';
import Banner from "../components/Banner";
import Wrapper from "../components/Wrapper";

class FaqPage extends Component {
    render() {
        return (
            <div>
                <Wrapper>
                <Banner bannerData='FAQ Page'/>

                <div className="site-wrapper-reveal border-bottom">
                    <div className="faq-area section-space--ptb_120">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-9 m-auto">
                                    <div className="section-title text-center mb-30">
                                        <h2 className="faq-text">Frequently Questions</h2>
                                        <div className="section-dec mb-40">
                                            <p className="faq-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat
                                                sagittis</p>
                                        </div>
                                    </div>
                                    <div className="faq-wrapper" id="accordion">
                                        <div className="card">
                                            <div className="card-header" id="headingOne">
                                                <h5 className="mb-0">
                                                    <button className="btn-link" data-bs-toggle="collapse"
                                                            data-bs-target="#collapseOne" aria-expanded="true"
                                                            aria-controls="collapseOne">
                                                        How can we help your business?
                                                    </button>
                                                </h5>
                                            </div>

                                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne"
                                                 data-bs-parent="#accordion">
                                                <div className="card-body">
                                                    <p className="faq-text faq-text-btp">Through the collaboration with customers in discussing needs and
                                                        demand, we're able to attain mutual understanding, gain customer
                                                        trust to offer appropriate advice, and bring about suggestions
                                                        on suitable technology to transform your business. </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingTwo">
                                                <h5 className="mb-0">
                                                    <button className="btn-link collapsed" data-bs-toggle="collapse"
                                                            data-bs-target="#collapseTwo" aria-expanded="true"
                                                            aria-controls="collapseTwo">
                                                        What are the advantages of Helendo?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo"
                                                 data-bs-parent="#accordion">
                                                <div className="card-body">
                                                    <p className="faq-text faq-text-btp">Helendo takes into consideration every little detail to make sure
                                                        the system run smoothly and responsively. Helendo employs a new
                                                        technique called Minified Technology for securing customers'
                                                        database &amp; building up highly confidential firewalls. </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingThree">
                                                <h5 className="mb-0">
                                                    <button className="btn-link collapsed" data-bs-toggle="collapse"
                                                            data-bs-target="#collapseThree" aria-expanded="true"
                                                            aria-controls="collapseThree">
                                                        How working process is simplified?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseThree" className="collapse show" aria-labelledby="headingThree"
                                                 data-bs-parent="#accordion">
                                                <div className="card-body">
                                                    <p className="faq-text faq-text-btp">We reduce redundant complex calculations and lengthy erroneous
                                                        code texts with simpler ones to ensure Helendo would run
                                                        seamlessly and the design is reserved in its best form when
                                                        viewed from a wide range of mobile devices &amp; browsers. </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingFour">
                                                <h5 className="mb-0">
                                                    <button className="collapsed" data-bs-toggle="collapse"
                                                            data-bs-target="#collapseFour" aria-expanded="true"
                                                            aria-controls="collapseFour">
                                                        Product Engineering &amp; Services
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseFour" className="collapse show" aria-labelledby="headingFour"
                                                 data-bs-parent="#accordion">
                                                <div className="card-body">
                                                    <p className="faq-text faq-text-btp">Our service offerings to enhance customer experience throughout
                                                        the product lifecycle includes – test and repair, service
                                                        management, and end-to-end warranty management. </p>
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
                {/*-- Bootstrap JS --*/}
                {/*<script src="../assets/js/vendor/bootstrap.min.js"/>*/}
                {/*<script src="../assets/js/vendor/modernizr-2.8.3.min.js"/>*/}
                {/*<script src="../assets/js/vendor/jquery-3.5.1.min.js"/>*/}
                {/*<script src="../assets/js/vendor/jquery-migrate-3.3.0.min.js"/>*/}
                {/*<script src="../assets/js/plugins/plugins.js"/>*/}
                {/*<script src="../assets/js/main.js"/>*/}
            </div>
        );
    }
}

export default FaqPage;
