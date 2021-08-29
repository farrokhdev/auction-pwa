import React, {useEffect, useState} from "react";
import Footer from '../../components/footer';
import axios from "../../utils/request";
import {BASE_URL} from "../../utils";
import {Redirect} from "react-router-dom";
import AuctionRegistration from "./AuctionRegistration";

function BuyerRegister(props) {
    const [hasPerm, setHasPerm] = useState(true);
    const [redirectUrl, setRedirectUrl] = useState("");

    const getProfile = () => {
        axios.get(`${BASE_URL}/account/profile/`)
            .then(resp => {
                if (resp.data.code === 200) {
                    // if (!resp.data.data.result.complete_profile) {
                    //     setRedirectUrl("/account/my-profile")
                    //     setHasPerm(false)
                    // }
                    // else if (!resp.data.data.result.complete_bank_info) {
                    //     setRedirectUrl("/auction-registration/financialinfo")
                    //     setHasPerm(false) 
                    // }
                    // else {
                    // }
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
