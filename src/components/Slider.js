import React, {Component} from 'react';
import {connect} from "react-redux";
import Carousel from 'nuka-carousel';
import {getCarouselListRequest} from "../store/actions/slider";
import ReactLoading from 'react-loading';

class Slider extends Component {
    async componentDidMount() {
        await this.props.getCarouselListRequest('banner')
    }

    renderCenterRightControls = (props) => {
        // if (props.currentSlide + 1 === props.slideCount) {
        //     return null
        // }
        return <div onClick={props.nextSlide}><span className="arrow-next"><i className="icon-chevron-right"/></span>
        </div>
    }

    renderCenterLeftControls = (props) => {
        if (props.currentSlide === props.top) {
            return null
        }
        return <div onClick={props.previousSlide}><span className="arrow-prv"><i
            className="icon-chevron-left"/></span></div>
    }

    renderBottomCenterControls = (props) => {
        return <div className="dotsContainer">{this.props.data.map((s) => (
            <img onClick={props.goToSlide.bind(null, s.id - 1)} className="carousel_dots_img"
                 src={`../products/${s.src}`} alt=""/>))}  </div>
    };

    render() {
        const {data} = this.props;
        return (
            <div className="hero-area hero-slider-7">
                <Carousel
                    renderCenterRightControls={({...props}) => this.renderCenterRightControls(props)}
                    renderCenterLeftControls={({...props}) => this.renderCenterLeftControls(props)}
                    renderBottomCenterControls={({...props}) => this.renderBottomCenterControls(props)}
                    autoplay={true}
                    wrapAround={true}>

                    {data ? data.map(d => (
                        <div className="single-hero-slider-7 slider-div" key={d.id}>
                            <img src={`http://localhost:4000${d.image}`} width="2000"
                                 height="900" className="img-fluid slider-img" alt="Image"/>
                            <div className='layout'><h4 className="slider_desc">{d.description}</h4></div>
                        </div>)) : null}
                </Carousel>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
        data: state.slider.sliderList,
    }
)

const mapDispatchToProps = {
    getCarouselListRequest
}

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Slider)

export default Container;