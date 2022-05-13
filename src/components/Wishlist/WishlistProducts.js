import React, {Component} from 'react';
import { deleteWishlistRequest, getWishlistRequest} from "../../store/actions/wishlist";
import { addCartRequest } from '../../store/actions/cart'
import {connect} from "react-redux";

class WishlistProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.data.count,
            id: '',
            val: 1,
        }
    }
    handleAddCart = async (count, productId, ev) => {
        ev.preventDefault()
        await this.props.addCartRequest({count, productId})
    }

    handleDelete = async (ev, id) => {
        ev.preventDefault()
        await this.props.deleteWishlistRequest(id, async () => {
            await this.props.getWishlistRequest()
        })
    }

    render() {
        const {data} = this.props;
        const {val} = this.state;
        return (
            <tr>
                <td className="product-img">
                    <a href="#"><img src={`http://localhost:4000${data.product.photo[0].url}`}
                                     alt=""/></a>
                </td>
                <td className="product-name"><a href="#">{data.product.name}</a></td>

                <td className="product-price"><span className="amount">${data.product.price}</span>
                </td>
                <td className="product-wishlist-cart">
                    <button type='submit'
                            onClick={(ev) => this.handleAddCart(val, data.productId, ev)}>Add to cart</button>
                </td>
                <td className="product-remove" >
                    <button onClick={(ev) => this.handleDelete(ev, data.id)}><i className="icon-cross2"/></button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
    deleteWishlistRequest,
    addCartRequest,
    getWishlistRequest
}

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(WishlistProducts)

export default Container;
