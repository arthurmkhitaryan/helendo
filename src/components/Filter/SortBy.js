import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import _ from "lodash";
import {getProductListRequest} from "../../store/actions/product";
import qs from "query-string";
import withQuery from "../../helpers/withQuery";

function SortBy(props) {
    const [formData, setFormData] = useState({})
    const dispatch = useDispatch();

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
        console.log(query)
        dispatch(getProductListRequest({}, qs.stringify(query)));
    }
    return (
        <div className="col-lg-6 col-md-6">
            <div className="shop-toolbar__items shop-toolbar__item--left">
                <div className="shop-toolbar__item shop-short-by">
                    <ul>
                        <li>
                            <a href="#">Sort by <i className="fa fa-angle-down angle-down"/></a>
                            <ul>
                                <li onClick={(ev) => handleClick("sortby", 'rating', ev)}><a href="#">Sort by average
                                    rating</a></li>
                                <li onClick={(ev) => handleClick("price", '0.00-20.00', ev)}><a href="#">Sort by
                                    latest</a></li>
                                <li onClick={(ev) => handleClick("sortby", 'price', ev)}><a href="#">Sort by price: low
                                    to high</a></li>
                                <li onClick={(ev) => handleClick("sortby", 'price', ev)}><a href="#">Sort by price: high
                                    to low</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default withQuery(SortBy);