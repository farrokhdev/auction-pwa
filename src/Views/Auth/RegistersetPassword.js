import React, { useState } from "react";
import Logo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router-dom"
import { BASE_URL } from "../../utils/index";
import { setToken, Token } from "../../utils/utils";
import { connect } from 'react-redux';
import { Form, Input, message } from "antd";


function RegistersetPassword(props) {
  const [Password, setPassword] = useState("");
  const [PasswordCheck, setPasswordCheck] = useState("");
  const [form] = Form.useForm();

  const handleRequestSetPassword = (value) => {

    let payload = {
      "user_name": props.auth.username,
      "verify_code": props.auth.otp,
      "password": Password,
      "password_check": PasswordCheck,
    }

    console.log("payload", payload);
    axios.post(`${BASE_URL}/account/recover-password/`, payload)
      .then(res => {
        console.log("Confrim-Mobile", res);

        if (res.data.code === 200) {
          setToken(res.data.data.result);
          setTimeout(() => {
            window.location.href = "/auth/login"
            message.success("رمز عبور با موفقیت تغییر یافت")
          }, 1000);
          // history.push("/login")
        }
      })
      .catch(err => {
        message.error("مقادیر ورودی یکسان نیستند")
        console.log("Error Message as Confrim-Mobile", err);
      })

  }

  return (

    <>
      <div
        dir="rtl"
        className="container innercontainer align-items-center"
        id="login-page"
      >
        <Form className="login-container">
          <Link to="/" className="logo">
            <img src={Logo} width="156" height="34" alt="اسمارت آکشن" />
          </Link>
          <div className="login-block">
            <div className="main-title">
              <h3 className="default titr">گذرواژه</h3>
            </div>
            <div className="input-group">
              <p className="mb-0">
                <strong>گذرواژه</strong>
              </p>
              <Form.Item
                className="w-100"
                name="password"

                rules={[
                  {
                    required: true,
                    message: "تکمیل این فیلد ضروری است",
                  },
                  {
                    min: 8,
                    message: "حداقل 8 کارکتر مورد نیاز است",
                  }
                ]}>
                <Input className="default-input"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  placeholder="گذرواژه خود را وارد کنید" />
              </Form.Item>
              <p className="mb-0">
                <strong>تکرار گذرواژه</strong>
              </p>
              <Form.Item
                className="w-100"
                name="confrimpassword"
                rules={[
                  {
                    required: true,
                    message: "تکمیل این فیلد ضروری است",
                  },
                  {
                    min: 8,
                    message: "حداقل 8 کارکتر مورد نیاز است",
                  }
                ]}>
                <Input className="default-input"
                  type="password"
                  onChange={(e) => {
                    setPasswordCheck(e.target.value)
                  }}
                  placeholder="گذرواژه خود را تکرار کنید" />
              </Form.Item>
            </div>
            <div className="btn-container pt-5">
              <button
                onClick={handleRequestSetPassword}
                type="button"
                className="btn-default">
                ثبت نام
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
    panelReducer: store.panelReducer
  }
}


export default connect(mapStateToProps, null)(RegistersetPassword)