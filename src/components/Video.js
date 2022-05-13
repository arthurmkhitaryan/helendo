import React, {Component} from 'react';

class Video extends Component {
    render() {
        return (
            <div className="banner-video-area overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="banner-video-box">
                                <img src="https://www.thespruce.com/thmb/mj57Tjew3HR5eVnplxKCq1X7jeg=/2119x1192/smart/filters:no_upscale()/GettyImages-1161177015-f1de4ba58a6c4f50969d9119d80405a6.jpg"
                                     alt=""/>
                                    <div className="video-icon">
                                        <a href="https://www.youtube.com/watch?v=eOnBro6TPQ4&t=3s" className="popup-youtube" target="_blank"><i
                                            className="linear-ic-play"/></a>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Video;
