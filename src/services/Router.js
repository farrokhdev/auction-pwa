import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import NotFound from '../components/not-found'
import LoginPage from '../Views/Auth/Login'
import Footer from '../components/footer'

const RouterConfig = () => {
    return (
        <div>
            <Router>
                <Switch>

                    <Route path='/:path?' exact>
                        <>
                            <Switch>
                                <Route path={''}>
                                    <div className="container">
                                        Main Page
                                    </div>
                                    <Footer/>
                                </Route>
                            </Switch>
                        </>
                    </Route>

                    <Route path='/auth/:path?' exact>
                        <>
                            <Switch>
                                <Route path={'login'}>
                                    <LoginPage />
                                </Route>
                            </Switch>
                        </>
                    </Route>

                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default RouterConfig;