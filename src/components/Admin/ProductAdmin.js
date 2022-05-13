import React from 'react';
import ProductList from "../Shop/ProductList";

function ProductAdmin(props) {
    return (
        <>
            <div className='newProduct_div'>
                <button className='newProduct' onClick={() => props.handleClick("display7")}>
                    <i className="p-icon icon-plus"/> Add new product
                </button>
            </div>
            <ProductList handleClick={props.handleClick}/>
        </>

    );
}

export default ProductAdmin;