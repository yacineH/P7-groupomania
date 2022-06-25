import React, { useState } from "react";
import {AiTwotoneDislike,AiTwotoneLike} from 'react-icons/ai';
import '../utils/styles/like.css';

export default function Like({likes,dislikes}){

    console.log(likes)
    const [nbLike,setNbLike]=useState(likes)
    const [nbDislike,setNbDislike]=useState(dislikes)

    return (
        <div className="divCont">
            <div className="divLik">
                <span>{nbLike}</span>
                <button>
                  <AiTwotoneLike/>
                </button>
            </div>
            <div className="divDislik">
               <span>{nbDislike}</span>
               <button>
                <AiTwotoneDislike/>
               </button>
               
            </div>
        </div>
         
        
    )
}