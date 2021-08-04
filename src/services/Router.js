import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import NotFound from '../components/not-found'
import LoginPage from '../Views/Auth/Login'
import Footer from '../components/footer'
import Account from '../Views/Account/Account'
import AccountChangepassword from '../Views/Account/AccountChangePassword/AccountChangepassword'
import AccountMessages from '../Views/Account/AccountMessage/AccountMessages'
import AccountMessagesTicketDetail from '../Views/Account/AccountMessage/AccountMessagesTicketDetail'
import AccountMyAuctions from '../Views/Account/MyAuctions/AccountMyAuctions'
import MyAccountProfile from '../Views/Account/MyProfile/MyAccountProfile'

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
                        </>
                    )} />
            </Switch>
        </Router>
    )
}

export default RouterConfig;