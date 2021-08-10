import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import pic1 from '../../../assets/img/pic1.jpg';
import Footer from '../../../components/footer';
import pic1thumb from '../../../assets/img/pic1-thumb.jpg';
import pic2thumb from '../../../assets/img/pic2-thumb.jpg';
import pic3thumb from '../../../assets/img/pic3-thumb.jpg';
import { Tabs } from "antd";
import Details from './Details';
import InformationAndTerms from './InformationAndTerms';
import Slider from "react-slick";



function OneArtworkAuctions() {

    const { TabPane } = Tabs;
    const [activeKey, setActiveKey] = useState("1");
    const [data, setData] = useState({})

    const [Active, setActive] = useState(false);

    const Like = () => {
        setActive(!Active)
    }


    const callback = (key) => {
        console.log(key);
        setActiveKey(key)
    }

    const settings = {
        // dots: false,
        // breakpoint: 1024,
        // infinite: false,
        // speed: 500,
        // slidesToShow: 4,
        // slidesToScroll: 4,
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <>
            <div className="container">
                <div class="top-header flex-between">
                    <Link to="/auctions/details">
                        <button type="button" class="btn-back"><i class="fal fa-chevron-left"></i></button>
                    </Link>
                    <div class="inner-title text-center">
                        <h2 class="main-title">دختری پشت پنجره</h2>
                        <h5 class="auction-house-name">ایران مدرن</h5>
                    </div>
                    <button type="button" class="share">
                        <i class="fal fa-share-alt"></i>
                    </button>
                </div>

                <div class="main-content">
                    <div class="fw-block">
                        <div class="flex-between">
                            <div class="flex-col">
                                <div class="lot-arrow">
                                    <i class="fal fa-chevron-right"></i><span>لت قبلی</span>
                                </div>
                            </div>
                            <div class="flex-col">
                                <h6 class="default">لت 22</h6>
                            </div>
                            <div class="flex-col">
                                <div class="flex-col">
                                    <div class="lot-arrow">
                                        <span>لت بعدی</span>
                                        <i class="fal fa-chevron-left"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mrgt15 ">
                            <div class="col artwork-bigimg">
                                <img src={pic1} width="493" height="621" class="" alt="" />
                            </div>
                        </div>
                        <div class="flex-between mrgt15">
                            <div class="flex-col">
                                <h5 class="artist-name">سهراب سپهری</h5>
                                <h5 class="auction-house-name">گالری آرتیبیشن</h5>
                            </div>
                            <div class="flex-col">
                                <button
                                    onClick={() =>
                                        Like()}
                                    type="button"
                                    className={"btn-favorite " + (Active ? "active" : "")}
                                ></button>
                            </div>
                        </div>
                        <div class="flex-between mrgt15">

                            <div class="flex-col">
                                <span class="price-title">ارسال پیشنهاد زنده</span>
                                <h6 class="default">2 روز بعد</h6>
                            </div>
                        </div>
                    </div>

                    <div class="fw-block">
                        <h6 class="default">موراد بیشتر در این حراج</h6>
                        <div class="owl-carousel auction-details-img mrgt10 dirltr">
                        <Slider className="mt-1 mb-2" {...settings}>
                                {[1, 2, 3, 4, 5, 6].map((item, key) => {
                                    return (

                                        <div className=" " key={key}>
                                            <div className="artwork-img">

                                                <img src={pic1thumb} width="998" height="880" alt=""
                                                    className="img-fluid px-1" />


                                            </div>

                                        </div>
                                    )
                                })}

                            </Slider>
                        </div>
                    </div>

                    {/* {
                        [1].map((item) => {
                            return (

                                <div className="fw-block">
                                    <h6 class="default">موراد بیشتر در این حراج</h6>
                                    <div className="img-block">
                                        <div className="row">
                                            <div className="col g-0">
                                                <Link to="/auctions">
                                                    <img src={pic1thumb} width="493" height="493" alt="Smart Auction"
                                                        className="img-fluid" />
                                                </Link>
                                            </div>
                                            <div className="col g-0">
                                                <Link to="/auctions">
                                                    <img src={pic2thumb} width="880" height="880" alt="Smart Auction"
                                                        className="img-fluid" />
                                                </Link>
                                            </div>
                                            <div className="col g-0">
                                                <Link to="/auctions">
                                                    <img src={pic3thumb} width="880" height="880" alt="Smart Auction"
                                                        className="img-fluid" />
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    } */}

                    <Tabs activeKey={activeKey} onChange={callback} className="nav nav-pills nav-justified main-tab " unmountInactiveTabs={true}>
                        <TabPane tab="جزئیات" key="1" className="nav-link nav-item " >
                            <Details data={data} getProfile={setData} />
                        </TabPane>
                        <TabPane tab="اطلاعات و شروایط" key="2" className="nav-link nav-item " >
                            <InformationAndTerms data={data} getProfile={setData} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default OneArtworkAuctions;