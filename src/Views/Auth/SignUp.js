import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils";
import { withRouter } from "react-router-dom";
import { setToken } from "../../utils/utils";
import { setProfile } from "../../redux/reducers/auth/auth.actions";
import { connect } from "react-redux";
import Logo from "../../assets/img/logo.svg";
import GoogleLogin from "react-google-login";
import { Form, Input, message } from "antd";

function SignUp(props) {


    const inputRef = useRef(null);
    const [userName, setuserName] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmedPassword, setconfirmedPassword] = useState("");
    const [form] = Form.useForm();



    const handleRequestSignUp = (value) => {

        let payload = {

            "username": userName,
            "password": Password,
            "confirmed_password": confirmedPassword
        }
        console.log(payload)
        axios.post(`${BASE_URL}/account/register/`, payload)
            .then(resp => {
                console.log("Sign Up", resp);
                if (resp.data.code === 201) {
                    setToken(resp.data.data.result);
                    props.setProfile({ username: payload.username })

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

        console.log(response);




        // axios.post(`${BASE_URL}/rest-auth/google/`).then(res => {
        //     console.log(res.data);

        // })
        // .catch(err => {
        //     console.log(err)
        // })

    }

    return (
        <>
            <div className="container innercontainer align-items-center"
                id="login-page">

                <Form className="login-container" form={form}>
                    <img className="logo mx-auto my-3" src={Logo} width="156" height="34" alt="اسمارت آکشن" />
                    <div class="login-block">
                        <div class="main-title">
                            <h2 class="default titr">ثبت نام</h2>
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
                                    min: 8,
                                    message: "حداقل 8 کارکتر مورد نیاز است",
                                }
                            ]}>
                            <Input className="default-input"
                                type="password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
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
                            <Input className="default-input"
                                type="password"
                                onChange={(e) => {
                                    setconfirmedPassword(e.target.value);
                                }}
                                placeholder="تکرار رمز عبور" />
                        </Form.Item>

                        <div class="btn-container mt-3 mb-3">
                            <button
                                onClick={handleRequestSignUp}
                                type="submit"
                                class="btn-default"
                            >
                                ثبت نام
                            </button>
                        </div>
                        <div class="s-footer-block">
                            <div class="or-divider">
                                <span> یا </span>
                            </div>
                            <GoogleLogin
                                className="btn-google-login btn-google mt-5"
                                clientId="12365462243-gua1d2f4uldno7v4t2n61hq8pju041qi.apps.googleusercontent.com"
                                buttonText=" ثبت نام با گوگل"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}

                            />
                        </div>
                    </div>
                    <p class="l-signup ">
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