import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'

import {Link} from 'react-router-dom'
import axios from 'axios'

import Logo from '../../images/logo.svg'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
   
    const [menu, setMenu] = useState(false)

    const logoutUser = async () =>{
        await axios.get('/user/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    const adminRouter = () =>{
        return(
            <>
                <li><Link to="/create_product">ADD NEW BOOK</Link></li>
                <li><Link to="/category">BOOK CATEGORIES</Link></li>
                <li><Link to="/report">GENERATE REPORT</Link></li>
            </>
        )
    }

    const loggedRouter = () =>{
        return(
            <>
                <li><Link to="/" onClick={logoutUser} id="Logout_btn">Logout</Link></li>
            </>
        )
    }


    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo">
               
                    <a href={isLogged ? "/book" : "/"}>{isAdmin ? <h1>Akura <b style={{fontSize:"120%", color:"#248eff"}}>.</b></h1>  : <h1>Akura <b style={{fontSize:"120%", color:"#248eff"}}>.</b></h1>}</a>
             
            </div>

            <ul style={styleMenu}>
                <li><a href="/book">{isAdmin ? 'BOOKS' : 'BOOKS'}</a></li>
                
                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li><Link to="/login" id="Login_btn">Login</Link></li>
                }

                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>

            </ul>

            
        </header>
    )
}

export default Header
