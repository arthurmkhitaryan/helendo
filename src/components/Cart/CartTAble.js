import React, {Component} from 'react';
import {getCartRequest} from "../../store/actions/cart";
import {connect} from "react-redux";
import withRouter from "../../helpers/withRouter";
import CartProducts from "./CartProducts";

class CartTAble extends Component {
    async componentDidMount() {
        await this.props.getCartRequest()
    }

    render() {
        const {list} = this.props.data;
        const {getCartRequest} = this.props;
        console.log(list)
        return (
            <form action="#">
                <div
                    className="table-content table-responsive cart-table-content header-color-gray">
                    <table>
                        <thead>
                        <tr className="bg-gray">

                            <th className="product-name">Product</th>
                            <th/>
                            <th className="product-price"> Price</th>
                            <th className="product-price">Quantity</th>
                            <th>Subtotal</th>

                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {list ? list.map(l => (<CartProducts data={l} getCartRequest={getCartRequest}/>)) : null}
                        </tbody>
                    </table>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
        data: state.cart.cartList,
    }
)

const mapDispatchToProps = {
    getCartRequest
}

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(CartTAble)

export default withRouter(Container);
