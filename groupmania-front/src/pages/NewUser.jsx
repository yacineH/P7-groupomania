import React,{useState} from "react";
import {register} from "../services/authAPI";
import Header from "../components/Header"

 function NewUser(){

   const [credentiels,setCredentiels] =useState({
        email :"",
        password :"",
        name :""
    })
   
   const [adminCheck ,setadminCheck] =useState(false)
   const [showMessage,setShowMessage]=useState(false)
   const [message ,setMessage]=useState("")

   const handleChange = (event) => {
      const {name,value} = event.target
      setCredentiels({
         ...credentiels,
         [name] : value
      })
   }

   const handleCheck =(event) =>{
       setadminCheck(current => !current) 
   }
 
   const handleSubmit = async(event) => {
         event.preventDefault()
         try{
         await register(credentiels,adminCheck)
           .then((data)=>{ 
             (data.name==="ValidationError") ? setMessage("email existe dèja") 
                          : setMessage(data.message)
             
             setShowMessage(true)
           })

         }catch(error){
            console.log(error)
         }
   }

    return (<div>
      <Header/>
       
      <form onSubmit={handleSubmit}>
            <h2>
               Nouveau employee
            </h2>
            <div className="form-group">
               <label htmlFor="name">Nom</label>
               <input type="text" name="name"  className="form-control" 
                     id="name" aria-describedby="nomHelp" onChange={handleChange}/>
            </div> 
            <div className="form-group">
               <label htmlFor="email">Email address</label>
               <input type="email" name="email" placeholder="name@example.com" className="form-control" 
                     id="email" aria-describedby="emailHelp" onChange={handleChange}/>
            </div>
            <div>
               <label htmlFor="password">Password</label>
               <input type="password" className="form-control" id="password"
                     name="password" onChange={handleChange}/>
            </div>
            <div className="form-group form-check">
               <input type="checkbox" className="form-check-input" defaultChecked={false}
                      onChange={handleCheck} name="checkAdmin" value={adminCheck}  id="checkAdmin"/>
               <label className="form-check-label" htmlFor="checkAdmin">Admin</label>
            </div> 
            <button type="submit">Login</button>
            <p>{showMessage && message}</p>
       </form>
       </div>)
}

export default NewUser