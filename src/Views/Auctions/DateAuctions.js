import React, { useState } from 'react'
import { DatePicker, ConfigProvider } from "antd";
import { DatePicker as DatePickerJalali, Calendar } from "antd-jalali";
import fa_IR from "antd/lib/locale/fa_IR";
import en_US from "antd/lib/locale/en_US";
import moment from "jalali-moment";
import pic1thumb from '../../assets/img/pic1-thumb.jpg';
import pic2thumb from '../../assets/img/pic2-thumb.jpg';
import pic3thumb from '../../assets/img/pic3-thumb.jpg';
import { Link } from 'react-router-dom';

function DateAuctions() {

    const [params, setParams] = useState({
        page: 1,
        page_size: 9,
        search: '',
        category: [],
        date_after: '',
        date_before: '',
        ordering: '',
        auction_houses__home_auction_name: [],
        auctions__type: [],
    })

    const handleSetDate = (dateFrom, dateTo) => {
        setParams({
            ...params,
            date_before: dateFrom ? moment.from(dateFrom, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY-MM-DD') : "",
            date_after: dateTo ? moment.from(dateTo, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY-MM-DD') : ""
        })

    }

    function onChange(dates, dateStrings) {
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        handleSetDate(dateStrings ? dateStrings[0] : {}, dateStrings ? dateStrings[1] : {});
    }
    return (
        <>
            <ConfigProvider locale={fa_IR} direction="rtl">
                <div className="">
                    <DatePickerJalali.RangePicker onChange={onChange} className="rounded" responsive={true} />
                    {
                        [1, 2, 3].map((item) => {
                            return (
                                <div className="fw-block">
                                    <Link to="/auctions/details">

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
                                                <div className="auction-category online">آنلاین</div>
                                            </div>
                                        </div>
                                        <div className="flex-between">
                                            <div className="flex-col">
                                                <h5 className="artist-name">ایران مدرن</h5>
                                            </div>
                                        </div>
                                        <div className="flex-between">
                                            <div className="flex-col">
                                                <h5 className="auction-house-name">گالری آرتیبیشن</h5>
                                            </div>
                                            <div className="flex-col">
                                                <span className="auction-date">19 شهریور 1400 - 17:00</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </ConfigProvider>
        </>
    )
}

export default DateAuctions