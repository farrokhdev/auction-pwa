import React from 'react'
import AccountHeader from '../../../components/AccountHeader';
import Footer from '../../../components/footer';

function AuctionRegistrationContract() {
    return (
        <>
            <div className="container bg-white">
                <AccountHeader backAuction={"/auction-registration"} titlePage={"قرارداد"} />

                <div className="mrgt15 file-group">
                    <p>قرارداد را امضا نموده و آپلود فرمایید.,لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است<a href="#"><i className="fal fa-arrow-to-bottom"></i>نمونه قرارداد</a></p>
                    <div className="form-group">
                        <button type="button" className="btn-upload"><i className="fal fa-sign-out"></i>آپلود</button>
                        <input type="file" className="default-input" />
                    </div>
                </div>

                <div className="btns">
                    <button type="button" className="btn-main">ادامه</button>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default AuctionRegistrationContract;