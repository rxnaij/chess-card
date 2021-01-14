import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Header from "./Header/Header";
import Footer from './Footer/Footer';
import CardCustomization from './CardCustomization';
import AboutPage from './AboutPage';

const Routes = () => (  
    <Router>
        <Header />
        <Switch>
            <Route exact path="/">
                <CardCustomization />
            </Route>
            <Route path="/about">
                <AboutPage />
            </Route>
        </Switch>
        <Footer />
    </Router>
);

export default Routes;