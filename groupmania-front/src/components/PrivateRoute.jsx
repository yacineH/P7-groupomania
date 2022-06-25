import React,{useContext} from "react";
import AuthContext from "../contexts/authContext";
import { Redirect,Route,useHistory} from "react-router-dom";
import AdminContext from "../contexts/adminContext";

 const PrivateRoute  = ({path,component}) => {

    const {isAuthenticated} = useContext(AuthContext)
    const {location} = useHistory()
    const {isAdmin} = useContext(AdminContext)   
  
    if(isAuthenticated){
       if(isAdmin && location.pathname === "register"){
         return <Route path={path} component={component}/>
       }
       else{
         return <Redirect to="/home"/>
       }
       
    }else if(!isAuthenticated && location.pathname === "login"){
         return <Redirect to="/"/>
    }else{
       return <Redirect to="/"/>
    }
}

export default PrivateRoute;