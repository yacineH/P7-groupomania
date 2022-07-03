import React,{useState,useContext} from "react";
import {useHistory,Link} from 'react-router-dom';

import {authenticate, checkAdmin, checkId} from "../services/authAPI";
import AuthContext from "../contexts/authContext";
import AdminContext from "../contexts/adminContext";
import EmployeeContext from "../contexts/employeeContext";
import Logo from '../assets/dark-logoB.png';


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
            
            history.replace("home")
                                   
        }catch(error){
            setIsError(true)
       }
   }

    return (<div>
               <div style={{  display: "flex",justifyContent: "center"}}>
                     <img style={{  width: "250px",height:"200px"}} src={Logo} alt="Logo-groupomania"/>
               </div>
               <div  style={{ border :"1px solid red",display: "flex", borderRadius: "20px", height: "400px"}} 
                     className="divForm container">
                <div className="row">
                  <div style={{ height: "398px", backgroundColor: "#ffd7d7",borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px", textAlign: "center"}} 
                      className="col-7">
                        <h1 style={{marginTop: "15%"}}>Bienvenue sur l'intranet de Groupomania</h1>
                        <p style={{marginTop:"30px"}}>Vous n'avez pas de compte ? <Link to="/register">Inscrivez-vous</Link></p>
                  </div>
                  
                  <form className="col-5"  
                        onSubmit={handleSubmit}>
                     <div style={{marginTop:"35px"}} className="row">
                        <div className="form-group col-12">
                           <label htmlFor="email">Email</label>
                           <input type="email" name="email" placeholder="name@example.com" 
                                 className="form-control" id="email" 
                                 required aria-describedby="emailHelp" onChange={handleChange}/>
                        </div>
                        <div className="form-group col-12 mt-4">
                           <label htmlFor="password">Password</label>
                           <input type="password" className="form-control" 
                                 id="password" name="password" 
                                 required onChange={handleChange} autoComplete="off"/>
                        </div>
                        <div className="col-12 mt-5 text-center">
                           <button style={{ color: "white",backgroundColor:"#FD2D01",width: "120px",height: "45px",fontSize: "18px",borderRadius: "15px",border:"1px solid #ffd7d7"}} 
                                   type="submit">
                                    Login
                           </button>
                        </div>
                     </div>
                     <div style={{marginTop:"15px",textAlign:"center"}}>
                          {isError ? <p style={{color:"red"}}>{msgError}</p> : ""}
                        </div>
                  </form>
               </div>            
               </div>
           </div>
      )
}

export default Login