import React, { useState } from "react";
import {AiTwotoneDislike,AiTwotoneLike} from 'react-icons/ai';


export default function Like({likes,dislikes}){

     const [nbLike,setNbLike]=useState(likes)
     const [nbDislike,setNbDislike]=useState(dislikes)

     const handleClick = () =>{
            

     }


    return (
        <div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
            <div style={{margin: "10px"}}>
                <span>{nbLike}</span>
                <button style={{margin: "3px",border: "0px"}} onClick={handleClick}>
                  <AiTwotoneLike/>
                </button>
            </div>
            <div>
               <span>{nbDislike}</span>
               <button style={{margin: "3px",border: "0px"}} onClick={handleClick}>
                <AiTwotoneDislike/>
               </button>               
            </div>
        </div>
         
        
    )
}