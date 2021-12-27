import React, {useEffect, useState} from 'react';
import AuctionRegistration from './AuctionRegistration';
import axios from '../../utils/request';
import {BASE_URL} from '../../utils';
import {Redirect} from 'react-router-dom';

function BuyerRegister(props) {

    const [hasPerm, setHasPerm] = useState(true);
    const [redirectUrl, setRedirectUrl] = useState("");

    const getProfile = () => {
        
        axios.get(`${BASE_URL}/account/profile/`)
            .then(resp => {
                if (resp.data.code === 200) {
                    if (!resp.data.data.result.complete_profile) {
                        setRedirectUrl("/account/my-profile")
                        console.log("resp.data.data.result.complete_profile===>>>>",resp.data.data.result.complete_profile)
                        setHasPerm(false)

                    }
                    else if (!resp.data.data.result.complete_bank_info) {
                        setRedirectUrl("/account/financialinfo")
                        console.log("resp.data.data.result.complete_bank_info===>>>>",resp.data.data.result.complete_bank_info)
                        setHasPerm(false) 
                    }
                    else {
                    }
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        getProfile()
    }, [])

    if (hasPerm) {
        return (
            <>
                <AuctionRegistration id={props.match.params.id}/>
            </>
        )
    } 
    else {
        return (
            <Redirect to={redirectUrl}/>
        )
    }
}

export default BuyerRegister;
