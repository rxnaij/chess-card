import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"
import Header from "./Header/Header"
import Footer from './Footer/Footer'
import CardCustomization from './CardCustomization'
import AboutPage from './AboutPage'

const Routes = () => (  
    <Router>
        <Header />
        <div className="container mx-auto">
            <Switch>
                <Route exact path="/">
                    <CardCustomization />
                </Route>
                <Route exact path="/about">
                    <AboutPage />
                </Route>
            </Switch>
            <Footer />
        </div>
    </Router>
);

export default Routes;