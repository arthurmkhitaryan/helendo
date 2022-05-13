import React, {useState} from 'react';
import FilterColorSize from "./FilterColorSize";
import FilterBar from "./FilterBar";
import SortBy from "./SortBy";

function Filter({...props}) {
    const [state, setState] = useState({
        clicked: false,
        display: '',
        btn: 'plus'
    })

    const handleOpen = (display) => {
        setState(prevState => ({
                ...prevState,
                display,
                clicked: true,
                btn: 'minus'
            })
        )
    }

    const handleClose = () => {
        setState(prevState => ({
                ...prevState,
                display: '',
                clicked: false,
                btn: 'plus'
            })
        )
    }

    return (
        <div>
            <div className="tab-content">
                <div className="row">
                    <SortBy/>
                    <div className="col-lg-6 col-md-6">
                        <div className="shop-toolbar__items shop-toolbar__item--right">
                            <div className="shop-toolbar__items-wrapper">
                                <div className="shop-toolbar__item shop-toolbar__item--filter ">
                                    <div className="shop-filter-active">
                                        <button
                                            onClick={state.btn === 'plus' ? () => handleOpen("display") : handleClose}
                                            className={`${state.clicked && state.display === "display" ? "active" : null}`}
                                            data-bs-toggle="tab">Filter <i
                                            className={state.btn === 'plus' ? "p-icon icon-plus" : 'icon-minus'}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {state.display === "display" ?
                    <div className="product-filter-wrapper">
                        <div className="row">
                            <FilterColorSize/>
                            <FilterBar/>
                        </div>
                    </div>
                    : null}
            </div>
        </div>
    );
}

export default Filter;
