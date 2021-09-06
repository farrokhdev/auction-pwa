import React, { useState, useEffect } from 'react'
import pic1 from '../../assets/img/pic1.jpg';
import axios from '../../utils/request';
import { BASE_URL } from '../../utils';
import { AuctionType } from '../../utils/converTypePersion';
import { message, Spin, Pagination } from 'antd';

function PresentBids() {

    const [PresentBids, setPresentBids] = useState([])
    const [loading, setLoading] = useState(false)
    const [countAuctions, setCountAuctions] = useState(0)
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
        axios.get(`${BASE_URL}/bidding/?auction_status=ACTIVE`)
            .then(resp => {
                setLoading(false)

                if ((resp.data.code === 200) && resp.data?.data?.result) {
                    setPresentBids(resp.data?.data?.result)
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
                    PresentBids ? PresentBids.map((item) => {
                        return (
                            <div className="fw-block">
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <div className="img-block px-0">
                                            <img style={{
                                                backgroundImage: `url(${item?.product_auction?.product?.media?.exact_url ?
                                                    item?.product_auction?.product?.media?.exact_url : ""})`, height: "8rem"
                                            }}
                                                className="img-fluid image-custom-back" />
                                            <div className="tags-block">
                                                <div className="auction-category online">
                                                    {AuctionType(item?.product_auction?.auction_type)}
                                                </div>
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
                                        <div className="flex-between align-items-baseline mrgt15">
                                            <div className="flex-col">
                                                <div className="price">
                                                    <span>{numeral(item?.product_auction?.min_price).format('0,0')}- </span>
                                                    <span>{numeral(item?.product_auction?.max_price).format('0,0')}</span>
                                                    <span className="unit">تومان</span>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="flex-between mrgt15">
                                            <div className="flex-col">
                                                <span className="price-title">آخرین پیشنهاد شما:</span>
                                                <div className="price">
                                                    <span>{numeral(item?.last_your_bid).format('0,0')}</span>
                                                    <span className="unit">تومان</span>
                                                </div>
                                            </div>
                                            <div className="flex-col current">
                                                <span className="price-title">پیشنهاد فعلی:</span>
                                                <div className="price">
                                                    <span>{numeral(item?.last_bid).format('0,0')}</span>
                                                    <span className="unit">تومان</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : ""}

                <div className="my-2">

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

export default PresentBids;