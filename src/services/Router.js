import React, { useEffect } from 'react'
import { Redirect, Switch, Route, BrowserRouter as Router } from 'react-router-dom'
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
import BuyerRegister from '../Views/AuctionRegistration/BuyerRegister';
import Discover from '../Views/Discover/Discover'
import MyBids from '../Views/MyBids/MyBids'
import Favorite from '../Views/Favorite/Favorite'
import AuctionRegistrationFinancialinfo from '../Views/AuctionRegistration/AuctionRegistrationFinancialinfo/AuctionRegistrationFinancialinfo'
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
// import { getProfile } from '../redux/reducers/profile/profile.actions'
import FiltersSearchDiscover from '../Views/Discover/FiltersSearchDiscover'
import Locations from '../Views/Discover/Locations'
import Categories from '../Views/Discover/Categories'
import HouseAuctions from '../Views/Discover/HouseAuctions'
import Types from '../Views/Discover/AuctionType'
import {getTokenObject} from "../utils/utils";
import {clearStorageAll} from "../redux/reducers/all/all.actions";

const RouterConfig = (props) => {

    let token = getTokenObject()
    const dispatch = useDispatch();
    if(token === undefined && props.auth.is_logged_in) {
        dispatch(clearStorageAll())
    }

    return (
        <Router >
            <Switch>

                {/* Authentication */}

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
                    )} 
                />
                
                {/* Logged in */}

                {props.auth.is_logged_in ?

                    <>

                        {/* Home */}

                        <Route exact path="/">
                            {<Redirect to="/auctions" />}
                        </Route>

                        {/* My Account Profile */}

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
                                    <Route exact path={`${url}/financialinfo`} component={(p) => <AuctionRegistrationFinancialinfo />} />

                                </>
                            )} 
                        />

                        {/* Auction Registration */}

                        <Route path="/auction-registration"
                            render={({ match: { url } }) => (
                                <>
                                    <Route exact path={`${url}/:id`} component={(p) => <BuyerRegister {...p} />} />

                                </>
                            )} 
                        />

                        {/* Auctions */}

                        <Route path="/auctions"
                            render={({ match: { url } }) => (
                                <>
                                    <Route exact path={`${url}/`} component={() => <Auctions />} />
                                    <Route exact path={`${url}/one-artwork/:id`} component={(p) => <OneArtworkAuctions {...p} />} />
                                    <Route exact path={`${url}/details/:id`} component={(p) => <AuctionsDetails {...p} />} />
                                </>
                            )} 
                        />

                        {/* Search Discover */}

                        <Route path="/discover"
                            render={({ match: { url } }) => (
                                <>
                                    <Route exact path={`${url}/`} component={() => <Discover />} />
                                    <Route exact path={`${url}/filters`} component={() => <FiltersSearchDiscover />} />
                                    <Route exact path={`${url}/locations`} component={() => <Locations />} />
                                    <Route exact path={`${url}/categories`} component={() => <Categories />} />
                                    <Route exact path={`${url}/houseAuctions`} component={() => <HouseAuctions />} />
                                    <Route exact path={`${url}/types`} component={() => <Types />} />

                                </>
                            )} 
                        />

                        {/* My Bids */}

                        <Route path="/bids"
                            render={({ match: { url } }) => (
                                <>
                                    <Route exact path={`${url}/`} component={() => <MyBids />} />

                                </>
                            )} 
                        />

                        {/* Favorits */}

                        <Route path="/favorite"
                            render={({ match: { url } }) => (
                                <>
                                    <Route exact path={`${url}/`} component={() => <Favorite />} />

                                </>
                            )} 
                        />
                        
                        {/* Page Not Found */}

                        {/* <Route path={`*`} component={() => <NotFound />} /> */}


                    </>
                    :

                    <Redirect to={{ pathname: "/auth/login" }} />}

            </Switch>

        </Router>
    )
}

const mapStateToProps = (store) => {
    return {
        auth: store.authReducer,
    }
}

export default connect(mapStateToProps, null)(RouterConfig)