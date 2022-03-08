import React, { useState, useEffect } from 'react';
import AccountHeader from '../../../components/AccountHeader';
import Footer from '../../../components/footer';
import { BASE_URL } from '../../../utils';
import { ACCOUNT_BANK_INFO } from '../../../utils/constant';
import axios from '../../../utils/request';
import { Form, message, Spin } from 'antd';
import { bankList } from './Banks';

function AuctionRegistrationFinancialinfo() {

    const [form] = Form.useForm();
    const [infoBank, setInfoBank] = useState({})
    const [loading, setLoading] = useState(true)

    const getInfoBankAccount = () => {
        setLoading(true)
        axios.get(`${BASE_URL}${ACCOUNT_BANK_INFO}`).then(res => {
            setLoading(false)
            console.log("getInfoBankAccount==>>", res.data);
            setInfoBank(res.data.data.result[0])
        }).catch(err => {
            setLoading(false)
            console.error(err)
        })
    }

    useEffect(() => {
        getInfoBankAccount();
    }, [])

    const updateBankInfo = () => {
        setLoading(true)
        let payload = {
            "bank_name": infoBank?.bank_name,
            "card_number": infoBank?.card_number,
            "account_number": infoBank?.account_number,
            "sheba_number": infoBank?.sheba_number
        }

        const pattern_Num = /^[\d]{0,26}$/;

        if (infoBank?.id) {
            if (
                payload.bank_name.length &&
                payload.card_number &&
                pattern_Num.test(payload.card_number) &&
                payload.account_number.length &&
                pattern_Num.test(payload.account_number) &&
                payload.sheba_number.length == 26 &&
                infoBank.sheba_number.slice(0, 2) === "IR"
            ) {

                axios.put(`${BASE_URL}${ACCOUNT_BANK_INFO}${infoBank?.id}/`, payload).then(res => {
                    setLoading(false)
                    setTimeout(() => {
                        message.success("بروز رسانی اطلاعات بانکی", "اطلاعات با موفقیت بروز‌رسانی شد")
                        window.location.reload();
                    }, 500);

                }).catch(err => {
                    setLoading(false)
                    console.error(err)
                    message.error("خطا در ثبت اطلاعات!", "مقادیر ورودی نامعتبر است")
                })
            } else {
                setLoading(false)
                message.error("خطا در ثبت اطلاعات!", "مقادیر ورودی نامعتبر است")
            }
        } else {
            if (
                payload?.bank_name?.length &&
                payload?.card_number &&
                pattern_Num?.test(payload?.card_number) &&
                payload?.account_number?.length &&
                pattern_Num?.test(payload?.account_number) &&
                payload?.sheba_number?.length == 26 &&
                infoBank?.sheba_number.slice(0, 2) === "IR"
            ) {

                axios.post(`${BASE_URL}${ACCOUNT_BANK_INFO}`, payload).then(res => {
                    setLoading(false)
                    message.success("بروز رسانی اطلاعات بانکی", " با موفقیت انجام شد")
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);

                }).catch(err => {
                    console.error(err)
                    setLoading(false)
                    message.error("خطا در ثبت اطلاعات!", "مقادیر ورودی نامعتبر است")
                })
            } else {
                setLoading(false)
                message.error("خطا در ثبت اطلاعات!", "مقادیر ورودی نامعتبر است")

            }
        }
    }

    const handleSetBankName = (value) => {
        setInfoBank({
            ...infoBank, bank_name: value
        })
    }

    const handleSetCartNumber = (value) => {
        setInfoBank({
            ...infoBank, card_number: value
        })
    }

    const handleSetAccountNumber = (value) => {
        setInfoBank({
            ...infoBank, account_number: value
        })
    }

    const handleSetShebaNumber = (value) => {
        setInfoBank({
            ...infoBank, sheba_number: value
        })
    }


    return (
        <>
            <Spin spinning={loading}>
                <div className="container bg-white">
                    <AccountHeader backAuction={"/auction-registration"} titlePage={"اطلاعات مالی"} />
                    <div className="main-content" id="auctions">
                        <Form
                            initialValues={updateBankInfo}
                            form={form}>

                            <label className="default-label">شماره کارت</label>
                            <div className="form-group">
                                <input maxlength={16} onChange={(e) => handleSetCartNumber(e.target.value)} type="text" required className="default-input text-dark"
                                    placeholder="شماره کارت را وارد نمایید" defaultValue={infoBank?.card_number} />
                            </div>

                            <label className="default-label">شماره حساب</label>
                            <div className="form-group">
                                <input maxlength={26} onChange={(e) => handleSetAccountNumber(e.target.value)} type="text" required className="default-input text-dark"
                                    placeholder="شماره حساب را وارد نمایید." defaultValue={infoBank?.account_number} />
                            </div>

                            <label className="default-label">شماره شبا</label>
                            <div className="form-group">
                                <input maxlength={26} onChange={(e) => handleSetShebaNumber(e.target.value)} type="text" required className="default-input text-dark"
                                    placeholder="IR530700052400114950030001" defaultValue={infoBank?.sheba_number} />
                            </div>

                            <label className="default-label">نام بانک</label>
                            <select
                                onChange={(e) => handleSetBankName(e.target.value)}
                                defaultValue={infoBank?.bank_name}
                                className="default-input text-dark"
                                aria-label="Default select example"
                                required={true}
                            >
                                {bankList.length ? bankList?.map((bank) => (
                                    <>
                                        <option value="none" selected disabled hidden>{infoBank?.bank_name}</option>
                                        <React.Fragment key={bank?.id}>
                                            <option >{bank?.name}</option>
                                        </React.Fragment>
                                    </>

                                )) : ''}

                            </select>
                            
                            <div className="btns mt-5">
                                <button onClick={updateBankInfo} className="btn-main">ثبت</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Spin>

            <Footer />
        </>
    )
}

export default AuctionRegistrationFinancialinfo;