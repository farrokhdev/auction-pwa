import React, { useState } from 'react'
import pic1thumb from '../../../assets/img/pic1-thumb.jpg';
import pic2thumb from '../../../assets/img/pic2-thumb.jpg';
import pic3thumb from '../../../assets/img/pic3-thumb.jpg';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { Tabs } from "antd";
import InformationAndTerms from '../OneArtworkAuctions/InformationAndTerms';
import Footer from '../../../components/footer';
import Products from './Products';

function AuctionsDetails() {

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
                <div className="top-header flex-between">
                    <Link to="/auctions">
                        <button type="button" className="btn-back"><i className="fal fa-chevron-left"></i></button>
                    </Link>
                    <div className="inner-title text-center">
                        <h2 className="main-title">ایران مدرن</h2>
                        <h5 className="auction-house-name">گالری آرتیبیشن</h5>
                    </div>
                    <button type="button" className="share">
                        <i className="fal fa-share-alt"></i>
                    </button>
                </div>
                <div className="main-content" id="auction-detail">
                    <div className="fw-block ">
                        <div className="owl-carousel auction-details-img dirltr">
                            <Slider className="mt-1" {...settings}>
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
                        <div className="flex-between mrgt10 pt-3">
                            <div className="flex-col">
                                <span className="price-title">شروع</span>
                                <h6 className="default">19 شهریور 1400 - 10:00</h6>
                            </div>
                            <div className="flex-col">
                                <span className="price-title">پایان</span>
                                <h6 className="default">21 شهریور 1400 - 22:00</h6>
                            </div>
                            <div className="flex-col">
                                <span className="price-title">تعداد لت‌ها</span>
                                <h6 className="default">120</h6>
                            </div>
                        </div>
                        <div className="flex-between mrgt10">
                            <div className="flex-col">
                                <span className="price-title">تخمین</span>
                                <h6 className="default">2000-5000<span className="unit"> تومان</span></h6>
                            </div>
                            <div className="flex-col">
                                <span className="price-title">ارسال پیشنهاد زنده</span>
                                <h6 className="default">2 روز بعد</h6>
                            </div>
                            <div className="flex-col">
                                <Link to="/auction-registration">
                                <button type="button" className="btn-main">عضویت در حراج</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Tabs activeKey={activeKey} onChange={callback} className="nav nav-pills nav-justified main-tab " unmountInactiveTabs={true}>
                    <TabPane tab="لت ها" key="1" className="nav-link nav-item " >
                        <Products data={data} getProfile={setData}/>
                    </TabPane>
                    <TabPane tab="جزئیات" key="2" className="nav-link nav-item " >
                        <InformationAndTerms data={data} getProfile={setData} />
                    </TabPane>
                </Tabs>
            </div>
            <Footer />
        </>
    )
}

export default AuctionsDetails;