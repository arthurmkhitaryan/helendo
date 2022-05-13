import React, {Component} from 'react';
import Wrapper from "../components/Wrapper";
import Banner from "../components/Banner";
import p1 from "../assets/images/blog/1-1170x370.webp";
import p2 from "../assets/images/blog/2-1170x370.webp"
import p3 from "../assets/images/blog/3-1170x370.webp";
import p4 from "../assets/images/blog/4-1170x370.webp";
import p5 from "../assets/images/blog/5-1170x370.webp";
import p6 from "../assets/images/blog/6-1170x370.webp";


class Blog extends Component {
    render() {
        return (
            <div>
                <Wrapper>
                <Banner bannerData='Blog'/>

                <div className="site-wrapper-reveal border-bottom">

                    {/*-- Blog Page Area Start --*/}
                    <div className="blog-page-wrapper section-space--pt_60 section-space--pb_120">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    {/*-- Single Blog Item Start --*/}
                                    <div className="single-blog-item section-space--mt_60">
                                        <div className="blog-thumbnail-box">
                                            <a href="#" className="thumbnail">
                                                <img src={p1} className="img-fluid"
                                                     alt="Blog Images"/>
                                            </a>
                                        </div>
                                        <div className="blog-contents text-center">
                                            <h3 className="blog-title-lg"><a href="#">Interior design is the art, the
                                                interior designer is the artist.</a></h3>
                                            <div className="meta-tag-box justify-content-center">
                                                <div className="meta date"><span>October 16, 2022</span></div>
                                                <div className="meta author"><span><a href="#">Hastheme</a></span></div>
                                                <div className="meta cat"><span>in <a href="#">Chair</a></span></div>
                                            </div>

                                            <p className="mt-30 d_text m-auto">Contrary to popular belief, Lorem Ipsum
                                                indignation and dislike men who are so beguiled and demoralized by the
                                                charms of pleasure of the moment, so blinded by desire, that they cannot
                                                foresee the pain and trouble that are bound to ensue; and equal blame
                                                belongs to those who fail in…</p>
                                            <div className="button-box mt-40">
                                                <a href="#" className="btn btn--md btn--border_1"> Read more </a>
                                            </div>
                                        </div>
                                    </div>
                                    {/*-- Single Blog Item End --*/}
                                </div>
                                <div className="col-lg-12">
                                    {/*-- Single Blog Item Start --*/}
                                    <div className="single-blog-item section-space--mt_60">
                                        <div className="blog-thumbnail-box">
                                            <a href="#" className="thumbnail">
                                                <img src={p2} className="img-fluid"
                                                     alt="Blog Images"/>
                                            </a>
                                        </div>
                                        <div className="blog-contents text-center">
                                            <h3 className="blog-title-lg"><a href="#">Decorate your home with the most
                                                modern furnishings.</a></h3>
                                            <div className="meta-tag-box justify-content-center">
                                                <div className="meta date"><span>October 02, 2022</span></div>
                                                <div className="meta author"><span><a href="#">Hastheme</a></span></div>
                                                <div className="meta cat"><span>in <a href="#">Chair</a></span></div>
                                            </div>

                                            <p className="mt-30 d_text m-auto">Contrary to popular belief, Lorem Ipsum
                                                indignation and dislike men who are so beguiled and demoralized by the
                                                charms of pleasure of the moment, so blinded by desire, that they cannot
                                                foresee the pain and trouble that are bound to ensue; and equal blame
                                                belongs to those who fail in…</p>
                                            <div className="button-box mt-40">
                                                <a href="#" className="btn btn--md btn--border_1"> Read more </a>
                                            </div>
                                        </div>
                                    </div>
                                    {/*-- Single Blog Item End --*/}
                                </div>
                                <div className="col-lg-12">
                                    {/*-- Single Blog Item Start --*/}
                                    <div className="single-blog-item section-space--mt_60">
                                        <div className="blog-thumbnail-box">
                                            <a href="#" className="thumbnail">
                                                <img src={p3} className="img-fluid"
                                                     alt="Blog Images"/>
                                            </a>
                                        </div>
                                        <div className="blog-contents text-center">
                                            <h3 className="blog-title-lg"><a href="#">Spatialize with the decorations of
                                                the Helendo store.</a></h3>
                                            <div className="meta-tag-box justify-content-center">
                                                <div className="meta date"><span>October 02, 2022</span></div>
                                                <div className="meta author"><span><a href="#">Hastheme</a></span></div>
                                                <div className="meta cat"><span>in <a href="#">Chair</a></span></div>
                                            </div>

                                            <p className="mt-30 d_text m-auto">Contrary to popular belief, Lorem Ipsum
                                                indignation and dislike men who are so beguiled and demoralized by the
                                                charms of pleasure of the moment, so blinded by desire, that they cannot
                                                foresee the pain and trouble that are bound to ensue; and equal blame
                                                belongs to those who fail in…</p>
                                            <div className="button-box mt-40">
                                                <a href="#" className="btn btn--md btn--border_1"> Read more </a>
                                            </div>
                                        </div>
                                    </div>
                                    {/*-- Single Blog Item End --*/}
                                </div>
                                <div className="col-lg-12">
                                    {/*-- Single Blog Item Start --*/}
                                    <div className="single-blog-item section-space--mt_60">
                                        <div className="blog-thumbnail-box">
                                            <a href="#" className="thumbnail">
                                                <img src={p4} className="img-fluid"
                                                     alt="Blog Images"/>
                                            </a>
                                        </div>
                                        <div className="blog-contents text-center">
                                            <h3 className="blog-title-lg"><a href="#">Unique products that will impress
                                                your home in 2022.</a></h3>
                                            <div className="meta-tag-box justify-content-center">
                                                <div className="meta date"><span>October 02, 2022</span></div>
                                                <div className="meta author"><span><a href="#">Hastheme</a></span></div>
                                                <div className="meta cat"><span>in <a href="#">Chair</a></span></div>
                                            </div>

                                            <p className="mt-30 d_text m-auto">Contrary to popular belief, Lorem Ipsum
                                                indignation and dislike men who are so beguiled and demoralized by the
                                                charms of pleasure of the moment, so blinded by desire, that they cannot
                                                foresee the pain and trouble that are bound to ensue; and equal blame
                                                belongs to those who fail in…</p>
                                            <div className="button-box mt-40">
                                                <a href="#" className="btn btn--md btn--border_1"> Read more </a>
                                            </div>
                                        </div>
                                    </div>
                                    {/*-- Single Blog Item End --*/}
                                </div>
                                <div className="col-lg-12">
                                    {/*-- Single Blog Item Start --*/}
                                    <div className="single-blog-item section-space--mt_60">
                                        <div className="blog-thumbnail-box">
                                            <a href="#" className="thumbnail">
                                                <img src={p5} className="img-fluid"
                                                     alt="Blog Images"/>
                                            </a>
                                        </div>
                                        <div className="blog-contents text-center">
                                            <h3 className="blog-title-lg"><a href="#">Intelligent, award-winning product
                                                of the designer Thomas in 2022.</a></h3>
                                            <div className="meta-tag-box justify-content-center">
                                                <div className="meta date"><span>October 02, 2022</span></div>
                                                <div className="meta author"><span><a href="#">Hastheme</a></span></div>
                                                <div className="meta cat"><span>in <a href="#">Chair</a></span></div>
                                            </div>

                                            <p className="mt-30 d_text m-auto">Contrary to popular belief, Lorem Ipsum
                                                indignation and dislike men who are so beguiled and demoralized by the
                                                charms of pleasure of the moment, so blinded by desire, that they cannot
                                                foresee the pain and trouble that are bound to ensue; and equal blame
                                                belongs to those who fail in…</p>
                                            <div className="button-box mt-40">
                                                <a href="#" className="btn btn--md btn--border_1"> Read more </a>
                                            </div>
                                        </div>
                                    </div>
                                    {/*-- Single Blog Item End --*/}
                                </div>
                                <div className="col-lg-12">
                                    {/*-- Single Blog Item Start --*/}
                                    <div className="single-blog-item section-space--mt_60">
                                        <div className="blog-thumbnail-box">
                                            <a href="#" className="thumbnail">
                                                <img src={p6} className="img-fluid"
                                                     alt="Blog Images"/>
                                            </a>
                                        </div>
                                        <div className="blog-contents text-center">
                                            <h3 className="blog-title-lg"><a href="#">The story of Helen Do’s lights in
                                                USA</a></h3>
                                            <div className="meta-tag-box justify-content-center">
                                                <div className="meta date"><span>October 02, 2022</span></div>
                                                <div className="meta author"><span><a href="#">Hastheme</a></span></div>
                                                <div className="meta cat"><span>in <a href="#">Chair</a></span></div>
                                            </div>

                                            <p className="mt-30 d_text m-auto">Contrary to popular belief, Lorem Ipsum
                                                indignation and dislike men who are so beguiled and demoralized by the
                                                charms of pleasure of the moment, so blinded by desire, that they cannot
                                                foresee the pain and trouble that are bound to ensue; and equal blame
                                                belongs to those who fail in…</p>
                                            <div className="button-box mt-40">
                                                <a href="#" className="btn btn--md btn--border_1"> Read more </a>
                                            </div>
                                        </div>
                                    </div>
                                    {/*-- Single Blog Item End --*/}
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <ul className="page-pagination text-start mt-40">
                                        <li><span className="page-numbers current">1</span></li>
                                        <li><a className="page-numbers" href="#">2</a></li>
                                        <li><a className="next page-numbers" href="#">Next Page<i
                                            className="icon-chevron-right"/></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/*-- Blog Page Area End --*/}

                </div>


                </Wrapper>
            </div>
        );
    }
}

export default Blog;
