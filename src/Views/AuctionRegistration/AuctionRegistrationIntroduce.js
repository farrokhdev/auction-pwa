import React, { useState } from 'react'
import { Button, Form, Input } from "antd";


function AuctionRegistrationIntroduce(props) {
    const { setSelectComponent, selectComponent, setRecommender } = props
    const [name, setName] = useState(false)
    const [family, setFamily] = useState(false)
    const [phone, setPhone] = useState(false)
    const sendData = () => {
        setRecommender({ "first_name": name, "last_name": family, "mobile_number": phone })
        setSelectComponent(selectComponent + 1)
    }
    const [form] = Form.useForm();
    return (
        <>
            <div className="container bg-white">
                <div className="main-content" id="auctions">
                    <Form
                        form={form}>
                        <p className="text-secondary pt-3">نام و شماره همراه مورد نظر را وارد نمایید.</p>

                        <label className="default-label">نام </label>

                        <Form.Item className="form-group"
                            name="firstname"
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
                                onChange={(e) => setName(e.target.value)} />
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
                                placeholder="نام خانوادگی خود را وارد نمایید."
                                onChange={(e) => setFamily(e.target.value)} />
                        </Form.Item>

                        <label className="default-label"> شماره همراه </label>
                        <Form.Item className="form-group"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: "تکمیل این فیلد ضروری است",
                                }
                            ]}>
                            <Input
                                type=""
                                className="default-input"
                                placeholder="شماره موبایل خود را وارد نمایید."
                                onChange={(e) => setPhone(e.target.value)} />
                        </Form.Item>

                        <div className="btns">

                            <span className="px-2 d-inline-block" />
                            <Button className="btn-gray " onClick={() => {
                                setSelectComponent(selectComponent - 1)
                            }}>
                                بازگشت
                            </Button>
                            <Button className="btn-default ms-2 " onClick={() => {
                                sendData()
                            }}>
                                ادامه
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default AuctionRegistrationIntroduce;