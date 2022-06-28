import React from 'react';
import NoImage from "../assets/no-image.jpg";

export default function CardPost({post}) {

  const imgUrl = post.imageUrl ? post.imageUrl : NoImage

  return (<div  className="divCard">
            <div className='divImg'>
              <img src={imgUrl} alt="post.message" />
            </div>
            
            <div className='divContent'>
              <p><span>Posté le : </span>{new Date(post.datePost).toLocaleString()}</p>
              <p className="card-text">{post.message.substring(0,100)} ...</p>                             
            </div>
           
          </div>)
}
