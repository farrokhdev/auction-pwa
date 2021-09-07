import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Footer from '../../../components/footer';
import { Tabs, Spin, Button, Form, message, Input } from "antd";
import Details from './Details';
import InformationAndTerms from './InformationAndTerms';
import axios from "../../../utils/request";
import { BASE_URL } from "../../../utils";
import { ONE_PRODUCT } from "../../../utils/constant";
import LastAuctionsSection from './LastAuctionsSection';
import { useSelector } from "react-redux";
import { BID } from "../../../utils/constant";
import { Link } from "react-router-dom";



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
    const { is_logged_in } = useSelector((state) => state.authReducer)
    const [form] = Form.useForm();
    const [steps, setSteps] = useState([])
    const [currentValue, setCurrentValue] = useState(0)

    const history = useHistory()
    const Like = () => {
        setActive(!Active)
    }

    const callback = (key) => {
        console.log(key);
        setActiveKey(key)
    }
    // console.log("artwork --->>>> ", artwork?.details);
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

    const setBid = (value) => {
        form.setFieldsValue({ price: currentValue + value })
        setCurrentValue(currentValue + value)
    }

    // const handleIncrease = () => {
    //     // console.log("[[26, 100.0, 300.0]]".splice(']' || '[' , ''));
    //     if (steps.length) {
    //         steps.some((item, i, array) => {
    //             if (i !== (array.length - 1)) {
    //                 // if (i > 0) {
    //                 if ((currentValue >= item.threshold) && (currentValue < steps[i + 1].threshold)) {
    //                     setBid(item.step)
    //                     return true;
    //                 } else if (i === 0) {
    //                     console.log("It is an error")
    //                     setBid(item.step)
    //                     return true;
    //                 }
    //                 // } else {
    //                 //     if ((currentValue < item.threshold)) {
    //                 //         setBid(item.step)
    //                 //         return true;
    //                 //     }
    //                 // }
    //             } else {
    //                 setBid(item.step)
    //             }
    //         })
    //     }
    // }

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
                if (resp.data.code === 201) {
                    message.success("درخواست شما با موفقیت ارسال شد")
                }
                setLoading(false)
            })
            .catch(err => {
                console.error(err.response);
                if (err.response?.data?.data?.error_message)
                    message.error(err.response?.data?.data?.error_message)
                else
                    message.error("قیمت پیشنهادی شما از قیمت پایه محصول کمتر است.")
                setLoading(false)
            })
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
                                    {/* <span className="price-title">ارسال پیشنهاد زنده</span> */}
                                    {/* <h6 className="default">2 روز بعد</h6> */}
                                </div>
                            </div>

                            {is_logged_in ? <div className="detail-placebid general-bid">

                                {((artwork?.product_status === "on_stage") && (artwork?.join_auction_request_state)) ?
                                    <Form onFinish={onFinish} form={form} className="m-0"
                                        wrapperCol={{ span: 24 }}>
                                        <>
                                            <Form.Item
                                                className="w-100"
                                                name="price"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "تکمیل این فیلد ضروری است",
                                                    },
                                                ]}>
                                                <input className="default-input text-center" min="0" name="quantity" type="number"
                                                    placeholder="انتخاب پیشنهاد" />
                                            </Form.Item>
                                            <span className="input-state" style={{ top: "472px", left: "25px " }}>تومان</span>
                                        </>
                                        <button htmlType="submit" className="btn-main" style={{ height: '3rem' }}>ثبت پیشنهاد</button>
                                    </Form>

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