import React, { useState } from 'react'
import AccountHeader from '../../../components/AccountHeader'
import Footer from '../../../components/footer'
import { Form, Input, message, Spin } from "antd";
import axios from '../../../utils/request';
import { BASE_URL } from '../../../utils';
import { CHANGE_PASSWORD } from '../../../utils/constant';

function AccountChangepassword() {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)

    const onFinish = (values) => {
        console.log(values)
        sendData(values)
    }
    const sendData = (values) => {
        setLoading(true)
        axios.post(`${BASE_URL}${CHANGE_PASSWORD}`, values)
            .then(resp => {
                setLoading(false)
                if (resp.data.code === 200) {
                    setTimeout(() => {
                        message.success("رمز عبور شما با موفقیت ویرایش شد")
                        form.resetFields();
                        window.location.href = "/account"
                    }, 200);
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
                    <AccountHeader titlePage={"تغییر رمز عبور"} />
                    <Form className="changepassword-page" form={form} onFinish={onFinish}>
                        <label className="default-label">رمز عبور فعلی</label>
                        <Form.Item
                            className="form-group"
                            name="old_password"
                            rules={[
                                {
                                    required: true,
                                    message: "تکمیل این فیلد ضروری است",
                                }
                            ]}>
                            <Input type="password" className="default-input" placeholder="رمز عبور فعلی را وارد نمایید." />
                        </Form.Item>

                        <p className="mrgt30 mrgl15">رمز عبور جدید شما باید حداقل دارای 8 کارکتر باشد.</p>

                        <label className="default-label">رمز عبور جدید</label>
                        <Form.Item
                            className="form-group"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "تکمیل این فیلد ضروری است",
                                }
                            ]}
                        >
                            <Input type="password" className="default-input" placeholder="رمز عبور جدید را وارد نمایید." />
                        </Form.Item>

                        <label className="default-label">تکرار رمز عبور جدید</label>
                        <Form.Item
                            className="form-group"
                            name="password_check"
                            rules={[
                                {
                                    required: true,
                                    message: "تکمیل این فیلد ضروری است",
                                }
                            ]}
                        >
                            <Input type="password" className="default-input" placeholder="رمز عبور جدید را دوباره وارد نمایید." />
                        </Form.Item>
                        <div className="btns">
                            <button
                                htmlType="submit"
                                type="submit" className="btn-main">ثبت</button>
                        </div>
                    </Form>

                </div>
            </Spin>
            <Footer />
        </>
    )
}

export default AccountChangepassword;