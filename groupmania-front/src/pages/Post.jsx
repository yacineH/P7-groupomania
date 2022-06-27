import React ,{useContext, useEffect,useState} from "react";
import { useParams,useHistory } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import {findPost,deletePost} from "../services/postAPI";
import AdminContext from "../contexts/adminContext";
import EmployeeContext from "../contexts/employeeContext";
import '../utils/styles/post.css';
import Like from "../components/Like";
import NoImage from "../assets/no-image.jpg";



export default function Post(){

    const history = useHistory()
    const [currentPost,setCurrentPost] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
    const {isAdmin} =useContext(AdminContext)
    const {employeeId} = useContext(EmployeeContext)
    const {id} = useParams()

    useEffect(()=>{
      const fetchPost = async ()=>{           
           return await findPost(id)
      }
      
      fetchPost()
      .then(data =>{
          setCurrentPost(data)
          setIsLoading(false)
      })
      .catch(error=>console.log(error))
    },[currentPost,setIsLoading,id])
    

    const handleDelete =async (event) =>{
      event.preventDefault()
      try{
      await deletePost(currentPost._id,employeeId)
       .then(()=> history.replace("/home"))
      }catch(error){
        console.log(error)
      }
    }

    return (
       <div>
         <Header/>

          
            {isLoading ? (
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) :              
              ( <div>  
                  <div className="like">
                   <Like likes={currentPost.likes} dislikes={currentPost.dislikes}/>                        
                  </div>  
                  <form className="container">                                  
                    <div className="form-group row">
                      <div className="col-12">
                        { currentPost.imageUrl === "" ?
                            <img className="image" src={NoImage} alt={currentPost._id}/>
                          : <img className="image" src={currentPost.imageUrl} alt={currentPost._id}/>
                        } 
                      </div>        
                    </div>
                    
                    <div className="form-group row">
                      <label htmlFor="title" className="col-sm-3 col-form-label"> Titre</label>
                      <div className="col-sm-9">
                        <input type="text" name="title" className="form-control" id="title" value={currentPost.title} />
                      </div>                     
                    </div>
                    
                    <div className="form-group row">
                      <label htmlFor="message" className="col-sm-3 col-form-label">Message</label>
                      <div className="col-sm-9">
                      <textarea className="form-control" id="message" name="message" rows="5" 
                                 required></textarea>
                      </div>                    
                    </div>
                   
                    <div className="form-group row">
                      <label htmlFor="image" className="col-sm-3 col-form-label">Change Image</label>
                      <div className="col-sm-9">
                        <input type="file" className="form-control" accept=".png,.jpeg, .jpg" 
                                id="image" name="image" />
                      </div>
                    </div>
                     
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label"></label>
                      <div className="col-sm-9">
                          <img src="" alt={currentPost.title}/>
                      </div>
                    </div> 

                    <div className="form-group row">                       
                          <div className="col-sm-6">
                          </div>
                          <div className="col-sm-6">
                            {currentPost.employeeId === employeeId &&
                              <button>Update</button>
                            }
                             
                            { (isAdmin || currentPost.employeeId === employeeId) &&
                              <button onClick={handleDelete}>Delete</button>
                            }
                          </div>
                    </div>

                  </form>
                </div>
                )}     
       
        <Footer/>
        </div>
    )
}