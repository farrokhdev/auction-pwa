import React, { useState, useEffect } from 'react';
import axios from '../../utils/request';
import { BASE_URL } from '../../utils';
import { message, Spin, Pagination } from 'antd';
import classnames from 'classnames';

function PastBids() {
    const [countAuctions, setCountAuctions] = useState(0)
    const [OldBids, setOldBids] = useState([])
    const [loading, setLoading] = useState(false)
    const [queryparams, setqueryParams] = useState({
        page: 1,
        page_size: 9,
        search: '',
        category: [],
        date_after: '',
        date_before: '',
        ordering: '',
        auction_houses__home_auction_name: [],
        type: [],
    })
    let numeral = require('numeral');


    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        setLoading(true)
        axios.get(`${BASE_URL}/bidding/`)
            .then(resp => {
                setLoading(false)

                if ((resp.data.code === 200) && resp.data?.data?.result) {
                    setOldBids(resp.data?.data?.result)
                    setCountAuctions(resp.data.data.count)
                }
            })
            .catch(err => {
                setLoading(false)
                console.error(err);
                message.error("صفحه را دوباره لود کنید")
            })
    }

    const handeSelectPage = (e) => {
        setqueryParams({
            ...queryparams, page: e
        })
    }

    return (
        <>
            <Spin spinning={loading}>

                {
                    OldBids ? OldBids.map((item) => {
                        return (
                            <div className="fw-block">
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <div className="img-block px-0">
                                            <img style={{
                                                backgroundImage: `url(${item?.product_auction?.product?.media?.exact_url ?
                                                    item?.product_auction?.product?.media?.exact_url : ""})`, height: "10rem"
                                            }}
                                                className="img-fluid image-custom-back" />
                                            <div className="tags-block">
                                                <div className=
                                                    {classnames("auction-category", {
                                                        "won": item?.winner,
                                                        "lose": !item?.winner,
                                                    })}
                                                >{item.winner ? "برنده شده " : "برنده نشده"}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-8 col-lg-10">
                                        <div className="flex-between">
                                            <div className="flex-col">
                                                <h5 className="artist-name">{item?.product_auction?.product?.artwork_title}</h5>
                                                <h5 className="auction-house-name">{item?.auction_house_name}</h5>
                                            </div>
                                        </div>
                                        <div className="flex-between align-items-center mrgt15">
                                            <div className="flex-col">
                                                <span className="price-title">تخمین :</span>
                                                <div className="price d-block">
                                                    <span>{numeral(item?.product_auction?.min_price).format('0,0')}- </span>
                                                    <span>{numeral(item?.product_auction?.max_price).format('0,0')}</span>
                                                    <span className="unit">تومان</span>
                                                </div>
                                            </div>
                                            <div className="flex-col">
                                                <span className="price-title">پیشنهاد شما:</span>
                                                <div className="price d-block">
                                                    <span>{numeral(item?.last_your_bid).format('0,0')}</span>
                                                    <span className="unit">تومان</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : ""}
                <div className="my-3">

                    <Pagination
                        style={{ direction: 'ltr', textAlign: 'center' }}
                        showSizeChanger
                        responsive
                        onShowSizeChange={(current, pageSize) => {
                            getData(pageSize)
                        }}
                        onChange={(e) => handeSelectPage(e)}
                        defaultCurrent={1}
                        total={countAuctions}
                        pageSizeOptions={[9, 18, 36, 48]}
                        defaultPageSize={9}
                    />
                </div>
            </Spin>
        </>
    )
}

export default PastBids;