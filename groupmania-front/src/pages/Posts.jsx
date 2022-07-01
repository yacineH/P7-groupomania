import React,{useState,useEffect,useContext} from "react";
import { Link } from "react-router-dom";

import CardPost from "../components/CardPost";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {findPosts} from "../services/postAPI"
import AdminContext from "../contexts/adminContext";
import { checkAdmin } from "../services/authAPI";
import { BsFillFilePostFill } from "react-icons/bs";



export default function Posts(){

    const [posts,setPosts] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
    const {setIsAdmin} =useContext(AdminContext)


    useEffect(() => {
      const fetchAllPosts =async () =>{
        try{        
         
          const data = await findPosts()
         
          data.sort((param1,param2)=>{
            return param2.datePost - param1.datePost
          })
          
          setPosts(data)
          setIsLoading(false)
          setIsAdmin(checkAdmin)
        }catch(error){
          console.log(error)
        }
      }

      fetchAllPosts()  
    })

    return (
        <div>
          <Header/>
          <div style={{display: "flex",justifyContent: "end",marginBottom: "20px"}}>
            <div style={{margin:"15px",color :"#4e5166"}}>
              <Link  style={{color :"#4e5166",fontSize: "18px",textDecoration:"none"}} to="/newPost">
                   New Post <BsFillFilePostFill/> 
              </Link>
            </div>                         
          </div>
          <div style={{marginBottom:"100px"}}>
            <div style={{display:"flex",flexDirection: "column",flexWrap: "wrap"}}>            
                { isLoading ? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                   </div>
                   ) : 
                   posts.map(post=>( 
                       <Link style={{ textDecoration: "none"}} to={`/post/${post._id}`} key={post._id}>
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