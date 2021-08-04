import React from 'react';
import pic1thumb from "../../../assets/img/pic1-thumb.jpg"
import pic2thumb from "../../../assets/img/pic2-thumb.jpg";
import pic3thumb from "../../../assets/img/pic3-thumb.jpg";

function MyAuctionFailed() {

    const convertToEn = (value) => {

        switch (value) {

            case "ONLINE":
                return <span className="category-icon online-icon">آنلاین</span>
            case "LIVE":
                return <span className="category-icon live-icon">زنده</span>

            case "PERIODIC":
                return <span className="category-icon timed-icon">مدت دار</span>

            case "HIDDEN":
                return <span className="category-icon firstoffer-icon">اولین پیشنهاد</span>

            case "SECOND_HIDDEN":
                return <span className="category-icon secondoffer-icon">دومین پیشنهاد</span>

        }
    }
    return (
        <>
            {
                [1, 2].map((item) => {
                    return (
                        <div className="fw-block">
                            <div className="auction-state failed"><i className="fal fa-circle"></i>رد شده</div>
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
                                    <div className="auction-category online">
                                        آنلاین
                                        {/* {convertToEn(item)} */}
                                        </div>
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
                            <p className="failed-txt">
                                درخواست شما به دلایل زیر رد شده
                            </p>
                        </div>
                    )
                })
            }
        </>
    )
}

export default MyAuctionFailed;