import React, {Component} from 'react';
import Banner from "../components/Banner";
import Wrapper from "../components/Wrapper";
import Orders from "../components/Order/Orders";
import Address from "../components/Account/Address";
import AccountDetails from "../components/Account/AccountDetails";
import withRouter from "../helpers/withRouter";
import ProductAdmin from "../components/Admin/ProductAdmin";
import SliderAdmin from "../components/Admin/SliderAdmin";
import ProductDetail from "../components/Admin/ProductDetail";
import BrandAdmin from "../components/Admin/BrandAdmin";

class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: true,
            display: 'display1',
            role: 'all',
            data: {}
        }
    }

    componentDidMount() {
        if(this.state.role === 'all') {
            this.setState({display: 'display4'})
        }
    }

    handleClick = (display, data) => {
        console.log(data)
        this.setState({display, clicked: true, data})
    }
    handleLogOut = (ev) => {
        ev.preventDefault();
        const token = localStorage.getItem('token');
        if (token) {
            localStorage.clear();
        }
        this.props.navigate('/')
    }

    render() {
        const {display, clicked, role} = this.state
        return (
            <div>
                <Wrapper>
                    <Banner bannerData="My Account"/>
                    <div id="main-wrapper">
                        <div className="site-wrapper-reveal border-bottom">

                            <div className="my-account-page-warpper section-space--ptb_120">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="myaccount-page-wrapper">
                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4">
                                                        <div className="myaccount-tab-menu nav" role="tablist">
                                                            {role !== 'all' ? <>
                                                                    <button onClick={() => this.handleClick("display1")}
                                                                            className={`${clicked && display === "display1" ? "active" : null}`}
                                                                            data-bs-toggle="tab"><i
                                                                        className="fa fa-cart-arrow-down"/> Orders
                                                                    </button>
                                                                    <button onClick={() => this.handleClick("display2")}
                                                                            className={`${clicked && display === "display2" ? "active" : null}`}>
                                                                        <i className="fa fa-map-marker"
                                                                           data-bs-toggle="tab"/> Address
                                                                    </button>
                                                                </> :
                                                                <>
                                                                    <button onClick={() => this.handleClick("display4")}
                                                                            className={`${clicked && display === "display4" ? "active" : null}`}
                                                                            data-bs-toggle="tab"><i
                                                                        className="fa fa-product-hunt"/> Products
                                                                    </button>
                                                                    <button onClick={() => this.handleClick("display5")}
                                                                            className={`${clicked && display === "display5" ? "active" : null}`}>
                                                                        <i
                                                                            className="fa fa-slideshare"
                                                                            data-bs-toggle="tab"/> Slider
                                                                    </button>
                                                                    <button onClick={() => this.handleClick("display6")}
                                                                            className={`${clicked && display === "display6" ? "active" : null}`}>
                                                                        <i
                                                                            className="fa fa-map-marker"
                                                                            data-bs-toggle="tab"/> Brands
                                                                    </button>
                                                                </>}
                                                            <button onClick={() => this.handleClick("display3")}
                                                                    className={`${clicked && display === "display3" ? "active" : null}`}>
                                                                <i
                                                                    className="fa fa-user"
                                                                    data-bs-toggle="tab"/> Account
                                                                Details
                                                            </button>
                                                            <button data-bs-toggle="tab" type='submit'
                                                                    onClick={(ev) => this.handleLogOut(ev)}><i
                                                                className="fa fa-sign-out"/> Logout
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-9 col-md-8">
                                                        <div className="tab-content" id="myaccountContent">
                                                            {display === "display1" ? <Orders/> : null}
                                                            {display === "display2" ? <Address/> : null}
                                                            {display === "display3" ? <AccountDetails/> : null}
                                                            {display === "display4" ? <ProductAdmin handleClick={this.handleClick}/> : null}
                                                            {display === "display5" ? <SliderAdmin/> : null}
                                                            {display === "display6" ? <BrandAdmin/> : null}
                                                            {display === "display7" ? <ProductDetail data={this.state.data}/> : null}
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
        );
    }
}

export default withRouter(MyAccount);
