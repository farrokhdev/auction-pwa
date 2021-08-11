import React , {useState} from "react";
import Logo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";

// import axios from "axios";
// // import {withRouter} from "react-router-dom"
// import { BASE_URL } from "../../utils/index";
// import {setToken} from "../../utils/utils";
// import {setPhoneNumber} from '../../redux/reducers/auth/auth.actions';
// // import AuthContext from "../../context/AuthContext";
// import {connect} from 'react-redux';
// import { getOtp } from "../../redux/reducers/auth/auth.actions";
import {Form, Input, message} from "antd";


function ConfirmMobileNumber(props) {
  const [verify_code, setverify_code] = useState("");
  const [form] = Form.useForm();

  const handleRequestConfrimMobile = (value)=>{
    // let payload={
    //   "user_name": props.auth.username,
    //   "verify_code": verify_code,
    // }

    // axios.post(`${BASE_URL}/account/approve/` , payload)
    //   .then(res=>{
    //     console.log("Confrim-Mobile" , res);

    //     if(res.data.code === 200){
    //       setToken(res.data.data.result);
    //       props.getOtp({otp : verify_code})
    //       setTimeout(() => {
    //         window.location.href = "#/register-set-password"
    //         message.success("گذر واژه جدید را وارد کنید")
    //       }, 1000);
         
    //     }
    //   })
    //   .catch(err=>{
    //     message.error("کد نامعتبر است")
    //     console.log("Error Message as Confrim-Mobile" , err);
    //   })
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
                    onChange={(e)=>setverify_code(e.target.value)
                  }
                  placeholder="کد تایید خود را وارد کنید"/>
              </Form.Item>
            </div>
            <div className="btn-container pt-5">
                
              <Link to="/auth/register-set-password">
                <button
                  onClick={handleRequestConfrimMobile}
                  type="submit"
                  className="btn btn-outline-secondary rounded-pill px-3 "
                >
                  ارسال کد تایید
                </button>
              </Link>
              
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


export default ConfirmMobileNumber;
// const mapDispatchToProps = (dispatch) => {
//   return {
//       getOtp : (data) => dispatch(getOtp(data)),
//   }
// }

// const mapStateToProps = (store) => {
//   return {
//       auth : store.authReducer,
//   }
// }


// export default connect(mapStateToProps , mapDispatchToProps)(ConfirmMobileNumber)