import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import pic1thumb from '../../assets/img/pic1-thumb.jpg';
import pic2thumb from '../../assets/img/pic2-thumb.jpg';
import pic3thumb from '../../assets/img/pic3-thumb.jpg';
import axios from '../../utils/request';
import { BASE_URL } from '../../utils';
import queryString from 'query-string';
import Timer from 'react-compound-timer';
import { Pagination, Spin } from "antd";
import {  ConfigProvider } from "antd";
import { DatePicker as DatePickerJalali } from "antd-jalali";
import fa_IR from "antd/lib/locale/fa_IR";
import moment from "jalali-moment";
import { AuctionType } from '../../utils/converTypePersion';

function SpecialAuctions(props) {

    const [Auctions, setAuctions] = useState("");
    const [countAuctions, setCountAuctions] = useState(0)
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
    const queries = queryString.stringify(queryparams);


    
    let getProducts;
    if (props.data === "withParams") {
        getProducts = () => {

            setLoading(true)
            axios.get(`${BASE_URL}/sale/auctions/?${queries}`)
                .then(resp => {
                    setLoading(false)
                    if (resp.data.code === 200) {
                        setAuctions(resp.data.data.result)
                        setCountAuctions(resp.data.data.count)
                       
                    }

                })
                .catch(err => {
                    setLoading(false)
                    console.error(err);
                })
        }
    } else {
        getProducts = () => {

            setLoading(true)
            axios.get(`${BASE_URL}/sale/auctions/`)
                .then(resp => {
                    setLoading(false)
                    if (resp.data.code === 200) {
                        setAuctions(resp.data.data.result)
                        setCountAuctions(resp.data.data.count)
                    }

                })
                .catch(err => {
                    setLoading(false)
                    console.error(err);
                })
        }
    }



    useEffect(() => {
        getProducts()

    }, [queryparams])

    const handeSelectPage = (e) => {
        setqueryParams({
            ...queryparams, page: e
        })
    }

    const handleSetDate = (dateFrom, dateTo) => {
        setqueryParams({
            ...queryparams,
            date_before: dateFrom ? moment.from(dateFrom, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY-MM-DD') : "",
            date_after: dateTo ? moment.from(dateTo, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY-MM-DD') : ""
        })

    }

    function onChange(dates, dateStrings) {
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        handleSetDate(dateStrings ? dateStrings[0] : {}, dateStrings ? dateStrings[1] : {});
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




    return (
        <>
            <Spin spinning={loading}>
                <ConfigProvider locale={fa_IR} direction="rtl">
                    {props.activeKey === "2" ?
                        <DatePickerJalali.RangePicker onChange={onChange} className="rounded" responsive={true} />
                        : ""
                    }
                </ConfigProvider>

                {
                    Auctions && Auctions?.length >= 1 ? Auctions.map((item) => {
                        return (
                            <div className="fw-block">

                                <Link to={`/auctions/details/${item?.id}`}>

                                    <div className="img-block">
                                        <div className="row">
                                            <div className="col g-0">
                                                <img src={pic1thumb} width="493" height="493" alt="Smart Auction"
                                                    className="img-fluid" />
                                            </div>
                                            <div className="col g-0">
                                                <img src={pic2thumb} width="880" height="880" alt="Smart Auction"
                                                    className="img-fluid" />
                                            </div>
                                            <div className="col g-0">
                                                <img src={pic3thumb} width="880" height="880" alt="Smart Auction"
                                                    className="img-fluid" />
                                            </div>

                                        </div>
                                        <div className="tags-block">
                                            <div className="auction-category online">{AuctionType(item.type)}</div>
                                        </div>
                                    </div>
                                </Link>
                                <div className="flex-between">
                                    <div className="flex-col">
                                        <h5 className="artist-name">{item.title}</h5>
                                    </div>
                                </div>
                                <div className="flex-between">
                                    <div className="flex-col">
                                        <h5 className="auction-house-name">{item.house}</h5>
                                    </div>
                                    <div className="flex-col">
                                        <span className="auction-date"> {item.status !== "CLOSED" ?
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
                                        }</span>
                                    </div>
                                </div>

                            </div>
                        )
                    }) : ""}

                <Pagination
                    style={{ direction: 'ltr', textAlign: 'center' }}
                    showSizeChanger
                    responsive
                    onShowSizeChange={(current, pageSize) => {
                        getProducts(pageSize)
                    }}
                    onChange={(e) => handeSelectPage(e)}
                    defaultCurrent={1}
                    total={countAuctions}
                    pageSizeOptions={[9, 18, 36, 48]}
                    defaultPageSize={9}
                />
            </Spin>
        </>
    )
}

export default SpecialAuctions;