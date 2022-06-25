import React,{useState,useContext} from "react";
import {useHistory} from 'react-router-dom';

import {authenticate} from "../services/authAPI";
import AuthContext from "../contexts/authContext";
import AdminContext from "../contexts/adminContext";




 function NewUser(){

   const history = useHistory()
   const [credentiels,setCredentiels] =useState({
        email :"",
        password :""
    })
   const {setIsAuthenticated} = useContext(AuthContext)
   const {setIsAdmin} = useContext(AdminContext)



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
          
           const data = await authenticate(credentiels)
           setIsAdmin(data.isAdmin)
           setIsAuthenticated(true)               
           history.replace("home")

        }catch(error){
            console.log(error)
       }
   }

    return (

    

      <form onSubmit={handleSubmit}>
            <p>
               Ajouter un nouveau employee
            </p>
            <div className="form-group">
               <label for="email">Email address</label>
               <input type="email" name="email" placeholder="name@example.com" class="form-control" 
                     id="email" aria-describedby="emailHelp" onChange={handleChange}/>
            </div>
            <div>
               <label for="password">Password</label>
               <input type="password" class="form-control" id="password"
                     name="password" onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
       </form>
    )
}

export default NewUser