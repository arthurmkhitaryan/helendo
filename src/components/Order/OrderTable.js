import React, {Component} from 'react';
import {getSingleOrderRequest} from "../../store/actions/order";
import {connect} from "react-redux";
import withRouter from "../../helpers/withRouter";
import OrderProducts from "./OrderProducts";
import _ from "lodash";
import ErrorPage from "../../pages/ErrorPage";

class OrderTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this?.props?.params.id
        }
    }
    async componentDidMount() {
        const {id} = this.state
        await this.props.getSingleOrderRequest(id)
    }

    render() {
        const {data} = this.props
        return (
            <>
                <form action="#">
                    <div className="table-content table-responsive cart-table-content header-color-gray">
                        <table>
                            <thead>
                            <tr className="bg-gray">
                                <th className="product-name">Product</th>
                                <th className="product-price"> Price</th>
                                <th className="product-price">Quantity</th>
                                <th>Subtotal</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {!(_.isEmpty(data)) ? <OrderProducts data={data}/> : <ErrorPage/>}
                            </tbody>
                        </table>
                    </div>
                </form>
                <div className="cart-buttom-area">
                    <div className="row">
                        <div className="col-lg-6"/>
                        <div className="col-lg-6">
                            <div className="cart_totals section-space--mt_60 ms-md-auto">
                                <div className="grand-total-wrap">
                                    <div className="grand-total-content">
                                        <ul>
                                            <li>Total <span>${data.total}</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
        data: state.order.singleOrder,
    }
)

const mapDispatchToProps = {
    getSingleOrderRequest
}

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderTable)

export default withRouter(Container);