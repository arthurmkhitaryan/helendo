import React, {useEffect, useState} from 'react';
import withQuery from "../../helpers/withQuery";
import withRouter from "../../helpers/withRouter";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {getCategoryListRequest} from "../../store/actions/categories";
import qs from 'query-string';
import {getProductListRequest} from "../../store/actions/product";

function FilterBar({...props}) {
    const [formData, setFormData] = useState({})
    const dispatch = useDispatch();
    const data = useSelector(store => store.categories.categoriesList);

    useEffect(() => {
        dispatch(getCategoryListRequest())
    }, [])

    const handleClick = async (key, value, ev) => {
        ev.preventDefault()
        const {query} = props;
       await setFormData({
            ...formData,
            [key]: value
        })
        _.merge(query, {
            ...query,
            ...formData,
            [key]: value
        })
        dispatch(getProductListRequest({}, qs.stringify(query)));
        console.log(props)
    }

    return (
        <>
            <div className=" mb-20 col__20">
                <div className="product-filter">
                    <h5>Price</h5>
                    <ul className="widget-nav-list">
                        <li onClick={(ev) => handleClick("price", '0.00-20.00', ev)}><a href="#">$0.00 - $20.00</a></li>
                        <li onClick={(ev) => handleClick("price", '20.00-40.00', ev)}><a href="#">$20.00 - $40.00</a></li>
                        <li onClick={(ev) => handleClick("price", '40.00-50.00', ev)}><a href="#">$40.00 - $50.00</a></li>
                        <li onClick={(ev) => handleClick("price", '50.00-60.00', ev)}><a href="#">$50.00 - $60.00</a></li>
                        <li onClick={(ev) => handleClick("price", '60.00', ev)}><a href="#">$60.00 +</a></li>
                    </ul>
                </div>
            </div>

            <div className=" mb-20 col__20">
                <div className="product-filter">
                    <h5>Categories</h5>
                    <ul className="widget-nav-list">
                        <li onClick={(ev) => handleClick('category', '', ev)}><a href="#">All</a></li>
                        {data ? data.map(c => (
                            <li key={c.id}
                                onClick={(ev) => handleClick('category', c.id, ev)}>
                                <a href="#">{c.name}</a>
                            </li>
                        )) : null}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default withQuery(withRouter(FilterBar));