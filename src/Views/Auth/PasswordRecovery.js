import React, { useState } from "react";
import Logo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/index";
import { setToken } from "../../utils/utils";
import { setPhoneNumber } from '../../redux/reducers/auth/auth.actions';
import { connect } from 'react-redux';
import { Form, Input, message } from "antd";

function PasswordRecovery(props) {
  const [username, setUsername] = useState("");
  const [form] = Form.useForm();


  const handleRequestPasswordRecovery = (value) => {

    let payload = {
      "user_name": username,
    }
    axios.post(`${BASE_URL}/account/sendotp/`, payload)
      .then(res => {
        console.log("Password Recovey", res);

        if (res.data.code === 200) {
          setToken(res.data.data.result);
          props.setPhoneNumber({ username: payload.user_name })
          setTimeout(() => {
            window.location.href = "/auth/confirm-mobile-number"
            message.success("کد تایید ارسال شد")
          }, 1000);
          // history.push("/confirm-mobile-number")
        }
      })
      .catch(err => {
        message.error("دوباره تلاش کنید")
        console.log("Can not Login", err);
      })
  }

  return (
    <>
      <div
        dir="rtl"
        className="container innercontainer align-items-center"
        id="login-page"
      >
        <div className="login-container">
          <Link to="/" className="logo">
            <img src={Logo} width="156" height="34" alt="اسمارت آکشن" />
          </Link>
          <Form className="login-block" form={form}>
            <div className="main-title">
              <h4 className="default titr">بازیابی گذرواژه</h4>
            </div>
            <div className="input-group">
              <p className="mb-0">
                <strong> تلفن همراه یا ایمیل</strong>
              </p>
              <Form.Item
                className="w-100"
                name="user-name"
                rules={[
                  {
                    required: true,
                    message: "تکمیل این فیلد ضروری است",
                  }

                ]}>
                <Input className="default-input"
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                  placeholder="شماره تلفن یا ایمیل خود را وارد کنید" />
              </Form.Item>
            </div>
            <div className="btn-container pt-5">
              <button
                onClick={handleRequestPasswordRecovery}
                type="submit"
                className="btn-default">
                دریافت کد تایید
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {
    setPhoneNumber: (data) => dispatch(setPhoneNumber(data)),

  }
}


const mapStateToProps = (store) => {
  return {
    auth: store.authReducer,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecovery)