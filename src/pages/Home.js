import React, {Component} from 'react';
import Wrapper from "../components/Wrapper";
import Banner from "../components/Banner";
import Slider from "../components/Slider";
import Brands from "../components/Brands";
import ReactLoading from 'react-loading';
import ProductList from "../components/Shop/ProductList";
import CategoryLine from "../components/CategoryLine";
import Video from "../components/Video";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    async componentDidMount() {
        this.setState({loading: false})
    }

    render() {
        const {loading} = this.state
        return (
            <>
                {loading ?
                    <ReactLoading type="spinningBubbles" color="black" width={300} className="loading"/> : null}
                <Wrapper>
                    <Slider/>

                    <div className="about-us-area section-space--ptb_120">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="about-us-content_6 text-center">
                                        <h2>Helendo Store</h2>
                                        <p>When you start with a portrait and search for a pure form, a clear
                                            volume, through successive eliminations,
                                            you arrive inevitably at the egg. Likewise, starting with the egg and
                                            following the same process in reverse,
                                            one finishes with the portrait.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Video/>
                    <Brands/>
                    <CategoryLine>
                        <ProductList/>
                    </CategoryLine>

                </Wrapper>
            </>
        );
    }
}

export default Home;
