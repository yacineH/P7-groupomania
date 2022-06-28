import React ,{useContext, useEffect,useState} from "react";
import { useParams,useHistory } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import {findPost,deletePost,updatePost} from "../services/postAPI";
import AdminContext from "../contexts/adminContext";
import EmployeeContext from "../contexts/employeeContext";
import '../utils/styles/post.css';
import Like from "../components/Like";
import NoImage from "../assets/no-image.jpg";



export default function Post(){

    const history = useHistory()
    const [isLoading,setIsLoading] = useState(true)
    const {isAdmin} =useContext(AdminContext)
    const {employeeId} = useContext(EmployeeContext)
    const {id} = useParams()
    const [imageLocale,setImageLocale]=useState(NoImage)
    const [currentPost,setCurrentPost] = useState({
      id : id,
      employeeId: employeeId,
      title: "",
      message :"",
      image : null
    })



    useEffect(()=>{
      
      const fetchPost = async ()=>{           
          const data = await findPost(id)
          setCurrentPost(data)
          setIsLoading(false)
      }
      
      fetchPost()
    },[id])
    

    const handleDelete =async (event) =>{
      event.preventDefault()
      try{
         await deletePost(currentPost._id,employeeId)
         .then(()=> history.replace("/home"))
      }catch(error){
        console.log(error)
      }
    }


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

    
    const handleUpdate =async (event)=>{
        event.preventDefault()

       try{
         await updatePost(currentPost)
          .then(()=>history.replace("/home"))

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
                  <form className="form">                                  
                    <div className="form-group row">
                      <div className="col-12">
                        { currentPost.imageUrl === "" ?
                            <img className="image" src={NoImage} alt={currentPost._id}/>
                          : <img className="image" src={currentPost.imageUrl} alt={currentPost._id}/>
                        } 
                      </div>        
                    </div>
                    
                    <div className="form-group row mt-2">
                      <label htmlFor="title" className="col-sm-3 col-form-label"> Titre</label>
                      <div className="col-sm-9">
                        <input type="text" name="title" className="form-control" id="title" 
                               value={currentPost.title} onChange={handleChange} />
                      </div>                     
                    </div>
                    
                    <div className="form-group row mt-2">
                      <label htmlFor="message" className="col-sm-3 col-form-label">Message</label>
                      <div className="col-sm-9">
                      <textarea className="form-control" id="message" name="message" rows="10" 
                                 required onChange={handleChange} value={currentPost.message}/>
                      </div>                    
                    </div>
                   
                    <div className="form-group row mt-2">
                      <label htmlFor="image" className="col-sm-3 col-form-label">Change Image</label>
                      <div className="col-sm-9">
                        <input type="file" className="form-control" accept=".png,.jpeg, .jpg" 
                                id="image" name="image" onChange={handleChange} />
                      </div>
                    </div>
                     
                    <div className="form-group row mt-2">
                      <label className="col-sm-3 col-form-label"></label>
                      <div className="col-sm-9">
                          <img src={imageLocale} alt={currentPost.title}/>
                      </div>
                    </div> 

                    <div className="form-group row mt-4">                       
                          <div className="col-sm-6 divLike">
                             <Like likes={currentPost.likes} dislikes={currentPost.dislikes}/>                        
                          </div>
                          <div className="col-sm-6 divBouttons">
                            <div>
                              {currentPost.employeeId === employeeId &&
                                <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
                              }
                            </div>
                            <div>
                              { (isAdmin || currentPost.employeeId === employeeId) &&
                                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                              }
                            </div>
                          </div>
                    </div>

                  </form>
                </div>
                )}     
       
        <Footer/>
        </div>
    )
}