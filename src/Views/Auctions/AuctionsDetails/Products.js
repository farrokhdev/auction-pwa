import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import pic1 from "../../../assets/img/pic1.jpg"
function Products() {


    const [activeKey, setActiveKey] = useState("1");
    const [data, setData] = useState({})

    const [Active, setActive] = useState(false);

    const Like = () => {
        setActive(!Active)
    }


    const callback = (key) => {
        console.log(key);
        setActiveKey(key)
    }

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
                [1, 2, 3, 4].map((item) => {
                    return (
                        <div className="fw-block">

                            <div className="row">
                                <div className="col-4 col-lg-2">
                                    <div className="img-block">
                                        <Link to="/auctions/one-artwork">
                                            <img src={pic1} width="493" height="621" alt="Smart Auction"
                                                className="img-fluid" />
                                        </Link>
                                        <div className="tags-block">
                                            <div className="auction-category online">آنلاین</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-8 col-lg-10">
                                    <div className="flex-between">
                                        <div className="flex-col">
                                            <h5 className="artist-name">دختری پشت پنجره</h5>
                                            <h5 className="auction-house-name">سهراب سپهری</h5>
                                        </div>
                                        <div className="flex-col">
                                            <span className="lot-number">1</span>
                                            <button
                                                onClick={() =>
                                                    Like()}
                                                type="button"
                                                className={"btn-favorite " + (Active ? "active" : "")}
                                            ></button>
                                        </div>
                                    </div>
                                    <div className="flex-between align-items-baseline mrgt15">
                                        <div className="flex-col">
                                            <div className="price">
                                                <span>400 - </span>
                                                <span>700</span>
                                                <span className="unit">تومان</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-between">
                                        <div className="flex-col">
                                            <span className="price-title">پیشنهاد شروع:</span>
                                            <div className="price">
                                                <span>195</span>
                                                <span className="unit">تومان</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                })
            }
        </>
    )
}

export default Products;