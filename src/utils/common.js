import axios from 'axios';
import {BASE_URL} from '../utils';
import {Token} from './utils';

let refresh = true;
let timeAction = null;

 export function fetcher  (url = BASE_URL, header = {method:"GET",data:"",header:{}},auth=true)  {
    let initial={headers:{}};
    

    if(header?.data)
    initial.data=header.data
    if(header?.header)
    initial.headers=header?.header
    if(auth)
    initial.headers["Authorization"]=`Bearer ${Token()}`


    initial.method=header.method
    initial.url=url

    return axios(initial).then((response) => {
        if (response.ok) { //4xx-5xx

        }
        return response.data;
    })
    .catch(err => {
            console.log(err);
        })


}




