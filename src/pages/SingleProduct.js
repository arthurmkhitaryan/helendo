import React, {Component} from 'react';
import Wrapper from "../components/Wrapper";
import {connect} from "react-redux";
import { getSingleProductRequest} from "../store/actions/product";
import withRouter from "../helpers/withRouter";
import SingleProductImage from "../components/Shop/SingleProductImage";
import SingleProductDesc from "../components/Shop/SingleProductDesc";
import ErrorPage from "./ErrorPage";
import _ from 'lodash'


class SingleProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productId : this?.props?.params.productId
        }
    }

    async componentDidMount() {
        const {productId} = this.state;
        console.log(productId)
        await this.props.getSingleProductRequest(productId)
    }

    render() {
        const {data} = this.props;
        console.log(data, 8888)
        return (
            <>

                        <Wrapper>
                            <div className="single-product-wrap section-space--pt_90 border-bottom" >
                                {!(_.isEmpty(data)) ?
                                    <div className="container" style={{marginBottom: '100px'}}>
                                        <div className="row">
                                            <SingleProductImage data={data? data : null}/>
                                            <SingleProductDesc data={data}/>
                                        </div>
                                    </div> : <ErrorPage/>}
                            </div>
                        </Wrapper>

            </>
        );
    }
}

const mapStateToProps = (state) => (
        {
            data: state?.product?.singleProduct,
        }
)

const mapDispatchToProps = {
    getSingleProductRequest
}

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleProduct)

export default withRouter(Container);
