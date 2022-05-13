import React, {Component} from 'react';
import {getOrderRequest} from "../../store/actions/order";
import {connect} from "react-redux";
import withRouter from "../../helpers/withRouter";
import moment from 'moment';

class Orders extends Component {
    async componentDidMount() {
        await this.props.getOrderRequest()
    }

    handleNavigate = (id) => {
        this.props.navigate(`/my_account/order/${id}`)
    }

    render() {
        const {data} = this.props;
        console.log(data)
        return (
            <div className="myaccount-content">
                <h3 className="title">Orders</h3>
                <div
                    className="myaccount-table table-responsive text-center">
                    <table className="table table-bordered">
                        <thead className="thead-light">
                        <tr>
                            <th>Order</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data ? data.map((d, i) => (
                            <tr key={d.id}>
                                <td>{i + 1}</td>
                                <td>{moment(d.date).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                <td>{d.status}</td>
                                <td>${d.total}</td>
                                <td>
                                    <div onClick={() => this.handleNavigate(d.id)}
                                         className="btn btn btn-dark btn-hover-primary btn-sm rounded-0">View
                                    </div>
                                </td>
                            </tr>
                        )) : null}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
        data: state.order.orderList.orders,
    }
)

const mapDispatchToProps = {
    getOrderRequest
}

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Orders)

export default withRouter(Container);
