import React, { useState } from "react";
import Logo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";
import { setToken } from "../../utils/utils";
import { connect } from 'react-redux';
import { getOtp } from "../../redux/reducers/auth/auth.actions";
import { Form, Input, message } from "antd";
import authService from "../../services/auth.service";


function ConfirmMobileNumber(props) {
  const [verify_code, setverify_code] = useState("");
  const [form] = Form.useForm();

  const handleRequestConfrimMobile = (value) => {


    authService.ConfirmMobileNumber(props.auth.username, verify_code)
      .then(resp => {
        console.log("token =>", resp.data.data.result);
        if (resp.data.data.statusCode === 400) {
          message.error("مجددا درخواست کد اعتبارسنجی دهید")

        } else {
          setToken(resp.data.data.result);
          props.getOtp({ otp: verify_code })
          setTimeout(() => {
            window.location.href = "/auth/register-set-password"
            message.success("به اسمارت آکشن خوش آمدید")
          }, 500);
        }
      }
      )
      .catch(err => {
        message.error("A valid integer is required.")
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
          <Link to="/" className="logo">
            <img src={Logo} width="156" height="34" alt="اسمارت آکشن" />
          </Link>
          <div className="login-block">
            <div className="main-title">
              <h4 className="default titr">تایید شماره تلفن همراه</h4>
            </div>
            <div className="input-group">
              <p className="mb-0">
                <strong>کد تایید</strong>
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
                  onChange={(e) => setverify_code(e.target.value)
                  }
                  placeholder="کد تایید خود را وارد کنید" />
              </Form.Item>
            </div>
            <div className="btn-container pt-5">
              <button
                onClick={handleRequestConfrimMobile}
                type="submit"
                className="btn btn-outline-secondary rounded-pill px-3 "
              >
                ارسال کد تایید
              </button>
            </div>
            <div className="text-center pt-3">
              <Link to="/auth/password-recovery" className=" text-dark ">
                تغییر شماره تلفن همراه
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOtp: (data) => dispatch(getOtp(data)),
  }
}

const mapStateToProps = (store) => {
  return {
    auth: store.authReducer,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmMobileNumber)