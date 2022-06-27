import React from 'react';
import NoImage from "../assets/no-image.jpg";

export default function CardPost({post}) {

  const imgUrl = post.imageUrl ? post.imageUrl : NoImage

  return (<div  className="divCard">
            <div className='divImg'>
              <img src={imgUrl} alt="post.message" />
            </div>
            
            <div className='divContent'>
              <p className="card-text">{post.message}</p>
              <p>Posté le : {new Date(post.datePost).toLocaleString()}</p>               
            </div>
           
          </div>)
}
