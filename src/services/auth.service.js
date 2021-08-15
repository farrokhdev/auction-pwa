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


}

export default new AuthService();
