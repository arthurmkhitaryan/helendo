import React, {Component} from 'react';
import StarRatings from 'react-star-ratings';
import {connect} from "react-redux";
import {setRatingRequest} from "../../store/actions/rating";
import {getSingleProductRequest} from "../../store/actions/product";

class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: this.props.data.id
        }
    }

    changeRating = async (newRating, productId) => {
        await this.props.setRatingRequest({grade: newRating, productId}, async () => {
            await this.props.getSingleProductRequest(productId)
        })
    }

    render() {
        const {data} = this.props
        return (
            <StarRatings
                rating={data.rating}
                starRatedColor="#f5a623"
                changeRating={this.changeRating}
                numberOfStars={5}
                name='rating'
                starDimension="25px"
                starSpacing="3px"
                starHoverColor='#f5a623'
            />
        );
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
    setRatingRequest,
    getSingleProductRequest
}

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Rating)

export default Container;
