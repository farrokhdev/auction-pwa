import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
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

const RouterConfig = () => {
    return (
        <Router>
            <Switch>
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
                            <Route exact path={`${url}/`} component={() => <AuctionRegistration />} />
                            <Route exact path={`${url}/Personalinfo`} component={() => <AuctionRegistrationPersonalinfo />} />
                            <Route exact path={`${url}/financialinfo`} component={() => <AuctionRegistrationFinancialinfo />} />
                            <Route exact path={`${url}/favorite`} component={() => <AuctionRegistrationFavorite />} />
                            <Route exact path={`${url}/values`} component={() => <AuctionRegistrationValue />} />
                            <Route exact path={`${url}/introduce`} component={() => <AuctionRegistrationIntroduce />} />
                            <Route exact path={`${url}/document`} component={() => <AuctionRegistrationOtherdDocuments />} />
                            <Route exact path={`${url}/contract`} component={() => <AuctionRegistrationContract />} />

                        </>
                    )} />

                <Route path="/auctions"
                    render={({ match: { url } }) => (
                        <>
                            <Route exact path={`${url}/`} component={() => <Auctions />} />
                            <Route exact path={`${url}/one-artwork`} component={() => <OneArtworkAuctions />} />
                            <Route exact path={`${url}/details`} component={() => <AuctionsDetails />} />
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
                <Route path={`*`} component={() => <NotFound />} />
            </Switch>

        </Router>
    )
}

export default RouterConfig;