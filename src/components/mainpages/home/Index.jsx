import React, {useContext, useState} from 'react'
import './home.css'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import logo from '../../../images/logo.svg'


// dashboard


export default function Index() {

    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged

 

    return (
        <>
        { !isLogged ?
        <>
        </>:<>
        </>
    }
    </>
    )
}
