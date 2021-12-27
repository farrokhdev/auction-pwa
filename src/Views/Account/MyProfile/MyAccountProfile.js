import React, { useState, useEffect } from 'react'
import AccountHeader from '../../../components/AccountHeader';
import Footer from '../../../components/footer';
import { Form, Input, message, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Link } from 'react-router-dom';
import axios from '../../../utils/request';
import { BASE_URL } from '../../../utils';
import { EDIT_PROFILE } from '../../../utils/constant';

function MyAccountProfile() {
    const [form] = Form.useForm();
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axios.get(`${BASE_URL}${EDIT_PROFILE}`)
            .then(resp => {
                if ((resp.data.code === 200) && resp.data?.data?.result) {
                    setProfile(resp.data.data.result)
                }
            })
            .catch(err => {
                console.error(err);
                message.error("صفحه را دوباره لود کنید")
            })
    }

    const onFinish = (values) => {
        sendData(values)
    }

    useEffect(() => {

        if (Object.keys(profile).length) {
            form.setFieldsValue(profile)
        }
    }, [profile])


    const sendData = (values) => {
        setLoading(true)
        axios.put(`${BASE_URL}${EDIT_PROFILE}`, {
            ...values, "home_auction_location": {
                "address": values?.address || ""
            }
        })
            .then(resp => {
                setLoading(false)
                if (resp.data.code === 200) {

                    message.success("پروفایل شما با موفقیت ویرایش شد")
                }
            })
            .catch(err => {
                setLoading(false)
                console.error(err);
                message.error("دوباره تلاش کنید")
            })
    }

    return (
        <>
            <Spin spinning={loading}>
                <div className="container bg-white">
                    <AccountHeader titlePage={"پروفایل من"} />
                    <div className="main-content" id="auctions">
                        <Form
                            onFinish={onFinish}
                            form={form}
                        >
                            <label className="default-label">نام</label>
                            <Form.Item
                                className="form-group"
                                name="first_name"
                                rules={[
                                    {
                                        required: true,
                                        message: "تکمیل این فیلد ضروری است",
                                    }
                                ]}>
                                <Input
                                    type="text"
                                    className="default-input"
                                    placeholder="نام خود را وارد نمایید."
                                />
                            </Form.Item>

                            <label className="default-label">نام خانوادگی</label>
                            <Form.Item className="form-group"
                                name="last_name"
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
                                    {profile?.mobile && profile?.mobile?.length ?
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
                                    {profile?.email && profile?.email.length ?
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
                                name="national_code"
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
                                name="postal_code"
                                rules={[
                                    {
                                        pattern: /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/,
                                        message: " کدپستی صحیح وارد کنید",
                                    },
                                ]}>
                                <Input type="text" className="default-input" placeholder="کد پستی خود را وارد نمایید." />
                            </Form.Item>

                            <label className="default-label">آدرس</label>
                            <Form.Item className="form-group"  name="address">
                                <TextArea className="default-input" placeholder="آدرس خود را وارد نمایید." rows="4"></TextArea>
                            </Form.Item>

                            <div className="btns">
                                <button htmlType="submit" className="btn-main">ثبت</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Spin>
            <Footer />
        </>
    )
}

export default MyAccountProfile;