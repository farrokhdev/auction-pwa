import React, { useState } from "react";
import Logo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/index";
import { setToken } from "../../utils/utils";
import { connect } from 'react-redux';
import { Form, Input, message } from "antd";
import authService from "../../services/auth.service";

function VerificationCode(props) {

  const [verify_code, setverify_code] = useState("");
  const [form] = Form.useForm();


  const handleRequestVerifyCode = (value) => {
    authService.ConfirmMobileNumber(props.auth.username, verify_code)
      .then(resp => {
        console.log("token =>", resp.data.data.result);
        if (resp.data.data.statusCode === 400) {
          message.error("مجددا درخواست کد اعتبارسنجی دهید");

        } else {
          setToken(resp.data.data.result);
          setTimeout(() => {
            window.location.href = "/auth/login"
            message.success("به اسمارت آکشن خوش آمدید");
          }, 500);
        }
      }
      )
      .catch(err => {
        message.error("کاربری با این مشخصات یافت نشد")
        console.log("error message", err);
      })
  }
  return (
    <>
      <div
        dir="rtl"
        className="container innercontainer align-items-center"
        id="login-page"
      >
        <Form className="login-container" form={form}>
          <img className="logo" src={Logo} width="156" height="34" alt="اسمارت آکشن" />

          <h5 className="default titr text-center">
            لطفا کد تایید ارسال شده به ایمیل یا شماره همراه خود را در کادر زیر
            وارد کنید.
          </h5>
          <div className="login-block">
            <div className="main-title"></div>
            <Form.Item
              className="w-100"
              name="username"

              rules={[
                {
                  required: true,
                  message: "تکمیل این فیلد ضروری است",
                },
                {
                  min: 4,
                  message: "حداقل 4 کارکتر مورد نیاز است",
                }

              ]}>
              <Input className="default-input text-center"
                type="number"
                onChange={(e) => { setverify_code(e.target.value) }}
                placeholder="کد تایید را وارد کنید" />
            </Form.Item>
            <div className="text-center pt-5">
              <button
                onClick={handleRequestVerifyCode}
                type="submit"
                className="btn-default">
                تایید
              </button>

            </div>
          </div>
        </Form>
      </div>
    </>
  );
}


const mapStateToProps = (store) => {
  return {
    auth: store.authReducer,
  }
}


export default connect(mapStateToProps, null)(VerificationCode)