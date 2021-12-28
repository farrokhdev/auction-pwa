import React, { useState, useEffect } from 'react'
import AccountHeader from '../../../components/AccountHeader';
import Footer from '../../../components/footer';
import { Form, Input, message, Button ,Spin } from 'antd';
import axios from '../../../utils/request';
import { BASE_URL } from '../../../utils';
import { EDIT_PROFILE, ACCOUNT_APPROVE } from '../../../utils/constant';
import { connect } from 'react-redux';


function MyProfileEmailverify(props) {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [showNumber, setShowNumber] = useState(true)
    const [number, setNumber] = useState("")
    const [newField, setNewField] = useState(null)
    const { profile } = props
    
    useEffect(() => {
        if (profile?.mobile) {
            setNumber(profile?.mobile)
            form.setFieldsValue({ mobile: profile?.mobile })
        } else {
            setNumber(profile?.email)
        }

    }, [profile])

    const onFinish = (values) => {
        if (values?.mobile)
                setNumber(values?.mobile)
                setNumber(profile?.email)
                sendData(values)
    }
    const onSub = (values) => {
        sendCode(values)
    }

    const sendData = (values) => {
        setLoading(true)
        axios.put(`${BASE_URL}${EDIT_PROFILE}`, values)
            .then(resp => {
                setLoading(false)
                if (resp.data.code === 200) {
                    setNewField(values?.email)
                    setShowNumber(false)
                    message.success(" کد تایید به موبایل شما ارسال شد")
                }
            })
            .catch(err => {
                setLoading(false)
                console.error(err);
                message.error("دوباره تلاش کنید")
            })
    }
    
    const sendCode = (values) => {
        setLoading(true)
        if (newField)
            axios.post(`${BASE_URL}${ACCOUNT_APPROVE}`, {...values, user_name: props.auth.username, tmp_user_name: newField})
                .then(resp => {
                    setLoading(false)
                    if (resp.data.code === 200) {
                        setShowNumber(true)
                        message.success(" ایمیل شما با موفقیت تایید شد")

                    } else {
                        message.error(resp.data.result)
                    }
                })
                .catch(err => {
                    setLoading(false)
                    message.error("دوباره تلاش کنید")
                })
    }

    return (
        <>
            <Spin spinning={loading}>

                <div className="container bg-white">
                    <AccountHeader linkBack={"/account/my-profile"} titlePage={"تایید ایمیل"} />
                    {showNumber ?
                        <Form
                            form={form}
                            onFinish={onFinish}
                            className="verify-page">
                            <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون
                                بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.</p>
                            <>
                                <label className="default-label">ایمیل</label>
                                <Form.Item
                                    className="form-group mrgtb30"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "تکمیل این فیلد ضروری است",
                                        }
                                    ]}>
                                    <Input type="text" className="default-input is-valid" placeholder="ایمیل خود را وارد نمایید." />
                                </Form.Item>
                            </>
                            <div className="btns">
                                <button htmlType="submit" className="btn-main">ثبت</button>
                            </div>
                        </Form>
                        :

                        <Form
                            onFinish={onSub}
                            form={form}
                            className="verify-page">
                            <p className="darkgray">


                                ما یک کد به
                                <span className="px-2">{newField}</span>
                                ارسال کردیم ،
                                برای تأیید آدرس ایمیل خود کد را در زیر وارد کنید.
                            </p>
                            <>
                                <label className="default-label">کد</label>
                                <Form.Item
                                    className="form-group mrgtb30"
                                    name="verify_code"
                                    rules={[
                                        {
                                            required: true,
                                            message: "تکمیل این فیلد ضروری است",
                                        }
                                    ]}>
                                    <Input type="text" className="default-input is-valid" placeholder=" کد را وارد نمایید." />
                                </Form.Item>
                            </>
                            <div className="button-group">

                                <Button htmlType="submit" className="btn-default">ثبت</Button>
                                <Button className="btn-gray me-2" onClick={() => setShowNumber(true)}>
                                    ویرایش ایمیل
                                </Button>

                            </div>
                        </Form>
                    }
                </div>
            </Spin>
            <Footer />
        </>
    )
}

const mapStateToProps = (store) => {
    return {
      auth: store.authReducer,
    }
}
  
export default connect(mapStateToProps, null)(MyProfileEmailverify)