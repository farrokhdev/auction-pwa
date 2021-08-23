import React from 'react';
import { Link } from 'react-router-dom';
import AccountHeader from '../../components/AccountHeader';
import Footer from '../../components/footer';

function AuctionRegistration(props) {
    return (
        <>
            <div className="container bg-white">
                <AccountHeader backAuction={"/auctions/details"}  titlePage={"عضویت در حراج"} />
                <div className="sidebar-body mrgt30" id="auction-register">
                    <ul className="sidebar-filterlist">
                        <li className="complete"><Link to={`/auction-registration/Personalinfo/${props.Auction?.id}`}>اطلاعات فردی
                        {/* <span>تکمیل شده</span> */}
                        </Link></li>
                        <li className="inprogress"><Link to={`/auction-registration/financialinfo/${props.Auction?.id}`}>اطلاعات مالی
                        {/* <span>در حال تکمیل</span> */}
                        </Link></li>
                        <li><Link to={`/auction-registration/favorite/${props.Auction?.id}`}>علاقه‌مندی‌ها<span></span></Link></li>
                        <li><Link to={`/auction-registration/values/${props.Auction?.id}`}>مقادیر<span></span></Link></li>
                        <li><Link to={`/auction-registration/introduce/${props.Auction?.id}`}>معرف<span></span></Link></li>
                        <li><Link to={`/auction-registration/document/${props.Auction?.id}`}>سایر مدارک<span></span></Link></li>
                        <li><Link to={`/auction-registration/contract/${props.Auction?.id}`}>قرارداد<span></span></Link></li>
                    </ul>
                    <button type="button" className="btn-main">ثبت</button>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default AuctionRegistration;