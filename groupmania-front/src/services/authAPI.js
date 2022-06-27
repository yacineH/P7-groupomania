import {URL_LOGIN,URL_SIGN} from '../utils/config';
import jwtDecode from 'jwt-decode';

const token = window.localStorage.getItem("token")

export function authenticate(credentiels){
    return fetch(URL_LOGIN,{
      method : "POST",
      headers :{
        'Accept' : 'Application/json',
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({
        email : credentiels.email,
        password : credentiels.password
      })
    })
    .then(res=>res.json())
    .then(data => {
      if(data.token){
        window.localStorage.setItem("token",data.token)
      }
      else{
        throw new Error()
      }
    })
    .catch(error =>{throw new Error()})
  }

 
 export function isAuth(){  
    if(token){
      const {exp} = jwtDecode(token)

      if(exp * 1000 > new Date().getTime()){
         return true
      } 
       return false
    }
    return false
  }

  export function checkAdmin(){

    if(token){
       return jwtDecode(token).employee.admin
    } 
    return false
  }

  export function checkId(){    
    let id =""
    if(token){
       id = jwtDecode(token).employee.id
    } 
    return id
  }

  export function register(credentiels,adm){
    return fetch(URL_SIGN,{
      method : "POST",
      headers :{
        'Accept' : 'Application/json',
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({
        email : credentiels.email,
        password : credentiels.password,
        name : credentiels.name,
        admin : adm
      })
    })
    .then(res=> res.json())
    .catch(error=>{ throw new Error()})

  }
