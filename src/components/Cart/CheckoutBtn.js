import React, {Component} from 'react';
import {connect} from "react-redux";
import {addOrderRequest} from "../../store/actions/order";
import {getCartRequest} from "../../store/actions/cart";

class CheckoutBtn extends Component {
    handleCheck = async () => {
        await this.props.addOrderRequest( async () => {
            await this.props.getCartRequest()
        })

    }

    render() {
        return (
            <div>
                <div className="grand-btn mt-30" onClick={this.handleCheck}>
                    <button className="btn--black btn--full text-center btn--lg">Proceed to checkout</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
    addOrderRequest,
    getCartRequest
}

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutBtn)

export default Container;