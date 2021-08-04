import React, { useState, useEffect } from 'react'
import AccountHeader from '../../../components/AccountHeader';
import Footer from '../../../components/footer';

function AccountWallet() {
    const [Wallet, setWallet] = useState("");

    const getWallet = () => {

    }

    useEffect(() => {
        getWallet()
    }, [])

    return (
        <>
            <div className="container bg-white">
                <AccountHeader titlePage={"کیف پول"} />
                <div className="main-content" id="wallet-page">
                    <div className="wallet-container">
                        <h6 className="default">اعتبار نقدی</h6>
                        <h3 className="default">5000<span className="unit">تومان</span></h3>
                    </div>
                    <div className="row mrgtb15 pt-4 px-2">
                        <div className="col">
                            <button type="button" className="btn-main" data-bs-toggle="modal"
                                data-bs-target="#increasecreadit">افزایش اعتبار</button>
                        </div>
                        <div className="col">
                            <button type="button" className="btn-main" data-bs-toggle="modal"
                                data-bs-target="#withdrawal">برداشت از حساب</button>
                        </div>
                    </div>
                    <div className="wallet-container">
                        <h6 className="default">اعتبار هدیه</h6>
                        <h3 className="default">200<span className="unit">تومان</span></h3>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="increasecreadit" tabIndex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog w-100 h-100">
                    <div className="modal-content h-100">
                        <div className="modal-header">
                            <div className="display">
                                <div className="">
                                    <h2 className="default titr">
                                        افزایش اعتبار
                                    </h2>
                                </div>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                        </div>
                        <div className="modal-body text-center pt-5">
                            <h3 className="default">1000100 <span className="price-unit">تومان</span></h3>
                            <h6 className="default">اعتبار نقدی</h6>
                            <div className="search-input">
                                <label className="default-lable pt-5">مبلغ مورد نظر خود را وارد نمایید.</label>
                                <input type="text" className="default-input" placeholder="100,000" />
                                <span className="unit">تومان</span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default">پرداخت</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="withdrawal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog w-100 h-100">
                    <div className="modal-content h-100">
                        <div className="modal-header">
                            <div className="display">
                                <div className="">
                                    <h2 className="default titr">
                                        برداشت از حساب
                                    </h2>
                                </div>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                        </div>
                        <div className="modal-body text-center pt-5">
                            <h3 className="default">1000100 <span className="price-unit">تومان</span></h3>
                            <h6 className="default">اعتبار نقدی</h6>
                            <div className="search-input">
                                <label className="default-lable pt-5">مبلغ مورد نظر خود را وارد نمایید.</label>
                                <input type="text" className="default-input" placeholder="100,000" />
                                <span className="unit">تومان</span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default">برداشت از حساب</button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default AccountWallet;