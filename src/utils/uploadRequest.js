import {getTokenObject} from "./utils";
import * as axios from "axios";
// import {refreshToken} from "./refreshTokenRequest"
// import {connect} from 'react-redux';
// import {clearStorage} from '../redux/reducers/auth/auth.actions';
// import store from '../redux/store';

const instance = axios.create({});

// instance.defaults.baseURL = "http:app.jamterrace.com";
let timeOut = false;
instance.interceptors.request.use(config => {
    config.headers["Content-Type"] = "multipart/form-data; boundary=--------------------------274950088788735598302697";
    config.headers["Accept"] = "*/*";
    if (!config.headers.Authorization) {
        let token = getTokenObject()
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token.Authorization}`;

        // }
    }

    // refreshToken()

    return config;
}, error => Promise.reject(error));


instance.interceptors.response.use((response) => {
    return response
}, async function (error) {
    // const originalRequest = error.config;
    if ((error.response.status === 401) && (!timeOut)) {
        //   originalRequest._retry = true;
        // const access_token = refreshToken();
        //   axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        //   return axiosApiInstance(originalRequest);
        timeOut = true;
        // refreshToken();
        console.log("Access_token =>>>>>>", error.request.responseURL);

        timeOut = false;


        // if(access_token === undefined){

        //     if(!error.request.responseURL.includes("favorite")){
        //         store.dispatch(clearStorage);

        //         console.log("STORE =>>>>>",store);
        //         window.location.href = "#/login";
        //     }
        // }


    }
    return Promise.reject(error);
});


export default instance;


