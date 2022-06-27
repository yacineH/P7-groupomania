import React, { useState } from "react";
import {AiTwotoneDislike,AiTwotoneLike} from 'react-icons/ai';
import '../utils/styles/like.css';

export default function Like({likes,dislikes}){

     const [nbLike,setNbLike]=useState(likes)
     const [nbDislike,setNbDislike]=useState(dislikes)

     const handleClick = () =>{
            

     }


    return (
        <div className="divCont">
            <div className="divLik">
                <span>{nbLike}</span>
                <button onClick={handleClick}>
                  <AiTwotoneLike/>
                </button>
            </div>
            <div className="divDislik">
               <span>{nbDislike}</span>
               <button onClick={handleClick}>
                <AiTwotoneDislike/>
               </button>               
            </div>
        </div>
         
        
    )
}