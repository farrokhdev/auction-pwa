import React, { useState, useEffect } from 'react'
import AccountHeader from '../../../components/AccountHeader';
import Footer from '../../../components/footer';
import { Form, Input, message } from 'antd';
import TextArea from "antd/es/input/TextArea";
import { Link } from "react-router-dom";

function AuctionRegistrationPersonalinfo() {

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

    useEffect(() => {

        if (Object.keys(Profile).length) {
            form.setFieldsValue(Profile)
        }
    }, [Profile])

    return (
        <>
            <div className="container bg-white">
                <AccountHeader backAuction={"/auction-registration"} titlePage={"اطلاعات فردی"} />

                <div className="main-content" id="auctions">
                    <Form
                        initialValues={Profile}
                        form={form}>
                        <label className="default-label">نام</label>
                        <Form.Item
                            className="form-group"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "تکمیل این فیلد ضروری است",
                                }
                            ]}>
                            <Input
                                // onChange={(e) => {
                                //     setProfile({ ...Profile, name: e.target.value })
                                // }
                                // }
                                type="text"
                                className="default-input"
                                placeholder="نام خود را وارد نمایید."
                            />
                        </Form.Item>

                        <label className="default-label">نام خانوادگی</label>
                        <Form.Item className="form-group"
                            name="lastname"
                            rules={[
                                {
                                    required: true,
                                    message: "تکمیل این فیلد ضروری است",
                                }
                            ]}>
                            <Input
                                // onChange={(e) => {
                                //     setProfile({ ...Profile, lsastName: e.target.value })
                                // }
                                // }
                                type="text"
                                className="default-input"
                                placeholder="نام خانوادگی خود را وارد نمایید." />
                        </Form.Item>

                        <div className="">
                            <div className="input-group notapproved">
                                <label className="default-lable ps-3 pb-2">شماره همراه</label>
                                {Profile.mobile && Profile.mobile.length ?
                                    <>
                                        <Form.Item
                                            className="w-100"

                                            name="mobile">
                                            <Input
                                                className="default-input"
                                                placeholder="شماره موبایل مورد نظر را وارد نمایید."
                                                disabled />
                                        </Form.Item>
                                        <span className="approved input-state">تایید شده</span>
                                    </>
                                    :
                                    <Link to="/account/verify-phone" className="pb-3" >
                                        <button className="input-note text-muted ">
                                            برای تغییر و تایید شماره موبایل خود اینجا کلیک کنید.
                                        </button>
                                    </Link>
                                }
                            </div>
                        </div>
                        <div className="">
                            <div className="input-group notapproved">
                                <label className="default-lable ps-3 pb-2">ایمیل</label>
                                {Profile?.email && Profile?.email.length ?
                                    <>
                                        <Form.Item
                                            className="w-100"

                                            name="email">
                                            <Input className="default-input"
                                                placeholder="ایمیل خود را وارد نمایید."
                                                disabled />

                                        </Form.Item>
                                        <span className="approved input-state">تایید شده</span>
                                    </>
                                    :
                                    <Link to="/account/verify-email" className="pb-3">
                                        <button className="input-note text-muted ">
                                            برای تغییر و تایید شماره موبایل خود اینجا کلیک کنید.
                                        </button>
                                    </Link>
                                }
                            </div>
                        </div>
                        <label className="default-label">کد ملی</label>
                        <Form.Item className="form-group"
                            name="national-code"
                            rules={[
                                {
                                    min: 10,
                                    message: "حداقل 10 رقم وارد کنید ",
                                },
                                {
                                    max: 11,
                                    message: "حداکثر 11 رقم وارد کنید ",
                                },
                            ]}>
                            <Input type="text" className="default-input" placeholder="کد ملی خود را وارد نمایید." />
                        </Form.Item>

                        <label className="default-label">کد پستی</label>
                        <Form.Item className="form-group"
                            name="postal-code"
                            rules={[
                                {
                                    pattern: /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/,
                                    message: " کدپستی صحیح وارد کنید",
                                },
                            ]}>
                            <Input type="text" className="default-input" placeholder="کد پستی خود را وارد نمایید." />
                        </Form.Item>

                        <label className="default-label">آدرس</label>
                        <Form.Item className="form-group">
                            <TextArea className="default-input" placeholder="آدرس خود را وارد نمایید." rows="4"></TextArea>
                        </Form.Item>

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

export default AuctionRegistrationPersonalinfo;