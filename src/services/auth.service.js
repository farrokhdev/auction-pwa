import {BASE_URL} from '../utils';
import { ACCOUNT_LOGIN, ACCOUNT_MESSAGES_BOX, ACCOUNT_MESSAGE_DETAIL } from '../utils/constant';

import axios from '../utils/request';

class AuthService {
    login(userName, password) {
        let payload = {
            "id": userName,
            "password": password
        }
        return axios.post(`${BASE_URL}${ACCOUNT_LOGIN}`, payload)
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    }
    
    messageBox=()=> {
        return axios.get(`${BASE_URL}${ACCOUNT_MESSAGES_BOX}`)
            .then(res => {
                
                return res
            })
            .catch(err => {
                return err
            })
    }    
    
    messageDetail = (id) => {
        return axios.get(`${BASE_URL}${ACCOUNT_MESSAGE_DETAIL}${id}/`)
            .then(res => {
                
                return res
            })
            .catch(err => {
                return err
            })
    }

    ConfirmMobileNumber(userName, verifyCode) {
        let payload = {
            "user_name": userName,
            "verify_code": verifyCode,
        }
        return axios.post(`${BASE_URL}/account/approve/`, payload)
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    }

    PasswordRecovery(userName) {
        let payload = {
            "user_name": userName,
        }
        return axios.post(`${BASE_URL}/account/sendotp/`, payload)
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    }

    RegistersetPassword(formData) {
        let payload = {
            "user_name": formData.userName,
            "verify_code": formData.verifyCode,
            "password": formData.password,
            "password_check": formData.passwordCheck,
        }
        return axios.post(`${BASE_URL}/account/recover-password/`, payload)
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    }

    SignUp(formData) {
        let payload = {

            "username": formData.userName,
            "password": formData.Password,
            "confirmed_password": formData.confirmedPassword
        }
        return axios.post(`${BASE_URL}/account/register/`, payload)
            .then(res=>{
                return res
            })
            .catch(err=>{
                return err
            })
    }

}

export default new AuthService();
