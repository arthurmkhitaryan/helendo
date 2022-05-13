import React, {Component} from 'react';
import Wrapper from "../components/Wrapper";
import ProductList from "../components/Shop/ProductList";
import Filter from "../components/Filter/Filter";

class ShopOnline extends Component {
    render() {
        return (
            <Wrapper>
                <div className="header-left-search">
                    <form action="#" className="header-search-box">
                        <input className="search-field" type="text" placeholder="Search Anything..."/>
                        <button className="search-icon"><i className="icon-magnifier"/></button>
                    </form>
                </div>
                    <div className="site-wrapper-reveal border-bottom">
                        <div className="product-wrapper section-space--ptb_120">
                            <div className="container">
                                <Filter/>
                                <ProductList/>
                            </div>
                        </div>
                    </div>
            </Wrapper>
        );
    }
}

export default ShopOnline;
