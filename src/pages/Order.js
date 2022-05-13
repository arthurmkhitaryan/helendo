import React, {Component} from 'react';
import Wrapper from "../components/Wrapper";
import Banner from "../components/Banner";
import OrderTable from "../components/Order/OrderTable";


class Order extends Component {
    render() {
        return (
            <Wrapper>
                <Banner bannerData='Orders'/>
                <div className="cart-main-area  section-space--ptb_90">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <OrderTable/>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        );
    }
}

export default Order;