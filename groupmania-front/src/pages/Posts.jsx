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
      const fetchPosts = async ()=>{                
          return await findPosts()        
      }


      fetchPosts()
       .then((data) =>  {
        setPosts(data)
        setIsLoading(false)
        setIsAdmin(checkAdmin)
        if(posts){
          posts.sort((param1,param2)=>{
           return param1.datePost - param2.datePost
          })
        } 
       })
       .catch(error=> {
        console.log(error)
       })    
       
    },[posts,isLoading,setIsAdmin])

    return (
        <div>
          <Header/>

          <div>
          <Link to="/newPost">
                <button>
                      New Post
                </button>
            </Link>

            { isAdmin && (
                <Link to="/register">
                  <button>
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
                       <Link to={`/post/${post._id}`} key={post._id}>
                         <CardPost  post={post} />
                       </Link>                    
                   ),0)
                }
  
            </div>
          </div>
         <Footer/>
        </div>
    )
}