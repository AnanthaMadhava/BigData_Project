import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

import Analytics from './components/analytics/Analytics';
import AdvancedAnalytics from './components/analytics/AdvancedAnalytics';

import Register from './components/register__login/Register';
import Login from './components/register__login/Login';

import Item from './components/predictionModel/Item';
import Customer from './components/predictionModel/Customer';
import MarketBasedAnalysis from './components/predictionModel/MarketBasedAnalysis';
import ABCProfitSales from './components/predictionModel/ABCProfitSales';
import SalesForcast from './components/predictionModel/SalesForcast';

import Barchart1 from './components/analyticsChartGraph/Barchart1';
import BarChart2 from './components/analyticsChartGraph/BarChart2';
import LineChart from './components/analyticsChartGraph/LineChart';
import PieChart from './components/analyticsChartGraph/PieChart';

import './App.css';

import Home from './components/home/Home';


// Check for token
if(localStorage.jwtToken){
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  // const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(localStorage.jwtToken));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if(localStorage.jwtToken.exp < currentTime){
    // Logout user
    store.dispatch(logoutUser());
    //TODO: Clear current Profile

    // Redirect to login
    window.location.href = '/';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <Switch>
            <div className="App">
              <Navbar />
              <Route exact path="/" component={Landing} />
              <div className="container">
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
                {/* <Route path="/barchart1" component={Barchart1} />
                <Route path="/barchart2" component={BarChart2} />
                <Route path="/linechart" component={LineChart} />
                <Route path="/piechart" component={PieChart} /> */}
              </div>
              <div className="container-fluid">
                <Route path="/analytics" component={Analytics} />
                <Route path="/advanceAnalytics" component={AdvancedAnalytics} />
                <Route path="/item" component={Item} />
                <Route path="/customer" component={Customer} />
                <Route path="/marketAnalysis" component={MarketBasedAnalysis} />
                <Route path="/ABCProfitSales" component={ABCProfitSales} />
                <Route path="/salesForcast" component={SalesForcast} />
              </div>
              <Footer />
            </div>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;