import axios from "axios";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils";
import { setToken } from "../../utils/utils";
import { setProfile } from "../../redux/reducers/auth/auth.actions";
import { connect } from "react-redux";
import Logo from "../../assets/img/logo.svg";
import GoogleLogin from "react-google-login";
import { Form, Input, message } from "antd";
import authService from "../../services/auth.service";

function SignUp(props) {


    const inputRef = useRef(null);
    const [form] = Form.useForm();

    const [formData, setformData] = useState({
        userName: "",
        Password: "",
        confirmedPassword: "",
    })

    const handleRequestSignUp = (value) => {
        authService.SignUp(formData)
            .then(res => {
                console.log("Sign Up", res);
                if (res.data.code === 201) {
                    setToken(res.data.data.result);
                    props.setProfile({ username: formData.userName })

                    setTimeout(() => {
                        window.location.href = "/auth/verification-code"
                        message.success("کد تایید ارسال شد")
                    }, 700);
                }
            })
            .catch(err => {
                message.error("دوباره تلاش کنید")
                console.log("Error Message", err);
            })
    }

    const responseGoogle = (response) => {

        console.log("Sign Up", response);

        let payload = {
            "access_token": response.tokenObj.access_token
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
                console.log(err)
            })

    }

    return (
        <>
            <div className="container innercontainer align-items-center"
                id="login-page">

                <Form className="login-container" form={form}>
                    <img className="logo mx-auto my-3" src={Logo} width="156" height="34" alt="اسمارت آکشن" />
                    <div className="login-block">
                        <div className="main-title">
                            <h2 className="default titr">ثبت نام</h2>
                        </div>
                        <p className="text-dark" >
                            با ثبت نام و ورود به سایت شما<Link to="/" className="text-secondary"> قوانین </Link> و
                            <Link to="/" className="text-secondary"> شرایط استفاده </Link>را پذیرفته‌اید.
                        </p>
                        <Form.Item
                            className="w-100"
                            name="username"

                            rules={[
                                {
                                    required: true,
                                    message: "تکمیل این فیلد ضروری است",
                                },

                            ]}>
                            <Input className="default-input"
                                onChange={(e) => {
                                    setformData({ ...formData, userName: e.target.value });
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
                                    min: 8,
                                    message: "حداقل 8 کارکتر مورد نیاز است",
                                }
                            ]}>
                            <Input.Password className="default-input"
                                type="password"
                                onChange={(e) => {
                                    setformData({ ...formData, Password: e.target.value });
                                }}
                                placeholder="رمز عبور" />
                        </Form.Item>
                        <Form.Item
                            className="w-100"
                            name="conftimpassword"

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
                            <Input.Password className="default-input"
                                type="password"
                                onChange={(e) => {
                                    setformData({ ...formData, confirmedPassword: e.target.value });
                                }}
                                placeholder="تکرار رمز عبور" />
                        </Form.Item>

                        <div className="btn-container mt-3 mb-3">
                            <button
                                onClick={handleRequestSignUp}
                                type="submit"
                                className="btn-default"
                            >
                                ثبت نام
                            </button>
                        </div>
                        <div className="s-footer-block">
                            <div className="or-divider">
                                <span> یا </span>
                            </div>
                            <GoogleLogin
                                className="btn-google-login btn-google mt-5"
                                clientId="204714783619-coki1sldsv5iev552dcmtcpfj1sn77sg.apps.googleusercontent.com"
                                buttonText=" ثبت نام با گوگل"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}

                            />
                        </div>
                    </div>
                    <p className="l-signup ">
                        قبلا ثبت نام کرده‌اید؟<Link to="/auth/login" className="text-secondary"> ورود</Link>
                    </p>
                </Form>
            </div>
        </>
    );
}

// export default SignUp;

const mapDispatchToProps = (dispatch) => {
    return {
        setProfile: (data) => dispatch(setProfile(data)),
    }
}

const mapStateToProps = (store) => {
    return {
        auth: store.authReducer,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)