import React, {Component} from 'react';

class Banner extends Component {
    render() {
        const {bannerData} = this.props
        return (
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row breadcrumb_box  align-items-center">
                                <div className="col-lg-6 col-md-6 col-sm-6 text-center text-sm-start">
                                    <h2 className="breadcrumb-title">{bannerData}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Banner;
