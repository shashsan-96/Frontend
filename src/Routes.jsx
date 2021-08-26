import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

// components
import Home from "./components/HomeContent/Home";
import Navbar from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Reg from "./components/Register/Register";
import Prof from "./components/Profile/Profile"
import Sidebar from "./components/SideBar/Sidebar";
import Admin from "./components/Admin/User";
import Feed from './components/FeedBacks/Feed';
import AddFeed from './components/AddFeed/AddFeed';
import Load from './components/RegLoad/Load'
import Update from './components/EditProf/EditProf'
const RouterMain = ({ component: Component, ...rest }) => {

  return (
    <Route  render={props => (
      <>
        <main className="content">
          <Navbar />
          <Component {...props} />
          <Footer/>
        </main>
      </>
    )}
    />
  );
};

const RouterDash = ({ component: Component, ...rest }) => {

  return (
    <Route  render={props => (
      <>

    <div className="container">
          <Sidebar />
          <Component {...props} />
      </div> 
         

      </>
    )}
    />
  );
};



const RouterN = ({ component: Component, ...rest }) => {

  return (
    <Route  render={props => (
      <>

    <div className="container">
          <Component {...props} />
      </div> 
         

      </>
    )}
    />
  );
};










 const Url = () => (
  <Switch>
    
    <RouterMain exact path={'/'} component={Home} />
    <RouterMain exact path={'/login'} component={Login} />
    <RouterMain exact path={'/register'} component={Reg} />
    <RouterMain exact path={'/profile'} component={Prof} />
    <RouterMain exact path={'/feedBack'} component={AddFeed} />
    <RouterMain exact path={'/profileUpdate'} component={Update} />

    <RouterDash exact path={'/dash'} component={Admin} />
    <RouterDash exact path={'/feedBackM'} component={Feed} />


    <RouterN exact path={'/load'} component={Load} />
    
    <Redirect to={'/'} />
  </Switch>
);

export default Url;