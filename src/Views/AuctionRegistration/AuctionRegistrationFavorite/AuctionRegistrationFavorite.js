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
                                <div class="col">
                                    <div class="form-check img-checkbox">
                                        <input class="form-check-input" type="checkbox" value="" id="checkbox1" />
                                        <label class="form-check-label" for="checkbox1">
                                            <div class="artwork-block">
                                                <div class="artwork-img">
                                                    <img src={pic1thumb} width="493" height="493" alt="" class="img-fluid" />
                                                </div>
                                                <div class="flex-between mrgt10">
                                                    <div class="flex-col">
                                                        <h5 class="artist-name">سهراب سپهری</h5>
                                                        <div class="flex-col">
                                                            <h6 class="default">2000-5000<span class="unit"> تومان</span></h6>
                                                        </div>
                                                    </div>
                                                    <div class="flex-col">
                                                        <span class="lot-number">1</span>
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