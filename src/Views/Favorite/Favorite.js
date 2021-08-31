import React, { useState } from 'react'
import Footer from '../../components/footer';
import Timer from 'react-compound-timer';
import pic1 from '../../assets/img/pic1.jpg';
import { Link } from 'react-router-dom';

function Favorite() {
    const [Active, setActive] = useState(false);
    const [show, setShow] = useState(false)
    // const [Auctions, setAuctions] = useState("");

    const Like = () => {
        setActive(!Active)
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
            <div className="container">
                <div className="top-header flex-between">
                    <h2 className="main-title">علاقه‌مندی‌ها</h2>
                    <Link to="/account/messages">
                        <button type="button" className="notification new-notice">
                            <i className="fal fa-bell"></i>
                        </button>
                    </Link>
                </div>
                {
                    [1, 2, 3, 4].map((item) => {
                        return (
                            <div className="fw-block">
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <div className="img-block">
                                            <img src={pic1} width="493" height="621" alt="Smart Auction" className="img-fluid" />
                                            <div className="tags-block">
                                                <div className="auction-category online">آنلاین</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-8 col-lg-10">
                                        <div className="flex-between">
                                            <div className="flex-col">
                                                <h5 className="artist-name">سهراب سپهری</h5>
                                                <h5 className="auction-house-name">گالری آرتیبیشن</h5>
                                            </div>
                                            <div className="flex-col">
                                                <button
                                                    onClick={() =>
                                                        Like()}
                                                    type="button"
                                                    className={"btn-favorite " + (Active ? "active" : "")}
                                                ></button>
                                            </div>
                                        </div>
                                        <div className="flex-between align-items-baseline mrgt20 mrgb5">
                                            <div className="flex-col">
                                                <div className="price">
                                                    <span>400 - </span>
                                                    <span>700</span>
                                                    <span className="unit">تومان</span>
                                                </div>
                                            </div>
                                            <div className="flex-col right-align">
                                                <div className={"jumbotron countdown " + (show ? "show" : "end")} data-Date='2021/7/30 16:09:00'>
                                                    <div className="running">
                                                        {/* <timer>
                                                <span className="days"></span><span className="gutter-5">:</span><span
                                                    className="hours"></span><span className="gutter-5">:</span><span
                                                    className="minutes"></span>
                                                <br><span
                                                    className="show-text"></span>
                                            </timer> */}
                                                        {/* <div className="break"></div> */}
                                                        {item.status !== "CLOSED" ?
                                                            <div className="ended">
                                                                <div className="text">پایان یافته</div>
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
                                                        }
                                                    </div>
                                                    {/* <div className="ended">
                                                    <div className="text">پایان یافته</div>
                                                </div> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-between">
                                            <div className="flex-col">
                                                <span className="price-title"> پیشنهاد شروع : </span>
                                                <div className="price">
                                                    <span> 195 </span>
                                                    <span className="unit"> تومان </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
            <Footer />
        </>
    )
}

export default Favorite;