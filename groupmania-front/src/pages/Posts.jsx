import React,{useState,useEffect,useContext} from "react";
import { Link } from "react-router-dom";

import CardPost from "../components/CardPost";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {findPosts} from "../services/postAPI"
import AdminContext from "../contexts/adminContext";
import '../utils/styles/posts.css';
import { checkAdmin } from "../services/authAPI";



export default function Posts(){

    const [posts,setPosts] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
    const {isAdmin,setIsAdmin} =useContext(AdminContext)

    useEffect(() => {      
      fetchAllPost()
    },[])

  const fetchAllPost = async ()=>{
      try{
        setIsAdmin(checkAdmin) 
        const data= await findPosts()
        setPosts(data)
        setIsLoading(false)
        
        //ordonner les objets par date
        posts.sort((param1,param2)=>{
          return param1.datePost - param2.datePost
        })

      }catch(error){
        console.log(error)
      }
    }

    return (
        <div>
          <Header/>

          <div>
          <Link to="/newPost">
                <button className="btn btn-primary">
                      New Post
                </button>
            </Link>

            { isAdmin && (
                <Link to="/register">
                  <button className="btn btn-primary">
                    New User
                  </button>               
              </Link>
              )
            } 
          </div>
          <div>
            <div className="divContainer">            
                { isLoading ? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                   </div>
                   ) : 
                   posts.map(post=>( 
                       <Link to={`/post/${post._id}`}>
                         <CardPost  post={post} key={post._id}/>
                       </Link>                    
                   ),0)
                }
  
            </div>
          </div>
         <Footer/>
        </div>
    )
}