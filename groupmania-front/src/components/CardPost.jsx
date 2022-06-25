import React from 'react';

export default function CardPost({post}) {

  return (<div className="divCard">
            <div className='divImg'>
              <img src={post.imageUrl} alt="post.message" />
            </div>
            
            <div className='divContent'>
              <p className="card-text">{post.message}</p>
              <p>date du post : {new Date(post.datePost).toLocaleString()}</p>               
            </div>
           
          </div>)
}
