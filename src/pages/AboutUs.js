import React, {Component} from 'react';
import Wrapper from "../components/Wrapper";
import Banner from "../components/Banner";
import Map from "../components/Map";

class AboutUs extends Component {
    render() {
        return (
            <div className="box-home">
            <div className="page-box">
                <div className='contact-container'>

                <Wrapper>
                <Banner bannerData='About Us'/>
                    <div className="our-customer-supper-area">
                        <div className="container">
                            <div className="row">
                                <div className="about-container">
                                    <h3>About Us</h3>
                                    <p>Furniture and home decor that transform a whole room; statement pieces;
                                        pieces with history; furniture with a name - you'll find countless of these
                                        unique products at Helendo.com, by internationally renowned creative minds
                                        such as Alvar Aalto, Verner Panton and Arne Jacobsen, as well as promising
                                        new pieces from emerging designers. Many of our products have won design
                                        awards and over 400 brands have put their names to the quality and
                                        production of our products. Close contact with designers and brands all over
                                        the world allows us to curate our assortment and ensure that only the best
                                        designs of all varieties are on the website. Find your personal jewel here.

                                        Founded by Thilo Haas and Kristian Lenz in 2005, Helendo is now one of the
                                        market-leading online shops for designer furniture and home accessories.
                                        Over 125 employees work behind the scenes at Helendo. We are a young,
                                        motivated team, sharing our passion for interior design. We work together to
                                        ensure that you have the best possible shopping experience - with detailed
                                        product descriptions and home design inspiration, certified safety
                                        standards, exceptionally fast delivery and a top-class customer care team
                                        standing ready with help and advice.

                                        The positive feedback of our customers is our motivation and reward for hard
                                        work. What our customers say inspires and motivates us to improve
                                        constantly.</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="addres-area section-space--pb_90">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="helendo-section-title text-start section-space--mt_60">
                                        <h3 className="title">New York</h3>
                                        <div className="description">
                                            <p className="about-us-text">2954 Golden Estates, Guys Store, New York, USA.</p>
                                            <p className="about-us-text"> (571) 400-1255</p>
                                            <p className="about-us-text">info@helentheme.com</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="helendo-section-title text-start section-space--mt_60">
                                        <h3 className="title">San Diego</h3>
                                        <div className="description">
                                            <p className="about-us-text">1102 Helen Estates, Guys Store, San Diego, USA.</p>
                                            <p className="about-us-text">(571) 400-1266</p>
                                            <p className="about-us-text"> office@helentheme.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="map-area">
                        <div className="google-map">
                            <Map/>
                        </div>
                    </div>

                </Wrapper>
            </div>
            </div>
            </div>
        );
    }
}

export default AboutUs;
