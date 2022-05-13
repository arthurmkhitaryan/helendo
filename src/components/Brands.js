import React, {Component} from 'react';
import {connect} from "react-redux";
import {getBrandListRequest} from "../store/actions/slider";

class Brands extends Component {
    async componentDidMount() {
        await this.props.getBrandListRequest('brand')
    }

    render() {
        const {data} = this.props
        return (
            <div className="our-brand-area section-space--pb_90">
                <div className="container">
                    <div className="brand-slider-active">
                        <div className="single-brand-item">
                            {data ? data.map(d => (
                                <a href={d.url} target='_blank'><img src={`http://localhost:4000${d.image}`}
                                                                     className="img-fluid brand-img"
                                                                     alt="Brand Images"/></a>
                            )) : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
        data: state.slider.brandList,
    }
)

const mapDispatchToProps = {
    getBrandListRequest
}

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Brands)

export default Container;