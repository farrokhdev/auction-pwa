
import React, { useState } from "react";
import Logo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router-dom"
import { setPhoneNumber, loginSuccess } from '../../redux/reducers/auth/auth.actions'
import { BASE_URL } from "../../utils/index";
import { setToken } from "../../utils/utils";
import { connect } from 'react-redux';
import { Form, Input, message } from "antd";
import authService from "../../services/auth.service";
import GoogleLogin from "react-google-login";

function Login(props) {

  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();



  const handleRequestLogin = (e) => {
    e.preventDefault();
    authService.login(userName, password)
      .then(
        resp => {
          // console.log("token =>", resp.data.data.result);
          if (resp.data.code === 200) {
            setToken(resp.data.data.result);
            props.setPhoneNumber({ username: userName })
            props.loginSuccess({ userName: password })
            message.success("به اسمارت آکشن خوش آمدید")
            setTimeout(() => {
              window.location.href = "/account"
            }, 500);
          }
        }
      )
      .catch(err => {
        message.error("کاربری با این مشخصات یافت نشد")
        console.log("error message", err);
      })

  }


  const responseGoogle = (response) => {

    console.log("Sign Up", response);

    let payload = {
      // "access_token": response.tokenObj.access_token
    }

    // console.log("Ehsan", payload)
    axios.post(`${BASE_URL}/rest-auth/google/`, payload).then(res => {
      setToken(res.data.data.result)
      message.success("به اسمارت آکشن خوش آمدید")
      setTimeout(() => {
        window.location.href = "/account"
      }, 500);
    })
      .catch(err => {
        message.error("کاربری با این مشخصات یافت نشد")
        console.log(err)
      })

  }

  return (
    <>
      <div
        className="container innercontainer align-items-center"
        id="login-page"
      >
        <Form className="login-container" form={form}>
          <img className="logo  mx-auto my-3" src={Logo} width="156" height="34" alt="اسمارت آکشن" />
          <div className="login-block" >
            <div className="main-title">
              <h2 className="default titr">ورود</h2>
            </div>
            <p>
              با ثبت نام و ورود به سایت شما
              <Link to="/" className="text-secondary"> قوانین </Link> و <Link to="/" className="text-secondary"> شرایط استفاده </Link>
              را پذیرفته‌اید.
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
              <Input
                type="text"
                className="default-input"
                onChange={(e) => {
                  setuserName(e.target.value);
                }}
                placeholder="شماره همراه یا ایمیل" />
            </Form.Item>
            <Form.Item
              className="w-100"
              name="password"
              rules={[
                {
                  required: true,
                  message: "تکمیل این فیلد ضروری است",
                },
                {
                  // min: 8,
                  message: "حداقل 8 کارکتر مورد نیاز است",
                }
              ]}>
              <Input.Password className="default-input"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="رمز عبور" />
            </Form.Item>
            <div className="btn-container mb-3">
              <button
                type="submit"
                onClick={handleRequestLogin}
                className="btn-default mt-2"
              >
                ورود
              </button>
            </div>

            <div className="s-footer-block ">
              <div className="or-divider">
                <span> یا </span>
              </div>
              <GoogleLogin
                className="btn-google-login btn-google mt-5"
                clientId="204714783619-coki1sldsv5iev552dcmtcpfj1sn77sg.apps.googleusercontent.com"
                buttonText=" ورود با گوگل"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}

              />
            </div>
            <div className="l-footer-block">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="checkboxremember"
                />
                <label className="form-check-label" for="checkboxremember">
                  مرا به خاطر بسپار
                </label>
              </div>
              <Link to="/auth/password-recovery" className="l-forget text-secondary">
                فراموشی رمز عبور
              </Link>
            </div>
          </div>
          <p className="l-signup">
            هنوز ثبت نام نکرده‌اید؟
            <Link to="/auth/sign-up" className="text-secondary"> اینجا کلیک کنید.</Link>
          </p>
        </Form>
      </div>
    </>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {
    setPhoneNumber: (data) => dispatch(setPhoneNumber(data)),
    loginSuccess: (data) => dispatch(loginSuccess(data)),
  }
}

const mapStateToProps = (store) => {
  return {
    auth: store.authReducer,
    panelReducer: store.panelReducer
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
