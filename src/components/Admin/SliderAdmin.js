import React, {useEffect, useState} from 'react';
import {connect, useSelector} from "react-redux";
import {getCarouselListRequest} from "../../store/actions/slider";
import withRouter from "../../helpers/withRouter";
import withQuery from "../../helpers/withQuery";

const SliderAdmin = (props) => {
    const slider = useSelector(state => state.slider.sliderList)

    const [state, setState] = useState({
        value: 1,
        id: '',
        role: 'all',
    })

    useEffect(() => {
        props.getCarouselListRequest('banner')
    }, [])


    return (
        <>
            <div className='newProduct_div'>
                <button className='newProduct'>
                    <i className="p-icon icon-plus"/> Add new slider
                </button>
            </div>
            <div className="tab-content">
                <div className="tab-pane fade show active" id="tab_columns_01">
                    <div className="row">
                        {slider ? slider.map(d => (
                            <div className="col-lg-4 col-md-4 col-sm-6" key={d.id}>
                                <div className="single-product-item text-center">
                                    <div className="products-images">
                                        <img src={`http://localhost:4000${d.image}`} className="img-fluid"
                                             alt="Product Images" width="300" height="300"/>
                                        <div className="product-actions">
                                            <button
                                                // onClick={() => handleAddCart(state.value, d.id)}
                                            >
                                                <i className="p-icon icon-pencil"/></button>
                                            <button
                                                // onClick={() => handleAddWishlist(d.id) }
                                            >
                                                <i className="p-icon icon-trash"/></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : null}
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
    getCarouselListRequest,
}

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(SliderAdmin)

export default withQuery(withRouter(Container));
