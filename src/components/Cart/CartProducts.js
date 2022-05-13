import React, {Component} from 'react';
import {deleteCartRequest, updateCartRequest} from "../../store/actions/cart";
import {connect} from "react-redux";

class CartProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.data.count,
        }
    }

    handleIncrease = async (qty, productId) => {
        const {value} = this.state
        if (value === qty) {
            return
        }
        await this.setState({value: value + 1}, async () => {
            this.handleUpdate(productId)
        })
    }

    handleDecrease = async (productId) => {
        const {value} = this.state
        if (value === 1) {
            return
        }
        await this.setState({value: value - 1}, async () => {
            this.handleUpdate(productId)
        })
    }

    handleUpdate = async (productId) => {
        const {value} = this.state;
        await this.props.updateCartRequest({count: value, itemId: productId}, async () => {
            await this.props.getCartRequest()
        })

    }

    handleDelete = async (ev, id) => {
        ev.preventDefault();
        await this.props.deleteCartRequest(id, async () => {
            await this.props.getCartRequest()
        })
    }

    render() {
        const {data} = this.props;
        const {value} = this.state;

        return (
            <tr>
                <td className="product-img">
                    <a href="#"><img src={`http://localhost:4000${data.product.photo[0].url}`}
                                     alt=""/></a>
                </td>
                <td className="product-name"><a href="#">{data.product.name}</a></td>

                <td className="product-price"><span className="amount">${data.product.price}</span>
                </td>

                <td className="cart-quality">
                    <div className="quickview-cart-box">
                        <div className="quickview-quality">
                            <div className="cart-plus-minus">
                                <button
                                    className="reduced items-count" type="button"
                                    onClick={() => this.handleDecrease(data.id)}>-
                                </button>
                                <input type="text" name="qty" id="sst" maxLength="5" value={value}
                                       title="Quantity:"
                                       className="input-text qty" readOnly/>
                                <button
                                    className="increase items-count" type="button"
                                    onClick={() => this.handleIncrease(data.product.quantity, data.id)}>+
                                </button>
                            </div>
                        </div>

                    </div>
                </td>
                <td className="price-total">
                    <span className="amount"> ${data.total}</span>
                </td>
                <td className="product-remove" >
                    <button onClick={(ev) => this.handleDelete(ev, data.id)}><i className="icon-cross2"/></button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
    updateCartRequest,
    deleteCartRequest
}

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(CartProducts)

export default Container;
