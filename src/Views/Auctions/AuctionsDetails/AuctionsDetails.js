import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import { Link, useHistory } from 'react-router-dom';
import { Tabs } from "antd";
import InformationAndTerms from '../OneArtworkAuctions/InformationAndTerms';
import Footer from '../../../components/footer';
import Products from './Products';
import axios from "../../../utils/request";
import { BASE_URL } from "../../../utils";
import queryString from 'query-string';
import Breadcrumbs from '../../../components/Breadcrumbs';
import moment from "jalali-moment";
import { Pagination, Spin } from "antd";


function AuctionsDetails(props) {

    const { TabPane } = Tabs;
    const [activeKey, setActiveKey] = useState("1");
    const [data, setData] = useState({})

    const [Active, setActive] = useState(false);
    const [Auction, setAuction] = useState([]);
    const [Product, setProduct] = useState([]);
    const [countProducts, setCountProducts] = useState(0)
    // const [reminder, setReminder] = useState(false)
    const [loading, setLoading] = useState(false)
    const [HouseDetail, setHouseDetail] = useState([])

    const history = useHistory()

    const id = props.match.params.id;
    const [params, setParams] = useState({
        page: 1,
        page_size: 10,
        auctions__id: id,
        search: "",
        ordering: "id",
    })

    const queries = queryString.stringify(params);

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
              slidesToShow: 2,
              slidesToScroll: 5,
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
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
        ]
    };

    const getProducts = () => {
        axios.get(`${BASE_URL}/sale/product/?${queries}`)
            .then(resp => {
                if ((resp.data.code === 200) && resp.data?.data?.result) {
                    const res = resp.data?.data?.result;
                    setProduct(res)
                    setCountProducts(resp.data?.data?.count)
                }
            })
            .catch(err => {
                console.error(err);
                setLoading(false)
            })
    }

    const getAuction = () => {
        setLoading(true)
        axios.get(`${BASE_URL}/sale/auctions/${id}/`)
            .then(resp => {
                if (resp.data.code === 200) {
                    setAuction(resp.data.data.result)
                    axios.get(`${BASE_URL}/account/home-auction/${resp.data.data.result?.house?.id}/`).then(res => {
                        setHouseDetail(res.data.data.result);
                    }).catch(err => {
                        console.error(err)
                    })
                }
                getProducts()
                setLoading(false)

            })
            .catch(err => {
                console.error(err);
                setLoading(false)
            })
    }

    useEffect(() => {
        getAuction()
    }, [params])

    useEffect(() => {
        getProducts()
    }, [params])

    
    const addBookmark = (data, action) => {
        if (action) {
            axios.delete(`${BASE_URL}/following/${data}`)
                .then(resp => {
                    getProducts()
                })
        } else {
            axios.post(`${BASE_URL}/following/`, {
                "content_type": "product",
                "object_id": data,
                "activity_type": "mark"
            })
                .then(resp => {
                    if (resp.data.code === 201) {
                        getProducts()
                    }

                })
                .catch(err => {
                    console.error(err);
                })

        }
    }


    return (
        <>

            <Spin spinning={loading}>

                <div className="container">
                    <div className="top-header flex-between">

                        <button onClick={() => history.goBack()} type="button" className="btn-back"><i className="fal fa-chevron-left"></i></button>

                        <div className="inner-title text-center">
                            <h2 className="main-title">{Auction.title}</h2>
                            <h5 className="auction-house-name">{HouseDetail.home_auction_name}</h5>
                        </div>
                        <button type="button" className="share">
                            <i className="fal fa-share-alt"></i>
                        </button>
                    </div>


                    <div className="main-content" id="auction-detail">
                        <div className="fw-block ">
                            <div className="owl-carousel auction-details-img dirltr">

                                <Slider className="mt-1" {...settings}>
                                    {Product.map((item, key) => {
                                        return (
                                            <div key={key}>
                                                <div className="artwork-img">
                                                    <img src={item.media.exact_url} style={{minHeight : '120px'}} alt="" className="img-fluid px-1" />
                                                </div>
                                            </div>
                                        )
                                    })}

                                </Slider>

                            </div>
                            <div className="flex-between mrgt10 pt-3">
                                <div className="flex-col">
                                    <span className="price-title">شروع</span>
                                    <h6 className="default">
                                        {Auction?.start_time !== 'None' ? moment.from(Auction?.start_time, 'YYYY/MM/DD').locale('fa').format('DD MMM') : ""}
                                    </h6>
                                </div>
                                <div className="flex-col">
                                    <span className="price-title">پایان</span>
                                    <h6 className="default">
                                        {Auction?.end_time !== 'None' ? moment.from(Auction?.end_time, 'YYYY/MM/DD').locale('fa').format('DD MMM') : ""}
                                    </h6>
                                </div>
                                <div className="flex-col">
                                    <span className="price-title">تعداد لت‌ها</span>
                                    <h6 className="default">{countProducts}</h6>
                                </div>
                            </div>
                            <div className="flex-between mrgt10">
                                <div className="flex-col">
                                    <span className="price-title">تخمین</span>
                                    <h6 className="default">
                                        {/* 2000-5000 */}
                                        <span className="unit"> تومان</span>
                                    </h6>
                                </div>
                                <div className="flex-col">
                                    <span className="price-title">ارسال پیشنهاد زنده</span>
                                    {/* <h6 className="default">2 روز بعد</h6> */}
                                </div>
                                <div className="flex-col">
                                    {Auction.status === "CLOSED" ?
                                        <button type="button" className="btn-main">حراج به
                                            پایان رسید</button>
                                        :
                                        <Link to={`/auction-registration/${Auction?.id}`}>
                                            <button type="button" className="btn-main">

                                                {Auction.status !== "CLOSED" ? "عضویت در حراج" : "ثبت نطر"}
                                            </button>
                                        </Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <Tabs activeKey={activeKey} onChange={callback} className="nav nav-pills nav-justified main-tab " unmountInactiveTabs={true}>
                        <TabPane tab="لت ها" key="1" className="nav-link nav-item " >
                            <Products data={data} product={Product} addBookmark={addBookmark} />
                        </TabPane>
                        <TabPane tab="جزئیات" key="2" className="nav-link nav-item " >
                            <InformationAndTerms data={data} Auction={Auction} />
                        </TabPane>
                    </Tabs>
                </div>
            </Spin>

            <Footer />
        </>
    )
}

export default AuctionsDetails;