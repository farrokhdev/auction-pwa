import React from 'react'
import AccountHeader from '../../../components/AccountHeader';

function MyAccountProfile() {
    return (
        <>
            <div className="container bg-white">

                <AccountHeader titlePage={"پروفایل من"} />
                <div className="form-group">
                    <label className="default-label">نام</label>
                    <input type="text" className="default-input" placeholder="نام خود را وارد نمایید." />
                </div>
                <div className="form-group">
                    <label className="default-label">نام خانوادگی</label>
                    <input type="text" className="default-input" placeholder="نام خانوادگی خود را وارد نمایید." />
                </div>
                <div className="form-group">
                    <label className="default-label">شماره همراه</label>
                    <div className="flex-start">
                        <div className="select-country">
                            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="img/iran.png" />
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><a className="dropdown-item" href="#"><img src="img/iran.png" /> </a></li>
                                <li><a className="dropdown-item" href="#"><img src="img/iran.png" /> </a></li>
                                <li><a className="dropdown-item" href="#"><img src="img/iran.png" /> </a></li>
                            </ul>
                        </div>
                        <input type="tel" className="default-input notverify " placeholder="9121234567" />
                        <span className="pre-num">+98</span>
                    </div>
                    <div href="#" className="verify-state-msg "><i className="fal fa-exclamation-circle"></i>شماره همراه شما هنوز تایید نشده است.</div>
                </div>
                <div className="form-group">
                    <label className="default-label">ایمیل</label>
                    <input type="email" className="default-input is-valid" placeholder="ایمیل خود را وارد نمایید." aria-describedby="feedback2" />
                    <div href="#" className="verify-state-msg "><i className="fal fa-exclamation-circle"></i>ایمیل شما تایید نشده است.</div>

                </div>
                <div className="form-group">
                    <label className="default-label">کد ملی</label>
                    <input type="text" className="default-input" placeholder="کد ملی خود را وارد نمایید." />
                </div>
                <div className="form-group">
                    <label className="default-label">کد پستی</label>
                    <input type="text" className="default-input" placeholder="کد پستی خود را وارد نمایید." />
                </div>
                <div className="form-group">
                    <label className="default-label">آدرس</label>
                    <textarea className="default-input" placeholder="آدرس خود را وارد نمایید." rows="4"></textarea>
                </div>
                <div className="btns">
                    <button type="button" className="btn-main">ادامه</button>
                </div>
            </div>
        </>
    )
}

export default MyAccountProfile;