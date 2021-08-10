import React, { useState } from 'react'
import AccountHeader from '../../../components/AccountHeader';
import Footer from '../../../components/footer';
import { Button, Form, Input, Spin, Select } from "antd";
import { Link } from "react-router-dom";


function AuctionRegistrationIntroduce() {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [auction, setAuction] = useState("");

    const [Profile, setProfile] = useState({
        name: "",
        lastName: "",
        mobile: "",
        email: "ehsanmashali@gmail.com",
    })
    return (
        <>
            <div className="container bg-white">
                <AccountHeader backAuction={"/auction-registration"} titlePage={" معرف"} />
                <div className="main-content" id="auctions">
                    <Form
                        initialValues={Profile}
                        form={form}>
                        <p className="text-secondary">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.</p>
                        <Select
                            labelInValue
                            className="w-100"
                            size="large"
                            dropdownClassName="text-right"
                            size="large"
                            dropdownClassName="text-right"
                            placeholder="از لیست انتخاب کنید"
                            onChange={value => {
                                setAuction(value)
                            }}
                        >
                            <Option value="محبوب ترین">
                                محبوب ترین
                            </Option>
                            <Option value="آخرین">
                                آخرین
                            </Option>
                        </Select>

                        <p className="text-secondary pt-3">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.</p>

                        <label className="default-label">نام </label>

                        <Form.Item className="form-group"
                            name="lastname"
                            rules={[
                                {
                                    required: true,
                                    message: "تکمیل این فیلد ضروری است",
                                }
                            ]}>
                            <Input
                                type="text"
                                className="default-input"
                                placeholder="نام خود را وارد نمایید." />
                        </Form.Item>

                        <label className="default-label"> نام خانوادگی </label>

                        <Form.Item className="form-group"
                            name="lastname"
                            rules={[
                                {
                                    required: true,
                                    message: "تکمیل این فیلد ضروری است",
                                }
                            ]}>
                            <Input
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

export default AuctionRegistrationIntroduce;