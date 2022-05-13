import React, {Component} from 'react';
import {connect} from "react-redux";
import withRouter from "../helpers/withRouter";
import {getCategoryListRequest} from "../store/actions/categories";
import {getProductListRequest} from "../store/actions/product";
import withQuery from "../helpers/withQuery";
import qs from "query-string";

class CategoryLine extends Component {
    async componentDidMount() {
        await this.props.getCategoryListRequest()
    }

    handleClick = async (key, value, ev) => {
        ev.preventDefault()
        if (value === 'all') {
            await this.props.getProductListRequest()
        } else {
            await this.props.getProductListRequest({}, qs.stringify({[key]: value}))
        }
    }

    render() {
        const {children, data} = this.props;
        return (
            <div className="product-wrapper section-space--ptb_120">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                            <div className="section-title text-lg-start text-center mb-20">
                                <h3 className="section-title">Popular Products</h3>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <ul className="nav product-tab-menu justify-content-lg-end justify-content-center"
                                role="tablist">
                                <li className="tab__item nav-item active" onClick={() => this.handleClick('all')}>
                                    <p className="nav-link">All Products</p>
                                </li>
                                {data ? data.map(c => (
                                    <li className="tab__item nav-item" key={c.id}
                                        onClick={(ev) => this.handleClick('category', c.id, ev)}>
                                       <p className="nav-link">{c.name}</p>
                                    </li>
                                )) : null}
                            </ul>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    data: state.categories.categoriesList,
})

const mapDispatchToProps = {
    getCategoryListRequest,
    getProductListRequest
}

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryLine)

export default withQuery(withRouter(Container));
