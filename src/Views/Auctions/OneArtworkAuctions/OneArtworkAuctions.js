import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Footer from '../../../components/footer';
import { Tabs, Spin, Button, Form, message, Input } from "antd";
import Details from './Details';
import InformationAndTerms from './InformationAndTerms';
import axios from "../../../utils/request";
import { BASE_URL, WEB_SOCKET_BASE_URL } from "../../../utils";
import { ONE_PRODUCT } from "../../../utils/constant";
import LastAuctionsSection from './LastAuctionsSection';
import { useSelector } from "react-redux";
import { BID } from "../../../utils/constant";
import { Link } from "react-router-dom";
// import {BASE_URL, WEB_SOCKET_BASE_URL } from "../../utils";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { ADD_AUCTION, HOME_AUCITONS, WEB_SOCKET_BID } from "../../../utils/constant";
import { DEFAULT_URL_IMAGE } from '../../../utils/defaultImage';


function OneArtworkAuctions(props) {
    
    const { TabPane } = Tabs;
    const [activeKey, setActiveKey] = useState("1");
    const [data, setData] = useState({})
    const [Auction, setAuction] = useState([]);
    const [HouseDetail, setHouseDetail] = useState([])
    const [Active, setActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [artwork, setArtwork] = useState("")
    const [artwork_id, setArtwork_id] = useState()
    const { is_logged_in } = useSelector((state) => state.authReducer)
    const [form] = Form.useForm();
    const [steps, setSteps] = useState([])
    const [currentValue, setCurrentValue] = useState(0)
    const [currentPrice, setCurrentVPrice] = useState(0)
    const [currentSuggest, setCurrentSuggest] = useState(0)

    const history = useHistory()
    const Like = () => {
        setActive(!Active)
    }

    const callback = (key) => {
        console.log(key);
        setActiveKey(key)
    }

    console.log("artwork==>>>", artwork)
    useEffect(() => {
        if (artwork?.id && (artwork?.product_status === "on_stage")) {
            let client = new W3CWebSocket(WEB_SOCKET_BASE_URL + WEB_SOCKET_BID(artwork?.latest_auction?.id));
            client.onopen = () => {
                console.log('-->WebSocket Client Connected');
            };
            client.onmessage = (message) => {
                console.log(message);

                if (message?.data?.length >= 1) {
                    // let messageArray = message.data.slice(2, message.data.length - 2).split(',');
                    let artworkData = JSON.parse(message.data).products.filter(obj => {
                        return obj.product_id === artwork?.id
                    })[0]
                    // let priceFinal = Math.floor(artworkData.last_price);
                    // setCurrentVPrice(priceFinal);
                    // setCurrentValue(priceFinal)
                    // setCurrentSuggest(Math.floor(artworkData.bid_count))
                    // form.setFieldsValue({ price: 0 })
                }
            };
            client.onclose = (event) => {
                console.log('The connection has been closed successfully.', event);
            };
            return () => client.close(3001, "disconnect");
        }

    }, [artwork])

    useEffect(() => {

        if (artwork?.bidding_details?.max_bid) {
            setCurrentVPrice(artwork?.bidding_details?.max_bid)
            setCurrentValue(artwork?.bidding_details?.max_bid)
        }
        if (artwork?.bidding_details?.total_bids) {
            setCurrentSuggest(artwork?.bidding_details?.total_bids)
        }


        if (artwork?.latest_auction?.id)
            getAuction(artwork?.latest_auction?.id)
    }, [artwork])





    // console.log("artwork --->>>> ", artwork?.details);
    const getProduct = () => {
        setLoading(true)
        axios.get(`${BASE_URL}${ONE_PRODUCT(props.match.params.id)}`).then(res => {
            setArtwork(res.data.data.result)
            // if()
            getAuction(res.data.data.result.latest_auction.id)
            // console.log("res.data.data.result", res.data.data.result.latest_auction.id)
            setArtwork_id(res.data.data.result.latest_auction.id)
            setLoading(false)
        }).catch(err => {
            console.error(err)
            setLoading(false)
        })
    }


    const getAuction = (AuctionId) => {
        setLoading(true)
        axios.get(`${BASE_URL}/sale/auctions/${AuctionId}/`)
            .then(resp => {
                if (resp.data.code === 200) {
                    setAuction(resp.data.data.result)
                    console.log("resp.data.data.result===>>", resp.data.data.result)
                    if (resp.data.data.result?.steps) {
                        let list = resp.data.data.result.steps.sort((a, b) => (a.threshold - b.threshold))
                        console.log("list==>>", list)
                        setSteps(list)
                    }
                    axios.get(`${BASE_URL}/account/home-auction/${resp.data.data.result?.house?.id}/`).then(res => {
                        setHouseDetail(res.data.data.result);
                    }).catch(err => {
                        console.error(err)
                    })
                }
                // getProduct()
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

    // useEffect(() => {
    //     getAuction();
    // }, [])

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

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


    const handleIncrease = () => {
        if (steps.length) {
            steps.some((item, i, array) => {
                if (i !== (array.length - 1)) {
                    // if (i > 0) {
                    if ((currentValue >= item.threshold) && (currentValue < steps[i + 1].threshold)) {
                        setBid(item.step)
                        return true;
                    } else if (i === 0) {
                        console.log("It is an error")
                        setBid(item.step)
                        return true;
                    }
                    // } else {
                    //     if ((currentValue < item.threshold)) {
                    //         setBid(item.step)
                    //         return true;
                    //     }
                    // }
                } else {
                    setBid(item.step)
                }
            })
        }
    }
    const handleIncreaseminus = () => {
        if (steps.length) {
            steps.some((item, i, array) => {
                if (i > array.length) {
                    if ((currentValue < item.threshold) && (currentValue >= steps[i - 1].threshold)) {
                        minusBid(item.step)
                        return true;
                    } else if (i === 0) {
                        console.log("It is an error")
                        minusBid(item.step)
                        return true;
                    }
                } else {
                    minusBid(item.step)
                }
            })
        }
    }
    const setBid = (value) => {
        form.setFieldsValue({ price: currentValue + value })
        setCurrentValue(currentValue + value)
    }

    const minusBid = (value) => {
        form.setFieldsValue({ price: currentValue - value })
        setCurrentValue(currentValue - value)
    }

    const onFinish = (values) => {
        console.log(values)
        if (artwork?.id)
            sendBid(values)
    }
    const sendBid = (values) => {
        setLoading(true)
        let payload = {
            ...values,
            "product_id": artwork?.id
        }
        axios.post(`${BASE_URL}${BID}`, payload)
            .then(resp => {
                if (resp.status === 201) {
                    message.success("درخواست شما با موفقیت ارسال شد")
                }
                setLoading(false)
            })
            .catch(err => {
                if (err.response?.data?.message)
                    message.error(err.response?.data?.message)
                else
                    message.error("با خطا مواجه شدید")
                setLoading(false)
            })
    }

    const handleShowImage = (item) => {
        return (
            (item?.media?.length && item?.media?.filter(item => item?.is_default === true)[0]?.exact_url) ?  
            item?.media?.filter(item => item?.is_default === true)[0]?.exact_url : 
            ""
        )
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
                                    </div>
                                </div>
                                <div className="flex-col">
                                    <h6 className="default">{artwork?.artwork_title}</h6>
                                </div>
                                <div className="flex-col">
                                    <div className="flex-col">
                                        <div className="lot-arrow">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mrgt15 ">
                                <div className="col artwork-bigimg">
                                    <img style={{ backgroundImage: `url(${artwork && handleShowImage(artwork)})`, height: "320px" ,backgroundRepeat : "round " }} width="493" height="621" className="" alt="" />
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
                                    {/* <span className="price-title">ارسال پیشنهاد زنده</span> */}
                                    {/* <h6 className="default">2 روز بعد</h6> */}
                                </div>
                            </div>

                            {is_logged_in ? <div className="detail-placebid general-bid">

                                {((artwork?.product_status === "on_stage") && (artwork?.join_auction_request_state)) ?
                                    <Form onFinish={onFinish} form={form} className="m-0"
                                       // initialValues={{ inputValue: 0 }}
                                        wrapperCol={{ span: 24 }}>
                                        <div class="input-group with-step mrgt30">
                                        <button type="button" onClick={handleIncreaseminus} style={{zIndex:'1'}}><i class="fal fa-minus"></i></button>
                                            <Form.Item
                                                className="w-100"
                                                name="price"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "تکمیل این فیلد ضروری است",
                                                    },
                                                ]}>
                                                <input className="default-input text-center" min="0" name="quantity" type="number" readOnly={true}
                                                    placeholder="انتخاب پیشنهاد" />

                                            </Form.Item>
                                            <button type="button" onClick={handleIncrease}><i class="fal fa-plus"></i></button>
                                            {/* <span className="input-state" style={{ top: "472px", left: "25px " }}>تومان</span> */}
                                         
                                        </div>
                                        <button htmlType="submit" className="btn-main" style={{ height: '3rem' }}>ثبت پیشنهاد</button>
                                    </Form>



                                    //     <Form onFinish={onFinish} form={form} className="m-0"
                                    //     // initialValues={{ inputValue: 0 }}
                                    //     wrapperCol={{ span: 24 }}>
                                    //     <div className="general-bid-block">
                                    //         <div className="number-input">

                                    //             <Form.Item
                                    //                 className="w-100"
                                    //                 name="price"
                                    //                 rules={[
                                    //                     {
                                    //                         required: true,
                                    //                         message: "تکمیل این فیلد ضروری است",
                                    //                     },
                                    //                 ]}>
                                    //                 <input className="default-inputquantity" min="0" name="quantity" type="number"
                                    //                     readOnly={true}
                                    //                     placeholder="انتخاب پیشنهاد" />
                                    //             </Form.Item>

                                    //             <button onClick={handleIncreaseminus}
                                    //                 type="button"
                                    //                 className="minus" />
                                    //             <button onClick={handleIncrease}
                                    //                 type="button"
                                    //                 className="plus" />
                                    //             <span className="unit">تومان</span>
                                    //         </div>
                                    //         <Button htmlType="submit" className="btn-lightpink">ثبت پیشنهاد</Button>
                                    //     </div>
                                    // </Form>

                                    :
                                    <p className="text-center category-icon">
                                        {artwork?.sale_status ? 'محصول فروخته شد' :
                                            <p>
                                                <p>{(artwork?.product_status === "after_stage") && "حراج به پایان رسید"}
                                                    {(artwork?.product_status === "pre_stage") && "حراج آغاز نشده است"}</p>
                                                {(artwork?.product_status !== "after_stage") ? <div>
                                                    {artwork?.join_auction_request_state ?? <p>
                                                        <span>برای ثبت پیشنهاد باید   </span>
                                                        <Link to={`/auction-registration/${artwork?.latest_auction?.id}`}
                                                            className="d-inline-block"> عضو حراجی </Link>
                                                        <span>   باشید</span>
                                                    </p>}
                                                    {artwork?.join_auction_request_state === false && <p>
                                                        درخواست عضویت شما در انتظار تایید حراجی است
                                                    </p>}
                                                </div> : ''}

                                            </p>}
                                    </p>}
                            </div> :
                                <p className="text-center mt-4 ">
                                    برای ثبت پیشنهاد
                                    <Link to="/login" className="d-inline-block px-1 color-link"> وارد </Link>
                                    شوید
                                </p>
                            }

                        </div>

                        <LastAuctionsSection artwork_id={artwork?.latest_auction?.id} />

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