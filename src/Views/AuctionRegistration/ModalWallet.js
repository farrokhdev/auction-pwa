import React, {useEffect, useState} from 'react'
import {Button, Form, Input, Row, Col, message, Spin} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "../../utils/request";
import {BASE_URL} from "../../utils";
import {TRANSACTION, ACCOUNT_BANK_Edit} from "../../utils/constant"
import {Link} from "react-router-dom";

function ModalWallet(props) {
    const {setIsModalVisible,refreshTable} = props
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})


    const onFinish = (values) => {
            sendData(values)
    }
    useEffect(() => {
            form.resetFields()
    }, [])

    const sendData = (values) => {
        setLoading(true)
        axios.post(`${BASE_URL}${TRANSACTION}`, {amount:Number(values.amount),"transaction_type":"increase"})
            .then(resp => {
                setLoading(false)
                if (resp.data.code === 201 && resp.data?.data?.result) {
                    const res = resp.data?.data?.result;
                    message.success("افزایش موجودی با موفقیت انجام شد")
                    // let check = Object.keys(res).some(t => !res[t]);
                    // setNext(!check)

                    refreshTable()
                    setIsModalVisible(false)
                }
            })
            .catch(err => {
                setLoading(false)
                console.error(err);
                message.error("دوباره تلاش کنید")
            })
    }



    return (
        <Spin spinning={loading}>

            <Form onFinish={onFinish}
                  form={form}
                  wrapperCol={{span: 24}}>

                <div className="">
                    <div className="row">

                        <div className="col-md-6">
                            <div className="input-group">
                                <label className="default-lable"> مبلغ</label>
                                <Form.Item
                                    className="w-100"
                                    name="amount"
                                    rules={[
                                        {
                                            required: true,
                                            message: "تکمیل این فیلد ضروری است",
                                        },
                                        {
                                            min: 3,
                                            message: "16کاراکتر وارد کنید",
                                        },
                                        {
                                            max: 11,
                                            message: "تعداد کاراکتر بیش از حد مجاز است",
                                        }
                                    ]}>
                                    <Input className="default-input"
                                           type="number"
                                           placeholder=" مبلغ را وارد نمایید"/>
                                </Form.Item>

                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-12 button-group">
                            <Button loading={loading} className="btn-default" htmlType="submit">
                                تایید
                            </Button>
                            <Button loading={loading} className="btn-default" onClick={()=>form.resetFields()}>
                                حذف اطلاعات
                            </Button>

                        </div>
                    </div>
                </div>
            </Form>

        </Spin>
    )
}

export default ModalWallet;

