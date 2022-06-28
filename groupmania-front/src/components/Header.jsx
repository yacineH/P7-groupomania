import React from "react";
import { Link } from "react-router-dom";

import { AiOutlineLogout } from "react-icons/ai";

import Logo from '../assets/dark-logo.png';
import '../utils/styles/header.css';

export default function Header(){

    const handleClick =()=>{
       window.localStorage.clear()
    }

    return ( 
            <div className="divHeader">
               <div className="divLogo">
                    <Link to="/home">
                        <img src={Logo} alt="logo-groupomania"/>
                    </Link>
                </div>
                <div className="divLogout">
                    <Link to="/" onClick={handleClick}>
                       Logout <AiOutlineLogout/>                     
                    </Link>
                </div>
            </div>
            )        
}