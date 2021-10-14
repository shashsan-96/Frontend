
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import OrderListScreen from './screens/OrderListScreen';
import UpdateOrder from './screens/UpdateOrder';
import OrderListPdf from './screens/OrderListPdf';



import React, { Component } from 'react';
import {BrowserRouter,Route } from 'react-router-dom';
import CreatedStationery from './components/CreateStationery';
import EditPost from './components/EditPost';
import SHome from './components/SHome';
import StationeryDetails from './components/StationeryDetails';
import CusView from './components/CusView';
import Stationeryrepo from './components/Stationeryrepo';
import Editphoto from './components/Editphoto';
import drawing from './components/drawing';
import writing from './components/writing';
import working from './components/working';
import office from './components/office';
import Footer from './components/Footer/Footer';

import Navbar from "./components/Header/Header";

import './StyleStationery.css';
import '../src/scss/main.scss';
import '../src/scss/_header.scss';
import '../src/scss/_footer.scss';










export default class App extends Component {
  render() {
    return (
      
      <BrowserRouter>
      
      <Navbar/>
     
     
     
         <Route path="/" exact component={SHome}></Route>
         <Route path="/add" exact component={CreatedStationery}></Route>
         <Route path="/edit/:id" exact component={EditPost}></Route>
         <Route path="/stationery/:id" component={StationeryDetails}></Route>         
         <Route path="/display" exact component={CusView}></Route>
         <Route path="/drawing" exact component={drawing}></Route>
         <Route path="/writing" exact component={writing}></Route>
         <Route path="/working" exact component={working}></Route>
         <Route path="/office" exact component={office}></Route>
         <Route path="/report" exact component={Stationeryrepo}></Route>
         <Route path="/edit2/:id" exact component={Editphoto}></Route>
         <Footer/>


         
         
        
      </BrowserRouter>
      





      
     
    );
  }

import '../src/scss/main.scss';
import Routes from './Routes';
import { BrowserRouter as Router} from "react-router-dom";
function App() {

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row" style={{borderBottom: "1px #c0c0c0 solid", paddingBottom: "7px"}}>
          <div style={{marginLeft: "2cm"}}>
            <Link className="brand" to="/">
              Akura <b style={{fontSize: "40px",color: "009ffc"}}>.</b> &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
            </Link>
            <Link  to="/" className="navbar">
              HOME&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
            </Link>
            <Link  to="/" className="navbar">
              BOOKS&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
            </Link>
            <Link  to="/" className="navbar">
              STATIONERIES&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
            </Link>
            <Link  to="/" className="navbar">
              CONTACT US&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
            </Link>
            <Link  to="/" className="navbar">
              ABOUT US
            </Link>
          </div>
          
          <div>
            
            <Link to="/cart">
            
              <i className="fa fa-shopping-cart" style={{fontSize: "35px", color: "rgb(51, 51, 199)"}}></i>
                                    
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link> &nbsp;
            {userInfo ? (
              <div className="dropdown">
                <Link to="/orderhistory" className="navbar"><i class="fa fa-history" style={{fontSize: "25px"}}></i> &nbsp;ORDER HISTORY</Link>
                <Link to="#" className="navbar">
                  <i className="fa fa-user" style={{fontSize: "25px"}}>&nbsp;</i>
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile" className="navbar">USER PROFILE</Link>
                  </li>
                  <li>
                    <Link to="#signout" className="navbar" onClick={signoutHandler}>
                      SIGN OUT
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin" className="navbar"><button id="login_btn">LOGIN</button></Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin" className="navbar">
                  ADMIN <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard" className="navbar">DASHBOARD</Link>
                  </li>
                  <li>
                    <Link to="/productlist" className="navbar">PRODUCTS</Link>
                  </li>
                  <li>
                    <Link to="/orderlist" className="navbar">ORDERS</Link>
                  </li>
                  <li>
                    <Link to="/userlist" className="navbar">USERS</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        <main style={{marginTop: "0.8cmcm"}}>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          {/* <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route> */}
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/editOrder" component={UpdateOrder}></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          {/* <AdminRoute
            path="/productlist"
            component={ProductListScreen}
          ></AdminRoute> */}
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
          ></AdminRoute>
          <AdminRoute path="/OrderListPdf" component={OrderListPdf}></AdminRoute>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center"></footer>
      </div>
    </BrowserRouter>

 return (
  <Router>
    <Routes />
  </Router>

  );

}

