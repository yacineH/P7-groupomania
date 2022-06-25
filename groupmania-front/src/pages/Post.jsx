import React ,{useContext, useEffect,useState} from "react";
import { useParams,Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import {findPost} from "../services/postAPI"
import AdminContext from "../contexts/adminContext";
import '../utils/styles/post.css'
import Like from "../components/Like";


export default function Post(){

    const [currentPost,setCurrentPost] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
    const {isAdmin} =useContext(AdminContext)

    const {id} = useParams()

    useEffect(()=>{
        findPost(id)
        .then(data =>{
          setCurrentPost(data)
          setIsLoading(false)
          console.log('data',currentPost)
        })
        .catch(err=>console.log(err))
    },[findPost])
    

    return (
       <div>
         <Header/>
          <main>
            <div>
            {isLoading ? (
                <div class="text-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
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
                          <p class="card-text">{currentPost.message}</p>
                          <p class="card-text"><small class="text-muted">{new Date(currentPost.datePost).toLocaleString()}</small></p>
                        </div>
                    </div>
                    <div className="divButtons">
                      <div className="divLik">
                         <Like likes={currentPost.likes} dislikes={currentPost.dislikes}/>
                      </div>
                      <div className="divBtn">
                        <button>Update</button>
                        <button>Delete</button>
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