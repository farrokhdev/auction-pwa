import React, { useState, useEffect } from 'react'
import Timer from 'react-compound-timer';
import { message, Spin } from 'antd';
import axios from '../../utils/request';
import { BASE_URL } from '../../utils';
import { AuctionType } from '../../utils/converTypePersion';

function Sales() {

    const [loading, setLoading] = useState(false)
    const [SaleList, setSaleList] = useState([])


    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        setLoading(true)
        axios.get(`${BASE_URL}/following/auctions`)
            .then(resp => {
                setLoading(false)

                if ((resp.data.code === 200) && resp.data?.data?.result) {
                    setSaleList(resp.data?.data?.result)
                }
            })
            .catch(err => {
                setLoading(false)
                console.error(err);
                message.error("صفحه را دوباره لود کنید")
            })
    }

    function timeExpire(time) {
        let expire = new Date(time)
        let now = new Date()
        if (expire > now) {
            return expire - now
        } else {
            return 0

        }
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


    return (
        <>
            <Spin spinning={loading}>

                {SaleList && SaleList?.length >= 1 ? SaleList.map((item) => {
                    return (
                        <div className="fw-block">
                            <div className="row">
                                <div className="col-4 col-lg-2">
                                    <div className="img-block">
                                        <img src={item.media.exact_url} alt="Smart Auction" className="img-fluid" />
                                        <div className="tags-block">
                                            <div className="auction-category online">{AuctionType(item.type)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-8 col-lg-10">
                                    <div className="flex-between">
                                        <div className="flex-col">
                                            <h5 className="artist-name"> {item.description}</h5>
                                            <h5 className="auction-house-name ms-5"> {item.title}</h5>
                                            <h6 className="auction-house-name">{item.house}</h6>
                                        </div>
                                        <div className="flex-col">
                                            <button
                                                onClick={() =>
                                                    addBookmark(
                                                        item?.following?.bookmark?.is_active ?
                                                            item?.following?.bookmark?.id :
                                                            item?.id, item?.following?.bookmark?.is_active)
                                                }
                                                type="button"
                                                className={"btn-favorite " + (item?.following?.bookmark?.is_active ? "active" : "")}
                                            ></button>
                                        </div>
                                    </div>
                                    <div className="flex-between align-items-baseline mrgt20 mrgb5">
                                        <div className="flex-col">
                                            {item.status !== "CLOSED" ?
                                                <div className="ended">
                                                    <div className="text-dark">حراج به پایان رسید</div>
                                                </div>
                                                :
                                                <Timer
                                                    initialTime={timeExpire(item.end_time)}
                                                    direction="backward">
                                                    {() => (
                                                        <div style={{
                                                            direction: 'ltr',
                                                            textAlign: "right",
                                                            color: 'black'
                                                        }}>
                                                            <Timer.Days /> :
                                                            <Timer.Hours /> :
                                                            <Timer.Minutes /> :
                                                            <Timer.Seconds />
                                                        </div>
                                                    )}
                                                </Timer>
                                            }
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

export default Sales;