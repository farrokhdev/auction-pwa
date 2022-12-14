import React, { useState } from "react";
import Logo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";
import { setToken } from "../../utils/utils";
import { setPhoneNumber } from '../../redux/reducers/auth/auth.actions';
import { connect } from 'react-redux';
import { Form, Input, message } from "antd";
import authService from "../../services/auth.service";

function PasswordRecovery(props) {
  const [username, setUsername] = useState("");
  const [form] = Form.useForm();


  const handleRequestPasswordRecovery = (value) => {
    authService.PasswordRecovery(username)
      .then(res => {
        if (res.status !== 200){
          message.error(res?.response?.data?.data?.error_message[0])
        }
        console.log("password Recovery", res);

        if (res.data.code === 200) {
          setToken(res.data.data.result);
          props.setPhoneNumber({ username })
          message.success("کد تایید ارسال شد")
          setTimeout(() => {
            window.location.href = "/auth/confirm-mobile-number"
          }, 1000);
        }
      })
      .catch(err => {
        // message.error("دوباره تلاش کنید")
        // console.log("Can not Login", err);
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