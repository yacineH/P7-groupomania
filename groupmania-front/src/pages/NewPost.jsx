import React, { useContext, useState } from "react";
import {useHistory} from 'react-router-dom';
import Header from "../components/Header";
import employeeContext from "../contexts/employeeContext";
import Footer from "../components/Footer"; 
import "../utils/styles/NewPost.css";
import {persistPost} from "../services/postAPI"
import NonImage from "../assets/no-image.jpg"

function NewPost(){

    const history = useHistory()
    const {employeeId} = useContext(employeeContext)
    const [currentPost,setCurrentPost] =useState({
        employeeId : employeeId,
        title :"",
        message :"",
        image : null
    })
    const [imageLocale,setImageLocale]=useState(NonImage)

    const handleChange = (event)=>{
        
        const {name,value} = event.target
        if(name === "image"){
            var fReader = new FileReader()
            fReader.readAsDataURL(event.target.files[0])
            fReader.onload = function (e){
                setImageLocale(e.target.result)
            }

            setCurrentPost({...currentPost,
                [name] : event.target.files[0]
            })
        }
        else{
            setCurrentPost({...currentPost,
                [name] : value
            })
        }
    }

    const handleSubmit =async (event) =>{
       event.preventDefault()

         await persistPost(currentPost)
         .then((response)=>{
            
            if(response.status < 300)
            {
                setTimeout(()=>{
                    history.replace("home")
                },1000) 
            }
            else{
                console.log("retour",response)
            }
         })
         .catch(error=>console.log(error))
      
   
    }

    return (<div>
                <Header/>
                <form onSubmit={handleSubmit}>
                    <h2>New Post</h2>
                    <div className="form-group row mt-2">
                        <label htmlFor="employeeId" className="col-sm-2 col-form-label">Id</label>
                        <div className="col-sm-10">
                          <input className="form-control" type="text" id="employeeId"                         
                                 name="employeeId" value={employeeId} onChange={handleChange}  readOnly/>
                        </div>
                    </div>
                    <div className="form-group row mt-2">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Titre</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" 
                               id="title" name="title" aria-describedby="titleHelp" onChange={handleChange} required/>                        
                        </div>
                    </div>
                    <div className="form-group row mt-2">
                        <label htmlFor="message" className="col-sm-2 col-form-label">Message</label>
                        <div className="col-sm-10">
                           <textarea className="form-control" id="message" name="message" rows="5" 
                                     onChange={handleChange} required></textarea>
                        </div>
                    </div>                
                    <div className="form-group row mt-2">
                        <label htmlFor="image" className="col-sm-2 col-form-label">Image</label>
                        <div className="col-sm-10">
                           <input type="file" className="form-control" accept=".png,.jpeg, .jpg" 
                                  id="image" name="image" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="form-group row mt-2">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                            <img src={imageLocale} alt={currentPost.title}/>
                        </div>

                    </div> 
                    <div className="divSubmit mt-6">
                      <button type="submit">Submit</button>
                    </div>
                </form>
                <Footer/>
            </div>
    )
}
export default NewPost