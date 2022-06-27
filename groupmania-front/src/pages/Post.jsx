import React ,{useContext, useEffect,useState} from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import {findPost} from "../services/postAPI";
import AdminContext from "../contexts/adminContext";
import EmployeeContext from "../contexts/employeeContext";
import '../utils/styles/post.css';
import Like from "../components/Like";



export default function Post(){

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
    },[setCurrentPost,setIsLoading,id])
    

    return (
       <div>
         <Header/>
          <main>
            <div>
            {isLoading ? (
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) :              
              (   
                  <div className="divContainer">
                    <div className="divImg">
                      <img src={currentPost.imageUrl} alt={currentPost._id}/>
                    </div>
                    <div className="divContent">
                        <div className="col-12">
                          <p className="card-title">{currentPost._id}</p>
                          <p className="card-text">{currentPost.message}</p>
                          <p className="card-text"><small className="text-muted">posté le  : {new Date(currentPost.datePost).toLocaleString()}</small></p>
                        </div>
                    </div>
                
                      <div className="divButtons">
                        <div className="divLik">
                          <Like likes={currentPost.likes} dislikes={currentPost.dislikes}/>
                        </div>
                        <div className="divBtn">
                          {currentPost.employeeId === employeeId &&
                            <button>Update</button>
                          }
                          { (isAdmin || currentPost.employeeId === employeeId) &&
                            <button>Delete</button>
                          }
                        </div>
                      </div>
   
                    </div>
                )}
            </div>
          </main> 
        
        <Footer/>
        </div>
    )
}