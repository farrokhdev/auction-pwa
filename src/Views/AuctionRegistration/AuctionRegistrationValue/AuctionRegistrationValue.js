import React from 'react'
import AccountHeader from '../../../components/AccountHeader';
import Footer from '../../../components/footer';

function AuctionRegistrationValue() {
    return (
        <>
            <div className="container bg-white">
                <AccountHeader backAuction={"/auction-registration"} titlePage={"مقادیر"} />

                <div className="value-detail">
                    <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.</p>
                    {
                        [1, 2, 3, 4].map((item) => {
                            return (
                                <div className="value-list">
                                    <div className="flex-around">
                                        <div className="flex-col">
                                            <h6 className="default">1000-2000<span className="unit"> تومان</span></h6>
                                        </div>
                                        <div className="flex-col">
                                            <h6 className="default">200<span className="unit"> تومان</span></h6>
                                        </div>

                                    </div>

                                </div>
                            )
                        })
                    }

                    <div className="form-group">
                        <label className="default-label">اعتبار</label>
                        <input type="text" className="default-input" placeholder="مبلغ مورد نظر خود را وارد نمایید" />
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

export default AuctionRegistrationValue;