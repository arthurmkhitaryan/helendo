import React, {Component} from 'react';

class OrderProducts extends Component {
    render() {
        const {data} = this.props;
        console.log(data)
        return (
            <>
                {data ? data.action.map(d => (
                    <tr>
                        <td className="product-name"><a href="#">{d.name}</a></td>
                        <td className="product-price"><span className="amount">${d.price}</span>
                        </td>
                        <td className="cart-quality">
                            <div className="quickview-cart-box">
                                <div className="quickview-quality">
                                    <div className="order">
                                        <input type="text" name="qty" id="sst" maxLength="5" value={d.quantity}
                                               title="Quantity:"
                                               className="input-text qty" readOnly/>
                                    </div>
                                </div>

                            </div>
                        </td>
                        <td className="price-total">
                            <span className="amount"> ${d.total}</span>
                        </td>
                    </tr>)) : null}
            </>
        );
    }
}

export default OrderProducts;