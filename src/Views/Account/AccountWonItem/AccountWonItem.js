import React, { useState } from 'react'
import AccountHeader from '../../../components/AccountHeader';
import Footer from '../../../components/footer';
import Pic1 from "../../../assets/img/pic1.jpg"

function AccountWonItem() {
    const [Active, setActive] = useState(false)

    const Like = ()=>{
        setActive(!Active)
    }
    
    return (
        <>
            <div className="container bg-white">
                <AccountHeader titlePage={"موارد برنده شده"} />
                <div className="main-content" id="mybids">

                    {
                        [1, 2, 3].map((item) => {
                            return (

                                <div className="fw-block">
                                    <div className="row">
                                        <div className="col-4 col-lg-2">
                                            <div className="img-block">
                                                <img src={Pic1} width="493" height="621" alt="Smart Auction" className="img-fluid" />
                                                <div className="tags-block">
                                                    <div className="auction-category won">برنده شده</div>
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
                                                {/* btn-favorite active */}
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
                                                    <span className="price-title">تخمین:</span>
                                                    <div className="price">
                                                        <span>400 - </span>
                                                        <span>700</span>
                                                        <span className="unit">تومان</span>
                                                    </div>
                                                </div>
                                                <div className="flex-col right-align">
                                                    <span className="price-title">پیشنهاد شما:</span>
                                                    <div className="price">
                                                        <span>135</span>
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


                </div>
            </div>
            <Footer />
        </>
    )
}

export default AccountWonItem;