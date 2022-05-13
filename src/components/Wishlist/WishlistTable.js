import React, {Component} from 'react';
import {getWishlistRequest} from "../../store/actions/wishlist";
import {connect} from "react-redux";
import withRouter from "../../helpers/withRouter";
import WishlistProducts from "./WishlistProducts";


class WishlistTable extends Component {

    async componentDidMount() {
        await this.props.getWishlistRequest()
    }

    async componentDidUpdate(prevProps, prevState) {
        // console.log(prevState,prevProps )
        // if (prevProps.data !== this.props.data) {
        //     await this.props.getCartRequest()
        //     console.log('pokemons state has changed.')
        // }
    }



    render() {
        const {list} = this.props.data;
        console.log(list)
        return (
            <form action="#">
                <div
                    className="table-content table-responsive cart-table-content header-color-gray">
                    <table>
                        <thead>
                        <tr className="bg-gray">

                            <th className="product-name">Product</th>
                            <th/>
                            <th className="product-price"> Price</th>
                            <th/>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {list ? list.map(l => (<WishlistProducts data={l}/>)) : null}
                        </tbody>
                    </table>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => (
    {
        data: state.wishlist.wishlistList,
    }
)

const mapDispatchToProps = {
    getWishlistRequest
}

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(WishlistTable)

export default withRouter(Container);
