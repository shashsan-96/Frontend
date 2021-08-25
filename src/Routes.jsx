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
import Product from "./pages/userList/UserList";
import Feed from './components/FeedBacks/Feed';
import AddFeed from './components/AddFeed/AddFeed';
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












 const Url = () => (
  <Switch>
    
    <RouterMain exact path={'/'} component={Home} />
    <RouterMain exact path={'/login'} component={Login} />
    <RouterMain exact path={'/register'} component={Reg} />
    <RouterMain exact path={'/profile'} component={Prof} />
    <RouterMain exact path={'/feedBack'} component={AddFeed} />
    <RouterMain exact path={'/profileUpdate'} component={Feed} />


    <RouterDash exact path={'/dash'} component={Product} />
    <RouterDash exact path={'/feedBackM'} component={Feed} />
    
    <Redirect to={'/'} />
  </Switch>
);

export default Url;