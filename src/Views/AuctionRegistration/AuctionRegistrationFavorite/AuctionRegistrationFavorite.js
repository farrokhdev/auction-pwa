import React, { useState } from 'react'
import AccountHeader from '../../../components/AccountHeader';
import pic1thumb from '../../../assets/img/pic1-thumb.jpg';
import Footer from '../../../components/footer';
function AuctionRegistrationFavorite() {
    return (
        <>
            <div className="container bg-white">
                <AccountHeader backAuction={"/auction-registration"} titlePage={"موارد مورد علاقه"} />

                <div className="input-group search">
                    <input type="text" className="default-input" placeholder="جستجوی اثر، خانه حراج" />
                    <button type="button" className="btn-advancesearch">
                        <i className="far fa-search"></i>
                    </button>
                </div>

                <div className="row row-cols-2 mrgt15">
                    {
                        [1, 2, 3, 4].map((item) => {
                            return (
                                <div className="col">
                                    <div className="form-check img-checkbox">
                                        <input className="form-check-input" type="checkbox" value="" id="checkbox1" />
                                        <label className="form-check-label" for="checkbox1">
                                            <div className="artwork-block">
                                                <div className="artwork-img">
                                                    <img src={pic1thumb} width="493" height="493" alt="" className="img-fluid" />
                                                </div>
                                                <div className="flex-between mrgt10">
                                                    <div className="flex-col">
                                                        <h5 className="artist-name">سهراب سپهری</h5>
                                                        <div className="flex-col">
                                                            <h6 className="default">2000-5000<span className="unit"> تومان</span></h6>
                                                        </div>
                                                    </div>
                                                    <div className="flex-col">
                                                        <span className="lot-number">1</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AuctionRegistrationFavorite;