import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import AccountHeader from '../../components/AccountHeader';
import Footer from '../../components/footer';
import logo from '../../assets/img/logo.svg';
import pic1 from '../../assets/img/pic1.jpg';
import Timer from 'react-compound-timer';

function Discover() {

    const [Active, setActive] = useState(false);
    const [show, setShow] = useState(false)
    const [Auctions, setAuctions] = useState("");

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
                    <Link to="/">
                        <img src={logo} width="156" height="34" alt="Smart auction logo" />
                    </Link>
                    <button type="button" className="notification new-notice">
                        <i className="fal fa-bell"></i>
                    </button>
                </div>
                <div className="input-group search">
                    <input type="text" className="default-input" placeholder="جستجوی اثر، حراج و خانه حراج" />
                    <button type="button" className="btn-advancesearch">
                        <i className="far fa-sliders-h"></i>
                    </button>
                </div>
                <div className="main-filter">
                    <ul className="main-filterlist">
                        <li id="l-location"><Link to="/"  className="text-secondary" to="/">موقعیت مکانی</Link ></li>
                        <li id="l-category"><Link to="/" className="text-secondary" to="/">دسته‌بندی</Link ></li>
                        <li id="l-house"><Link to="/" className="text-secondary" to="/">خانه حراج</Link></li>
                        <li id="l-type"><Link to="/" className="text-secondary" to="/">نوع</Link></li>
                    </ul>
                </div>
                {
                    [1, 2, 3].map((item) => {
                        return (
                            <div className="main-content" id="artworks">
                                <div className="fw-block mb-3">
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
                                                        <span> 400  -  </span>
                                                        <span> 700 </span>
                                                        <span className="unit"> تومان </span>
                                                    </div>
                                                </div>
                                                <div className="flex-col right-align">
                                                    <div className={"jumbotron countdown " + (show ? "show" : "end")} data-Date='2021/7/30 16:09:00'>
                                                        <div className="running">
                                                            {/* <timer>
                                            <span className="days"></span><span className="gutter-5">:</span><span
                                                className="hours"></span><span className="gutter-5">:</span><span
                                                className="minutes"></span>
                                            <br><span className="show-text"></span>
                                        </timer> */}

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
                                                            {/* <div className="break"></div> */}
                                                        </div>
                                                        {/* <div className="ended">
                                                            <div className="text">پایان یافته </div>
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
                            </div>
                        )
                    })
                }
            </div>
            <Footer />

            {/* <div class="sidebar container">
                <div class="sidebar-header">
                    <button type="button" class="btn-close"></button>
                    <h3 class="main-title">فیلتر</h3>
                    <button type="button" class="btn-erase">پاک کردن همه</button>
                </div>
            </div> */}

            {/* <div>


                <div class="sidebar container">
                    <div class="sidebar-header">
                        <button type="button" class="btn-close"></button>
                        <h3 class="main-title">فیلتر</h3>
                        <button type="button" class="btn-erase">پاک کردن همه</button>
                    </div>
                    <div class="sidebar-body">
                        <div class="form-group">
                            <label class="default-label"><i class="fal fa-sort-amount-up"></i>مرتب‌سازی بر اساس</label>
                            <select class="form-select default-input" aria-label="Default select example">
                                <option selected>جدیدترین</option>
                                <option value="1">محبوب‌ترین</option>
                                <option value="2">آخرین</option>
                            </select>
                        </div>
                        <div class="sidebar-filter">
                            <h5 class="default-label"><i class="fal fa-filter"></i>فیلتر بر اساس</h5>
                            <ul class="sidebar-filterlist">
                                <li id="fl-location"><a href="#"><i class="fal fa-map-marker-alt"></i>موقعیت مکانی
                                    <span>1 انتخاب</span></a></li>
                                <li id="fl-category"><a href="#"><i class="fal fa-pallet-alt"></i>دسته‌بندی<span>2 انتخاب</span></a>
                                </li>
                                <li id="fl-house"><a href="#"><i class="fal fa-home"></i>خانه حراج<span>1 انتخاب</span></a></li>
                                <li id="fl-type"><a href="#"><i class="fal fa-map-marker-alt"></i>نوع<span>همه</span></a></li>
                            </ul>
                            <button type="button" class="btn-main">اعمال</button>
                        </div>
                    </div>
                </div>
                <div class="filterlist-group container" id="filterside-fl-location">
                    <div class="sidebar-header">
                        <button type="button" class="btn-back"><i class="fal fa-chevron-left"></i></button>
                        <div class="input-group search">
                            <input type="text" class="default-input" placeholder="جستجوی موقعیت مکانی" />
                            <button type="button" class="btn-searchlocation">
                                <i class="far fa-map-marker-alt"></i>
                            </button>
                        </div>
                    </div>
                    <div class="main-filter">
                        <ul class="main-filterlist">
                            <li class="active"><a href="#">تهران</a><span class="fal fa-times"></span></li>
                            <li class="active"><a href="#">تبریز</a><span class="fal fa-times"></span></li>
                        </ul>
                    </div>
                    <div class="main-list">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" checked value="" id="flexCheckDefault" />
                            <label class="form-check-label" for="flexCheckDefault">
                                تهران
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                            <label class="form-check-label" for="flexCheckDefault1">
                                شیراز
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                            <label class="form-check-label" for="flexCheckDefault2">
                                مشهد
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" checked value="" id="flexCheckDefault3" />
                            <label class="form-check-label" for="flexCheckDefault3">
                                تبریز
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault4" />
                            <label class="form-check-label" for="flexCheckDefault4">
                                بوشهر
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault5" />
                            <label class="form-check-label" for="flexCheckDefault5">
                                کردستان
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault6" />
                            <label class="form-check-label" for="flexCheckDefault6">
                                قم
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault7" />
                            <label class="form-check-label" for="flexCheckDefault7">
                                ایلام
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault8" />
                            <label class="form-check-label" for="flexCheckDefault8">
                                قزوین
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault9" />
                            <label class="form-check-label" for="flexCheckDefault9">
                                کردستان
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault10" />
                            <label class="form-check-label" for="flexCheckDefault10">
                                قم
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault11" />
                            <label class="form-check-label" for="flexCheckDefault11">
                                ایلام
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault12" />
                            <label class="form-check-label" for="flexCheckDefault12">
                                قزوین
                            </label>
                        </div>
                    </div>
                </div>
                <div class="filterlist-group container" id="filterside-fl-category">
                    <div class="sidebar-header">
                        <button type="button" class="btn-back"><i class="fal fa-chevron-left"></i></button>
                        <div class="input-group search">
                            <input type="text" class="default-input" placeholder="دسته‌بندی" />
                            <button type="button" class="btn-searchlocation"></button>
                        </div>
                    </div>
                    <div class="main-list">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault00" />
                            <label class="form-check-label" for="flexCheckDefault00">
                                دسته‌بندی 1
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault100" />
                            <label class="form-check-label" for="flexCheckDefault100">
                                دسته‌بندی 2
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault101" />
                            <label class="form-check-label" for="flexCheckDefault101">
                                دسته‌بندی 3
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault102" />
                            <label class="form-check-label" for="flexCheckDefault102">
                                دسته‌بندی 4
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault103" />
                            <label class="form-check-label" for="flexCheckDefault103">
                                دسته‌بندی 5
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault104" />
                            <label class="form-check-label" for="flexCheckDefault104">
                                دسته‌بندی 6
                            </label>
                        </div>
                    </div>
                </div>
                <div class="filterlist-group container" id="filterside-fl-house">
                    <div class="sidebar-header">
                        <button type="button" class="btn-back"><i class="fal fa-chevron-left"></i></button>
                        <div class="input-group search">
                            <input type="text" class="default-input" placeholder="جستجو در خانه‌های حراج" />
                        </div>
                    </div>
                    <div class="main-list">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault200" />
                            <label class="form-check-label" for="flexCheckDefault200">
                                گالری آرتیبیشن
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault201" />
                            <label class="form-check-label" for="flexCheckDefault201">
                                گالری هان
                            </label>
                        </div>

                    </div>
                </div>
                <div class="filterlist-group container" id="filterside-fl-type">
                    <div class="sidebar-header">
                        <button type="button" class="btn-back"><i class="fal fa-chevron-left"></i></button>
                        <div class="input-group search">
                            <input type="text" class="default-input" placeholder="جستجوی نوع" />
                        </div>
                    </div>
                    <div class="main-list">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault300" />
                            <label class="form-check-label" for="flexCheckDefault300">
                                نوع 1
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault301" />
                            <label class="form-check-label" for="flexCheckDefault301">
                                نوع 2
                            </label>
                        </div>

                    </div>
                </div>


            </div> */}
        </>
    )
}

export default Discover;