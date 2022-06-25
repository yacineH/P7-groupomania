import React,{useState,useContext} from "react";
import {useHistory} from 'react-router-dom';

import {authenticate, checkAdmin, checkId} from "../services/authAPI";
import AuthContext from "../contexts/authContext";
import AdminContext from "../contexts/adminContext";
import EmployeeContext from "../contexts/employeeContext";
import  '../utils/styles/login.css';
import Logo from '../assets/dark-logo.png';


 function Login(){

   const history = useHistory()
   const [credentiels,setCredentiels] =useState({
        email :"",
        password :""
    })
   const {setIsAuthenticated} = useContext(AuthContext)
   const {setIsAdmin} = useContext(AdminContext)
   const {setEmployeeId} = useContext(EmployeeContext)
   const [isError,setIsError] =useState(false)
   const msgError = "* Email ou mot de pass incorrect"


   const handleChange = (event) => {
      const {name,value} = event.target
      setCredentiels({
         ...credentiels,
         [name] : value
      })
   }
 
   const handleSubmit = async(event) => {
       event.preventDefault()
        try{
            await authenticate(credentiels)
            setIsAdmin(checkAdmin)
            setIsAuthenticated(true)            
            setEmployeeId(checkId)
            setTimeout(()=>{
               history.replace("home")
            },2000)               
            
        }catch(error){
            setIsError(true)
       }
   }

    return (<div className="divForm">
            <div className="divLogo">
               <img src={Logo} alt="Logo-groupomania"/>
            </div>
            <div className="divBienvenue">
              <h1>Bienvenue dans l'intranet de Groupomania</h1>
            </div>
            <form  onSubmit={handleSubmit}>

                  <div className="divField">
                     <label htmlFor="email">Email</label>
                     <input type="email" name="email" placeholder="name@example.com" 
                            className="form-control" id="email" 
                            required aria-describedby="emailHelp" onChange={handleChange}/>
                  </div>
                  <div className="divField">
                     <label htmlFor="password">Password</label>
                     <input type="password" className="form-control" 
                            id="password" name="password" 
                            required onChange={handleChange}/>
                  </div>
                  <div className="divBtn">
                     <button type="submit">Login</button>
                  </div>
                  {isError ? <p>{msgError}</p> : ""}
            </form>
            </div>
      )
}

export default Login