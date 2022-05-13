import React, {useState} from 'react';
import _ from "lodash";
import {getProductListRequest} from "../../store/actions/product";
import {useDispatch} from "react-redux";
import qs from "query-string";
import withQuery from "../../helpers/withQuery";

function FilterColorSize({...props}) {
    const [filter, setFilter] = useState({})
    const dispatch = useDispatch();

    const handleClick = (key, value, ev) => {
        ev.preventDefault()
        _.set(filter, key, [value])
        setFilter({...filter});
        props.filter = filter
        console.log(props)
        dispatch(getProductListRequest(filter, qs.stringify(props.query)));
    }
    return (
        <>
            <div className=" mb-20 col__20">
                <div className="product-filter">
                    <h5>Color</h5>
                    <ul className="widget-nav-list">
                        <li><a href="#" onClick={(ev) => handleClick('color', 'black', ev)}><span
                            className="swatch-color black"/> Black</a></li>
                        <li><a href="#" onClick={(ev) => handleClick('color', 'green', ev)}><span
                            className="swatch-color green"/> Green</a></li>
                        <li><a href="#" onClick={(ev) => handleClick('color', 'grey', ev)}><span
                            className="swatch-color grey"/> Grey</a></li>
                        <li><a href="#" onClick={(ev) => handleClick('color', 'red', ev)}><span
                            className="swatch-color red"/> Red</a></li>
                        <li><a href="#" onClick={(ev) => handleClick('color', 'white', ev)}><span
                            className="swatch-color white"/> White</a></li>
                        <li><a href="#" onClick={(ev) => handleClick('color', 'yellow', ev)}><span
                            className="swatch-color yellow"/> Yellow</a></li>
                    </ul>
                </div>
            </div>
            <div className=" mb-20 col__20">
                <div className="product-filter">
                    <h5>Size</h5>
                    <ul className="widget-nav-list">
                        <li><a href="#" onClick={(ev) => handleClick('size', 'large', ev)}>Large</a></li>
                        <li><a href="#" onClick={(ev) => handleClick('size', 'medium', ev)}>Medium</a></li>
                        <li><a href="#" onClick={(ev) => handleClick('size', 'small', ev)}>Small</a></li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default withQuery(FilterColorSize);