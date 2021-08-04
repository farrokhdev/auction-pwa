import React, { useState, useEffect } from 'react'
import AccountHeader from '../../../components/AccountHeader';
import Footer from '../../../components/footer';
import { Form, Input, message, Button } from 'antd';


function MyProfilePhoneverifyCode(props) {
    const [form] = Form.useForm();
    const [showNumber, setShowNumber] = useState(true);
    const [newField, setNewField] = useState(null);
    const [number, setNumber] = useState("")
    const { Profile } = props

    useEffect(() => {
        if (Profile?.email) {
            setNumber(Profile?.email)
            form.setFieldsValue({ email: Profile?.email })
        } else {
            setNumber(Profile?.mobile)
        }
    }, [Profile])

    const onFinish = (values) => {
        if (values?.email)
            // setNumber(values?.email)
            sendData(values)
    }

    const onSub = (values) => {
        sendCode(values)
    }

    const sendData = () => {

    }

    const sendCode = () => {

    }
    return (
        <>
            <div className="container bg-white">
                <AccountHeader linkBack={"/account/my-profile"} titlePage={"تایید شماره همراه"} />
                {showNumber ?
                    <Form
                        onFinish={onFinish}
                        class="verify-page">
                        <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون
                            بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.</p>
                        <>
                            <label class="default-label">شماره همراه</label>
                            <Form.Item
                                className="form-group mrgtb30"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "تکمیل این فیلد ضروری است",
                                    }
                                ]}>
                                <Input type="text" class="default-input is-valid" placeholder="شماره همراه خود را وارد نمایید." />
                            </Form.Item>
                        </>
                        <div class="btns">
                            <button htmlType="submit" class="btn-main">ثبت</button>
                        </div>
                    </Form>
                    :

                    <Form
                        onFinish={onSub}
                        class="verify-page">
                        <p className="darkgray">


                            ما یک کد به
                            <span className="px-2">{newField}</span>
                            ارسال کردیم ،
                            برای تأیید آدرس ایمیل خود کد را در زیر وارد کنید.
                        </p>
                        <>
                            <label class="default-label">کد</label>
                            <Form.Item
                                className="form-group mrgtb30"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "تکمیل این فیلد ضروری است",
                                    }
                                ]}>
                                <Input type="text" class="default-input is-valid" placeholder=" کد را وارد نمایید." />
                            </Form.Item>
                        </>
                        <div class="button-group">

                            {/* <Button htmlType="submit" class="btn-main">ثبت</Button> */}
                            <Button className="btn btn-secondary rounded-pill" onClick={() => setShowNumber(true)}>
                                ویرایش شماره همراه
                            </Button>

                        </div>
                    </Form>
                }
            </div>
            <Footer />
        </>
    )
}

export default MyProfilePhoneverifyCode;