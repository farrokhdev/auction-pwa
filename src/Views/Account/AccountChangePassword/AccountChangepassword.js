import React, { useState } from 'react'
import AccountHeader from '../../../components/AccountHeader'
import Footer from '../../../components/footer'
import { Form, Input, message } from "antd";

function AccountChangepassword() {

    const [form] = Form.useForm();
    const [nowPassword, setNowPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [repetitionPassword, setRepetitionPassword] = useState("")

    const handleRequestChangePassword = (e)=>{
        e.preventDefault();
    }

    return (
        <>
            <div className="container bg-white">
                <AccountHeader titlePage={"تغییر رمز عبور"} />
                <Form className="changepassword-page" form={form}>
                    <label className="default-label">رمز عبور فعلی</label>
                    <Form.Item
                        className="form-group"
                        name="now-password"
                        rules={[
                            {
                                required: true,
                                message: "تکمیل این فیلد ضروری است",
                            }
                        ]}>
                        <Input
                            onChange={(e) => {
                                setNowPassword(e.target.value)
                            }
                            }
                            type="password" className="default-input" placeholder="رمز عبور فعلی را وارد نمایید." />
                    </Form.Item>
                    <p className="mrgt30 mrgl15">رمز عبور جدید شما باید حداقل دارای 8 کارکتر باشد.</p>

                    <label className="default-label">رمز عبور جدید</label>
                    <Form.Item
                        className="form-group"
                        name="new-password"
                        rules={[
                            {
                                required: true,
                                message: "تکمیل این فیلد ضروری است",
                            }
                        ]}
                    >
                        <Input 
                            onChange={(e)=>{
                                setNewPassword(e.target.value)
                            }}
                            type="password" className="default-input" placeholder="رمز عبور جدید را وارد نمایید." />
                    </Form.Item>
                    <label className="default-label">تکرار رمز عبور جدید</label>
                    <Form.Item
                        className="form-group"
                        name="Repetition-password"
                        rules={[
                            {
                                required: true,
                                message: "تکمیل این فیلد ضروری است",
                            }
                        ]}
                    >
                        <Input 
                            onChange={(e)=>{
                                setRepetitionPassword(e.target.value)
                            }}
                            type="password" className="default-input" placeholder="رمز عبور جدید را دوباره وارد نمایید." />
                    </Form.Item>
                    <div className="btns">
                        <button 
                            onClick={handleRequestChangePassword}
                            type="submit" className="btn-main">ثبت</button>
                    </div>
                </Form>

            </div>
            <Footer />
        </>
    )
}

export default AccountChangepassword;