import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Products from './products/Products'
import DetailProduct from './detailProduct/DetailProduct'
import Login from './auth/Login'
import Register from './auth/Register'
import NotFound from './utils/not_found/NotFound'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'
import report from './report/report'
import Home from '../mainpages//home/Index'

import {GlobalState} from '../../GlobalState'


function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin


    return (
        <Switch>
            <Route path="/book"  component={Products} />
            <Route path="/" exact component={Home} />
            <Route path="/detail/:id"  component={DetailProduct} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />

            <Route path="/category"  component={isAdmin ? Categories : NotFound} />
            <Route path="/create_product"  component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id"  component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/report"  component={isAdmin ?  report : NotFound} />




            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
