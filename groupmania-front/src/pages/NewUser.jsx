import React,{useState} from "react";
import {register} from "../services/authAPI";
import Header from "../components/Header";
import "../utils/styles/NewUser.css";

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
               New Employee
            </h2>
            <div className="form-group row mt-4">
               <label htmlFor="name" className="col-sm-2 col-form-label">Nom</label>
               <input type="text" name="name"  className="form-control col-sm-10" 
                     id="name" aria-describedby="nomHelp" onChange={handleChange}/>
            </div> 
            <div className="form-group row mt-4">
               <label htmlFor="email"  className="col-sm-2 col-form-label">Email</label>
               <input type="email" name="email" placeholder="name@example.com" className="form-control col-sm-10" 
                     id="email" aria-describedby="emailHelp" onChange={handleChange}/>
            </div>
            <div className="form-group row mt-4">
               <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
               <input type="password" className="form-control col-sm-10" id="password"
                     name="password" onChange={handleChange}/>
            </div>
            <div className="form-group form-check mt-4 ml-2">
               <input type="checkbox" className="form-check-input" defaultChecked={false}
                      onChange={handleCheck} name="checkAdmin" value={adminCheck}  id="checkAdmin"/>
               <label className="form-check-label" htmlFor="checkAdmin">Admin</label>
            </div>
            <div className="divButton">              
                <button type="submit">Submit</button>
            </div> 
          
            <p>{showMessage && message}</p>
       </form>
       </div>)
}

export default NewUser