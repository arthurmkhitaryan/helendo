import React, {Component} from 'react';

class SingleProductImage extends Component {
    render() {
        const {data} = this.props

        return (
            <>
              <div className="col-lg-7 col-md-6 col-sm-12 col-xs-12">
                <div className="product-details-left">
                    <div className="product-details-images-2 slider-lg-image-2">

                        <div className="easyzoom-style">
                            <div className="easyzoom easyzoom--overlay">
                                <a className="poppu-img">
                                    {data ?
                                    <img src= {`http://localhost:4000${data?.photo[0].url}`}
                                         className="img-fluid" alt=""/> : null }
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default SingleProductImage;
