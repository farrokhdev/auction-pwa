import React from 'react';
import { Link } from 'react-router-dom';
import AccountHeader from '../../components/AccountHeader';
import Footer from '../../components/footer';

function AuctionRegistration() {
    return (
        <>
            <div className="container bg-white">
                <AccountHeader titlePage={"عضویت در حراج"} />
                <div className="sidebar-body mrgt30" id="auction-register">
                    <ul className="sidebar-filterlist">
                        <li className="complete"><Link to="/">اطلاعات فردی
                        {/* <span>تکمیل شده</span> */}
                        </Link></li>
                        <li className="inprogress"><Link to="/">اطلاعات مالی
                        {/* <span>در حال تکمیل</span> */}
                        </Link></li>
                        <li><Link to="/">علاقه‌مندی‌ها<span></span></Link></li>
                        <li><Link to="/">مقادیر<span></span></Link></li>
                        <li><Link to="/">معرف<span></span></Link></li>
                        <li><Link to="/">سایر<span></span></Link></li>
                        <li><Link to="/">قرارداد<span></span></Link></li>
                    </ul>
                    <button type="button" className="btn-main">ثبت</button>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default AuctionRegistration;