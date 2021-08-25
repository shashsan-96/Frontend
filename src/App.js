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
}

