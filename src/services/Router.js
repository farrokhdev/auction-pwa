import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import NotFound from '../components/not-found'
import LoginPage from '../Views/Auth/Login'
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

const RouterConfig = () => {
    return (
        <Router>
            <Switch>
                <Route path="/auth"
                    render={({ match: { url } }) => (
                        <Route path={`${url}/login`} component={() => <LoginPage />} />
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