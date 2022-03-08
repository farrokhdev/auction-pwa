import {BASE_URL} from '../utils';
import { ACCOUNT_LOGIN, ACCOUNT_MESSAGES_BOX, ACCOUNT_MESSAGE_DETAIL, SEARCH_DISCOVER  , CATEGORIE_ACTIVITY, HOME_AUCITONS, ACCOUNT_TICKET_BOX, ACCOUNT_TICKET_REPLY, ACCOUNT_TICKET_DETAIL, CATEGORY_TICKET, CREATE_NEW_TICKET, ACCOUNT_CLOSE_TICKET} from '../utils/constant';

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

    // get list of tickets service
    ticketBox=()=> {
        return axios.get(`${BASE_URL}${ACCOUNT_TICKET_BOX}`)
            .then(res => {
                
                return res
            })
            .catch(err => {
                return err
            })
    }    
    
    // get detail of ticket service
    ticketDetial=(id)=> {
        return axios.get(`${BASE_URL}${ACCOUNT_TICKET_DETAIL(id)}`)
            .then(res => {
                
                return res
            })
            .catch(err => {
                return err
            })
    }    
    
    // send reply ticket service
    ticketReply=(id , body)=> {
        let payload = {
            "body": body
        }
        return axios.post(`${BASE_URL}${ACCOUNT_TICKET_REPLY(id) }` , payload)
            .then(res => {
                
                return res
            })
            .catch(err => {
                return err
            })
    } 
    

    // get list of categories ticket service
    categoryTicket=()=> {
   
        return axios.get(`${BASE_URL}${CATEGORY_TICKET}`)
            .then(res => {
                
                return res
            })
            .catch(err => {
                return err
            })
    }  

    // close ticket service
    closeTicket=(id)=> {
        return axios.get(`${BASE_URL}${ACCOUNT_CLOSE_TICKET(id) }`)
            .then(res => {
                
                return res
            })
            .catch(err => {
                return err
            })
    }    
    
    // create new ticket service
    createNewTicket=(title , body , category)=> {

        let payload = {
            "title": title,
            "body": body,
            "category": category
        }

        return axios.post(`${BASE_URL}${CREATE_NEW_TICKET}` , payload)
            .then(res => {
                
                return res
            })
            .catch(err => {
                return err
            })
    }  

    // get liset of inbox message service
    messageBox=(queries)=> {
        return axios.get(`${BASE_URL}${ACCOUNT_MESSAGES_BOX}?${queries}`)
            .then(res => {
                
                return res
            })
            .catch(err => {
                return err
            })
    }    
    
    // get detail of message service
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

    // Search Discover app
    searchDiscover= async(queries)=> {
        return await axios.get(`${BASE_URL}${SEARCH_DISCOVER}?${queries}`)
            .then(res => {
                
                return res
            })
            .catch(err => {
                return err
            })
    } 

        // Get Categories 
        getCategories=()=> {
            return axios.get(`${BASE_URL}${CATEGORIE_ACTIVITY}`)
                .then(res => {
                    
                    return res
                })
                .catch(err => {
                    return err
                })
        } 

        getListHouseAuctions = () => {
            return axios.get(`${BASE_URL}${HOME_AUCITONS}`)
                .then(res => {
                    
                    return res
                })
                .catch(err => {
                    return err
                })
        }


}

export default new AuthService();
