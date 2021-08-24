import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Footer from '../../../components/footer';
import { Tabs, Spin } from "antd";
import Details from './Details';
import InformationAndTerms from './InformationAndTerms';
import axios from "../../../utils/request";
import { BASE_URL } from "../../../utils";
import { ONE_PRODUCT } from "../../../utils/constant";
import LastAuctionsSection from './LastAuctionsSection';



function OneArtworkAuctions(props) {

    const { TabPane } = Tabs;
    const [activeKey, setActiveKey] = useState("1");
    const [data, setData] = useState({})
    const [Auction, setAuction] = useState([]);
    const [HouseDetail, setHouseDetail] = useState([])
    const [Active, setActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [artwork, setArtwork] = useState()
    const [artwork_id, setArtwork_id] = useState()

    const history = useHistory()
    const Like = () => {
        setActive(!Active)
    }

    const callback = (key) => {
        console.log(key);
        setActiveKey(key)
    }


    console.log("artwork --->>>> ", artwork?.details);



    const getProduct = () => {
        setLoading(true)
        axios.get(`${BASE_URL}${ONE_PRODUCT(props.match.params.id)}`).then(res => {
            setArtwork(res.data.data.result)
            setArtwork_id(res.data.data.result.latest_auction.id)
            setLoading(false)
        }).catch(err => {
            console.error(err)
            setLoading(false)
        })
    }


    const getAuction = () => {
        setLoading(true)
        axios.get(`${BASE_URL}/sale/auctions/${props.match.params.id}/`)
            .then(resp => {
                if (resp.data.code === 200) {
                    setAuction(resp.data.data.result)
                    axios.get(`${BASE_URL}/account/home-auction/${resp.data.data.result?.house?.id}/`).then(res => {
                        setHouseDetail(res.data.data.result);
                    }).catch(err => {
                        console.error(err)
                    })
                }
                getProduct()
                setLoading(false)

            })
            .catch(err => {
                console.error(err);
                setLoading(false)
            })
    }

    useEffect(() => {
        getProduct();
    }, [])

    useEffect(() => {
        getAuction();
    }, [])

    const addBookmark = (data, action) => {
        if (action) {
            axios.delete(`${BASE_URL}/following/${data}`)
                .then(resp => {
                    getProduct()
                })
        } else {
            axios.post(`${BASE_URL}/following/`, {
                "content_type": "product",
                "object_id": data,
                "activity_type": "mark"
            })
                .then(resp => {
                    if (resp.data.code === 201) {
                        getProduct()
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
                            <h2 className="main-title">{artwork?.artwork_title}</h2>
                            <h5 className="auction-house-name">{artwork?.latest_auction?.house?.home_auction_name}</h5>
                        </div>
                        <button type="button" className="share">
                            <i className="fal fa-share-alt"></i>
                        </button>
                    </div>

                    <div className="main-content">
                        <div className="fw-block">
                            <div className="flex-between">
                                <div className="flex-col">
                                    <div className="lot-arrow">
                                        {/* <i className="fal fa-chevron-right"></i><span>لت قبلی</span> */}
                                    </div>
                                </div>
                                <div className="flex-col">
                                    <h6 className="default">{artwork?.artwork_title}</h6>
                                </div>
                                <div className="flex-col">
                                    <div className="flex-col">
                                        <div className="lot-arrow">
                                            {/* <span>لت بعدی</span> */}
                                            {/* <i className="fal fa-chevron-left"></i> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mrgt15 ">
                                <div className="col artwork-bigimg">
                                    <img src={artwork?.media.exact_url} width="493" height="621" className="" alt="" />
                                </div>
                            </div>
                            <div className="flex-between mrgt15">
                                <div className="flex-col">
                                    <h5 className="artist-name">{artwork?.persian_artist_name}</h5>
                                    <h5 className="auction-house-name">{artwork?.latest_auction?.house?.home_auction_name}</h5>
                                </div>
                                <div className="flex-col">
                                    <button
                                        onClick={() =>
                                            addBookmark(
                                                artwork?.following?.bookmark?.is_active ?
                                                    artwork?.following?.bookmark?.id :
                                                    artwork?.id, artwork?.following?.bookmark?.is_active)
                                        }
                                        type="button"
                                        className={"btn-favorite " + (artwork?.following?.bookmark?.is_active ? "active" : "")}
                                    ></button>
                                </div>
                            </div>
                            <div className="flex-between mrgt15">

                                <div className="flex-col">
                                    <span className="price-title">ارسال پیشنهاد زنده</span>
                                    {/* <h6 className="default">2 روز بعد</h6> */}
                                </div>
                            </div>
                        </div>

                        <LastAuctionsSection artwork_id={artwork_id} />

                        <Tabs activeKey={activeKey} onChange={callback} className="nav nav-pills nav-justified main-tab " unmountInactiveTabs={true}>
                            <TabPane tab="جزئیات" key="1" className="nav-link nav-item " >
                                <Details data={data} artwork={artwork} />
                            </TabPane>
                            <TabPane tab="اطلاعات و شروایط" key="2" className="nav-link nav-item " >
                                <InformationAndTerms data={data} Auction={Auction} />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </Spin>
            <Footer />
        </>
    )
}

export default OneArtworkAuctions;