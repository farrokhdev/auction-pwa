import React, { useEffect } from 'react'
import { Redirect, Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { createHashHistory } from "history";
import NotFound from '../components/not-found'
import Account from '../Views/Account/Account'
import AccountChangepassword from '../Views/Account/AccountChangePassword/AccountChangepassword'
import AccountMessages from '../Views/Account/AccountMessage/AccountMessages'
import AccountMessagesTicketDetail from '../Views/Account/AccountMessage/AccountMessagesTicketDetail'
import AccountMyAuctions from '../Views/Account/MyAuctions/AccountMyAuctions'
import MyAccountProfile from '../Views/Account/MyProfile/MyAccountProfile'
import MyProfileEmailverify from '../Views/Account/MyProfile/MyProfileEmailverify'
import MyProfilePhoneverifyCode from '../Views/Account/MyProfile/MyProfilePhoneverifyCode'
import AccountWallet from '../Views/Account/AccountWallet/AccountWallet'
import AccountWonItem from '../Views/Account/AccountWonItem/AccountWonItem'
import AuctionRegistration from '../Views/AuctionRegistration/AuctionRegistration'
import Discover from '../Views/Discover/Discover'
import MyBids from '../Views/MyBids/MyBids'
import Favorite from '../Views/Favorite/Favorite'
import AuctionRegistrationPersonalinfo from '../Views/AuctionRegistration/AuctionRegistrationPersonalinfo/AuctionRegistrationPersonalinfo'
import AuctionRegistrationFinancialinfo from '../Views/AuctionRegistration/AuctionRegistrationFinancialinfo/AuctionRegistrationFinancialinfo'
import AuctionRegistrationFavorite from '../Views/AuctionRegistration/AuctionRegistrationFavorite/AuctionRegistrationFavorite'
import AuctionRegistrationValue from '../Views/AuctionRegistration/AuctionRegistrationValue/AuctionRegistrationValue'
import AuctionRegistrationIntroduce from '../Views/AuctionRegistration/AuctionRegistrationIntroduce/AuctionRegistrationIntroduce'
import AuctionRegistrationOtherdDocuments from '../Views/AuctionRegistration/AuctionRegistrationOtherdDocuments/AuctionRegistrationOtherdDocuments'
import AuctionRegistrationContract from '../Views/AuctionRegistration/AuctionRegistrationContract/AuctionRegistrationContract'
import Auctions from '../Views/Auctions/Auctions'
import OneArtworkAuctions from '../Views/Auctions/OneArtworkAuctions/OneArtworkAuctions'
import AuctionsDetails from '../Views/Auctions/AuctionsDetails/AuctionsDetails'
import Login from '../Views/Auth/Login'
import SignUp from '../Views/Auth/SignUp'
import PasswordRecovery from '../Views/Auth/PasswordRecovery'
import VerificationCode from '../Views/Auth/VerificationCode'
import ConfirmMobileNumber from '../Views/Auth/ConfirmMobileNumber'
import RegistersetPassword from '../Views/Auth/RegistersetPassword'
import { connect, useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../redux/reducers/profile/profile.actions'

const RouterConfig = (props) => {
    console.log(console.log("Login ->> ", props.auth.is_logged_in))

    const { role } = useSelector((state) => state.profileReducer)
    const dispatch = useDispatch();
    useEffect(() => {
        if (!role)
            dispatch(getProfile())
    }, [])
    return (
        <Router >
            <Switch>
                {/* {!props.auth.is_logged_in && <Route path="/" component={() => <Login />} />} */}
                <Route path="/auth"
                    render={({ match: { url } }) => (
                        <>
                            <Route path={`${url}/login`} component={() => <Login />} />
                            <Route path={`${url}/sign-up`} component={() => <SignUp />} />
                            <Route path={`${url}/password-recovery`} component={() => <PasswordRecovery />} />
                            <Route path={`${url}/verification-code`} component={() => <VerificationCode />} />
                            <Route path={`${url}/confirm-mobile-number`} component={() => <ConfirmMobileNumber />} />
                            <Route path={`${url}/register-set-password`} component={() => <RegistersetPassword />} />
                        </>
                    )} />

                {props.auth.is_logged_in ?

                    <>

                        <Route path="/account"
                            render={({ match: { url } }) => (
                                <>
                                    <Route exact path={`${url}/`} component={() => <Account />} />
                                    <Route exact path={`${url}/change-password`} component={() => <AccountChangepassword />} />
                                    <Route exact path={`${url}/messages`} component={() => <AccountMessages />} />
                                    <Route exact path={`${url}/ticket-detail`} component={() => <AccountMessagesTicketDetail />} />
                                    <Route exact path={`${url}/my-auctions`} component={() => <AccountMyAuctions />} />
                                    <Route exact path={`${url}/my-profile`} component={() => <MyAccountProfile />} />
                                    <Route exact path={`${url}/verify-email`} component={() => <MyProfileEmailverify />} />
                                    <Route exact path={`${url}/verify-phone`} component={() => <MyProfilePhoneverifyCode />} />
                                    <Route exact path={`${url}/wallet`} component={() => <AccountWallet />} />
                                    <Route exact path={`${url}/won-item`} component={() => <AccountWonItem />} />

                                </>
                            )} />

                        <Route path="/auction-registration"
                            render={({ match: { url } }) => (
                                <>
                                    <Route exact path={`${url}/:id`} component={(p) => <AuctionRegistration {...p} />} />
                                    <Route exact path={`${url}/Personalinfo/:id`} component={(p) => <AuctionRegistrationPersonalinfo {...p} />} />
                                    <Route exact path={`${url}/financialinfo/:id`} component={(p) => <AuctionRegistrationFinancialinfo {...p} />} />
                                    <Route exact path={`${url}/favorite/:id`} component={(p) => <AuctionRegistrationFavorite {...p} />} />
                                    <Route exact path={`${url}/values/:id`} component={(p) => <AuctionRegistrationValue {...p} />} />
                                    <Route exact path={`${url}/introduce/:id`} component={(p) => <AuctionRegistrationIntroduce {...p} />} />
                                    <Route exact path={`${url}/document/:id`} component={(p) => <AuctionRegistrationOtherdDocuments {...p} />} />
                                    <Route exact path={`${url}/contract/:id`} component={(p) => <AuctionRegistrationContract {...p} />} />

                                </>
                            )} />

                        <Route path="/auctions"
                            render={({ match: { url } }) => (
                                <>
                                    <Route exact path={`${url}/`} component={() => <Auctions />} />
                                    <Route exact path={`${url}/one-artwork/:id`} component={(p) => <OneArtworkAuctions {...p} />} />
                                    <Route exact path={`${url}/details/:id`} component={(p) => <AuctionsDetails {...p} />} />
                                </>
                            )} />

                        <Route path="/discover"
                            render={({ match: { url } }) => (
                                <>
                                    <Route exact path={`${url}/`} component={() => <Discover />} />

                                </>
                            )} />

                        <Route path="/bids"
                            render={({ match: { url } }) => (
                                <>
                                    <Route exact path={`${url}/`} component={() => <MyBids />} />

                                </>
                            )} />
                        <Route path="/favorite"
                            render={({ match: { url } }) => (
                                <>
                                    <Route exact path={`${url}/`} component={() => <Favorite />} />

                                </>
                            )} />
                        {/* <Route path={`*`} component={() => <NotFound />} /> */}


                    </>
                    :

                    <Redirect to={{ pathname: "/auth/login" }} />}

            </Switch>

        </Router>
    )
}

// export default RouterConfig;

const mapStateToProps = (store) => {
    return {
        auth: store.authReducer,
    }
}

export default connect(mapStateToProps, null)(RouterConfig)