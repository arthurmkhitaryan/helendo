import React, {useEffect, useState} from 'react';
import {connect, useSelector} from "react-redux";
import {getProductListRequest} from "../../store/actions/product";
import {addCartRequest, getCartRequest} from "../../store/actions/cart";
import withRouter from "../../helpers/withRouter";
import {addWishlistRequest, getWishlistRequest} from "../../store/actions/wishlist";
import ReactPaginate from 'react-paginate';
import withQuery from "../../helpers/withQuery";
import UserModal from "../User/UserModal";
import qs from "query-string";
import QuickView from "./QuickView";

const ProductList = (props) => {
    const data = useSelector(state => state.product.productList.list)
    const list = useSelector(state => state.product.productList)
    const token = localStorage.getItem('token');

    const [state, setState] = useState({
        value: 1,
        open: false,
        id: '',
        openModal: false,
        role: 'all55',
    })

    useEffect(() => {
        props.getProductListRequest()
    }, [])


    const handleNavigate = (id) => {
        props.navigate(`/shop_online/single_product/${id}`)
    }

    const handleAddCart = async (count, productId) => {
        await props.addCartRequest({count, productId}, async () => {
            await props.getCartRequest()
        })
    }

    const handleAddWishlist = async (productId) => {
        await props.addWishlistRequest({productId}, async () => {
            await props.getWishlistRequest()
        })
    }

    const handleClick = (id) => {
        setState(prevState => ({
                ...prevState,
                open: true,
                id
            })
        )
    }

    const handleClose = () => {
        console.log('ok')
        setState(prevState => ({
            ...prevState,
            open: false
        }))
    }

    const handlePageClick = (event) => {
        const {query} = props;
        query.page = event.selected + 1
        props.navigate(`?page=${event.selected + 1}`)
        props.getProductListRequest({}, qs.stringify(query))
    }

    const handleClickModal = () => {
        setState(prevState => ({
            ...prevState,
            openModal: true
        }))
    }
    const handleCloseModal = () => {
        setState(prevState => ({
            ...prevState,
            openModal: false
        }))
    }

    const handleDelete = () => {
        setState(prevState => ({
            ...prevState,
            openModal: false
        }))
    }

    return (
        <>
            <div className="tab-content">
                <div className="tab-pane fade show active" id="tab_columns_01">
                    <div className="row">
                        {data ? data.map(d => (
                            <div className="col-lg-4 col-md-4 col-sm-6" key={d.id}>
                                <div className="single-product-item text-center">
                                    <div className="products-images">
                                        <img src={`http://localhost:4000${d.photo[0].url}`} className="img-fluid"
                                             alt="Product Images" width="300" height="300"
                                             onClick={() => handleNavigate(d.id)}/>
                                        {state.role === 'all'?
                                            <div className="product-actions">
                                            <button
                                                onClick={token && (() => props.handleClick("display7", d))}>
                                                <i className="p-icon icon-pencil"/></button>
                                            <button
                                                onClick={token ? () => handleDelete(d.id) : handleClickModal}>
                                                <i className="p-icon icon-trash"/></button>
                                        </div> :
                                            <div className="product-actions">
                                            <button data-bs-toggle="modal" data-bs-target="#prodect-modal"
                                                    onClick={() => handleClick(d.id)}><i
                                                className="p-icon icon-plus"/></button>
                                            {state.id === d.id ?
                                                <QuickView open={state.open} id={state.id}
                                                           handleClose={handleClose}/> : null}
                                            <button
                                                onClick={token ? () => handleAddCart(state.value, d.id) : handleClickModal}>
                                                <i className="p-icon icon-bag2"/></button>
                                            <button
                                                onClick={token ? () => handleAddWishlist(d.id) : handleClickModal}>
                                                <i className="p-icon icon-heart"/></button>
                                        </div>}
                                    </div>
                                    <div className="product-content" onClick={() => handleNavigate(d.id)}>
                                        <h6 className="prodect-title"><p>{d.name}</p></h6>
                                        <div className="prodect-price">
                                            <span className="new-price">${d.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : null}
                    </div>
                </div>
                <UserModal open={state.openModal} handleClose={handleCloseModal}/>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    pageRangeDisplayed={5}
                    pageCount={list.pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    className='product-pagination'
                    onPageChange={handlePageClick}
                />
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
    getProductListRequest,
    addCartRequest,
    addWishlistRequest,
    getCartRequest,
    getWishlistRequest
}

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList)

export default withQuery(withRouter(Container));

