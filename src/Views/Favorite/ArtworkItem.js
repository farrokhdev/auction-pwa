import React, { useState, useEffect } from 'react'
import { message, Spin } from 'antd';
import axios from '../../utils/request';
import { BASE_URL } from '../../utils';
import { AuctionType } from '../../utils/converTypePersion';
import moment from 'jalali-moment';
import Timer from 'react-compound-timer/build';

function ArtworkItem() {

    const [ArtworkList, setArtworkList] = useState([])
    const [loading, setLoading] = useState(false)
    let numeral = require('numeral');


    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        setLoading(true)
        axios.get(`${BASE_URL}/following/products?activity_type=mark`)
            .then(resp => {
                setLoading(false)

                if ((resp.data.code === 200) && resp.data?.data?.result) {
                    setArtworkList(resp.data?.data?.result)
                }
            })
            .catch(err => {
                setLoading(false)
                console.error(err);
                message.error("صفحه را دوباره لود کنید")
            })
    }

    const addBookmark = (data, action) => {
        if (action) {
            axios.delete(`${BASE_URL}/following/${data}`)
                .then(resp => {
                    getData()
                })
        } else {
            axios.post(`${BASE_URL}/following/`, {
                "content_type": "product",
                "object_id": data,
                "activity_type": "mark"
            })
                .then(resp => {
                    if (resp.data.code === 201) {
                        getData()
                    }

                })
                .catch(err => {
                    console.error(err);
                })

        }
    }


    console.log(ArtworkList )

    return (
        <>
            <Spin spinning={loading}>

                {ArtworkList ? ArtworkList.map((item) => {
                    return (
                        <div className="fw-block">
                            <div className="row">
                                <div className="col-4 col-lg-2">
                                    <div className="img-block">
                                        <img
                                            src={`${item?.media[0]?.exact_url ? item?.media[0]?.exact_url  : ""}`}
                                            className="img-fluid image-custom-back"/>
                                        <div className="tags-block">
                                            <div className="auction-category online">{AuctionType(item?.latest_auction?.type)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-8 col-lg-10">
                                    <div className="flex-between">
                                        <div className="flex-col">
                                            <h5 className="artist-name">{item?.artwork_title}</h5>
                                            <h5 className="auction-house-name">{item?.latest_auction?.title}</h5>
                                        </div>
                                        <div className="flex-col">
                                            <button
                                                onClick={() =>
                                                    addBookmark(
                                                        item?.following?.bookmark?.is_active ?
                                                            item?.following?.bookmark?.id :
                                                            item?.id, item?.following?.bookmark?.is_active)
                                                }
                                                className={"btn-favorite  " + (item?.following?.bookmark?.is_active ? "active" : "")}>

                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex-between align-items-baseline mrgt20 mrgb5">
                                        <div className="auction-calender">



                                        {/* <span className="auction-date"> {item.status == "CLOSED" ?
                                            <div className="ended">
                                                <div className="text">حراج به پایان رسید</div>
                                            </div>
                                            :
                                            <Timer
                                                initialTime={timeExpire(item.end_time)}
                                                direction="backward"
                                            >
                                                {() => (
                                                    <div style={{
                                                        direction: 'ltr',
                                                        textAlign: "right"
                                                    }}>
                                                        <Timer.Days /> :
                                                        <Timer.Hours /> :
                                                        <Timer.Minutes /> :
                                                        <Timer.Seconds />
                                                    </div>
                                                )}
                                            </Timer>
                                        }</span> */}
                                            <div className="auction-date">
                                                <span className="start-date">
                                                    {item?.latest_auction?.start_time ? moment(item?.latest_auction?.start_time, 'YYYY/MM/DD').locale('fa').format('DD MMMM') : ""}
                                                </span>
                                                <span className="end-date">
                                                    - {item?.latest_auction?.end_time ? moment(item?.latest_auction?.end_time, 'YYYY/MM/DD').locale('fa').format('DD MMMM') : ""}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-between">
                                        <div className="flex-col">
                                            <span className="price-title"> پیشنهاد شروع : </span>
                                            <div className="price">
                                                <span>{numeral(item?.price).format('0,0')}</span>
                                                <span className="unit"> تومان </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )

                }) : ""}
            </Spin>
        </>
    )
}
export default ArtworkItem;