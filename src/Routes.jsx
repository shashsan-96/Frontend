import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

// components
import Home from "./components/HomeContent/Home";
import Navbar from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Reg from "./components/Register/Register";




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

 const Url = () => (
  <Switch>
    <RouterMain exact path={'/'} component={Home} />
    <RouterMain exact path={'/login'} component={Login} />
    <RouterMain exact path={'/register'} component={Reg} />
    <Redirect to={'/'} />
  </Switch>
);

export default Url;