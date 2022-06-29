import React from 'react';
import NoImage from "../assets/no-image.jpg";

export default function CardPost({post}) {

  const imgUrl = post.imageUrl ? post.imageUrl : NoImage

  return (<div style={{margin : "20px",border:"1px solid #ffd7d7",display: "flex",borderRadius: "20px"}}>
            <div style={{width: "250px",height: "200px",marginRight: "30px"}}>
              <img style={{borderTopLeftRadius: "20px",borderBottomLeftRadius: "20px",width: "250px",height: "200px"}} src={imgUrl} alt="post.message" />
            </div>
            
            <div style={{paddingTop: "25px",paddingRight: "15px"}}>
              <p style={{color :"#4E5166",fontSize: "16px"}}>
                 <span style={{color: "black"}}>Posté le : </span>{new Date(post.datePost).toLocaleString()}
              </p>
              <p style={{color :"#4E5166",fontSize: "16px"}}>{post.message.substring(0,100)} ...</p>                             
            </div>
          </div>)
}
