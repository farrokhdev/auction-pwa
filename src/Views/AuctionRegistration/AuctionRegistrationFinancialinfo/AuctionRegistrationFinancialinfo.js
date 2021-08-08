import React, { useState } from 'react';
import AccountHeader from '../../../components/AccountHeader';
import Footer from '../../../components/footer';
import { Form, Input, message } from 'antd';
import { Link } from "react-router-dom";

function AuctionRegistrationFinancialinfo() {
    const [form] = Form.useForm();

    const [Profile, setProfile] = useState({
        name: "",
        lastName: "",
        mobile: "",
        email: "ehsanmashali@gmail.com",
        nationalCode: "",
        postalCode: "",
        addres: "",
    })

    return (
        <>
            <div className="container bg-white">
                <AccountHeader backAuction={"/auction-registration"} titlePage={"اطلاعات مالی"} />

                <div className="main-content" id="auctions">
                    <Form
                        initialValues={Profile}
                        form={form}>
                        <label className="default-label">شماره کارت</label>
                        <Form.Item
                            className="form-group"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "شماره کارت خود را وارد کنید",
                                }
                            ]}>
                            <Input

                                type="text"
                                className="default-input"
                                placeholder="نام خود را وارد نمایید."
                            />
                        </Form.Item>

                        <label className="default-label">شماره حساب</label>
                        <Form.Item className="form-group"
                            name="lastname"
                            rules={[
                                {
                                    required: true,
                                    message: "شماره حساب خود را وارد نمایید",
                                }
                            ]}>
                            <Input

                                type="text"
                                className="default-input"
                                placeholder="نام خانوادگی خود را وارد نمایید." />
                        </Form.Item>

                        <label className="default-label">شماره شبا</label>
                        <Form.Item className="form-group"
                            name="lastname"
                            rules={[
                                {
                                    required: true,
                                    message: "شماره شبا خود را وارد نمایید",
                                }
                            ]}>
                            <Input

                                type="text"
                                className="default-input"
                                placeholder="نام خانوادگی خود را وارد نمایید." />
                        </Form.Item>

                        <label className="default-label">نام بانک</label>
                        <Form.Item className="form-group"
                            name="lastname"
                            rules={[
                                {
                                    required: true,
                                    message: "نام بانک خود را وارد نمایید",
                                }
                            ]}>
                            <Input

                                type="text"
                                className="default-input"
                                placeholder="نام خانوادگی خود را وارد نمایید." />
                        </Form.Item>

                        <div className="mrgt15 file-group">
                            <p>tلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
                            <div className="form-group">
                                <button type="button" className="btn-upload"><i className="fal fa-sign-out"></i>آپلود</button>
                                <input type="file" className="default-input" />
                            </div>
                        </div>
                        <div className="btns">
                            <button htmlType="submit" className="btn-main">ادامه</button>
                        </div>
                    </Form>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default AuctionRegistrationFinancialinfo;