import React, {Component} from 'react';
import {getUserRequest} from "../../store/actions/users";
import {connect} from "react-redux";

class Address extends Component {
    async componentDidMount() {
        await this.props.getUserRequest()
    }

    render() {
        const {user} =this.props;
        return (
            <>
                    <div className="myaccount-content">
                        <h3 className="title">Billing Address</h3>
                        <address>
                            <p><strong>{user.lName} {user.fName}</strong></p>
                            <p>1234 Market, Suite 900 </p>
                            <p>Mobile: (123) 123-456789</p>
                        </address>
                        <a href="#"
                           className="btn btn btn-dark btn-hover-primary rounded-0"><i
                            className="fa fa-edit me-2"/>Edit Address</a>
                    </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
        user: state.users.user,
    }

)

const mapDispatchToProps = {
    getUserRequest
}

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Address)

export default Container;

