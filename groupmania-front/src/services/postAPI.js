import {URL_ALLPOSTS} from '../utils/config'

const token = window.localStorage.getItem('token') 

function findPosts(){

   return fetch(URL_ALLPOSTS,{
        method :'GET',
        headers : {
            'Accept' : 'Application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    .then((res)=>res.json())
}


function findPost(id){
   const chemin =URL_ALLPOSTS +'/'+id
   return fetch(chemin,{
        method : "GET",
        headers :{
          'Accept' : 'Application/json',
          'Authorization' : `Bearer ${token}`
        }
       })
       .then((res)=>res.json())
}


function persistPost(post){


  const formData =new FormData()
  
  formData.append('post' ,JSON.stringify({
    employeeId : post.employeeId,
    title :post.title,
    message : post.message
  }))

  if(post.image) formData.append('image',post.image)
   
  return fetch(URL_ALLPOSTS,{
    method : "POST",
    headers :{
      'Accept' : '*/*',
      'Authorization' : `Bearer ${token}`
    },
    body : formData
  })
}


function deletePost(id,empId){
  var chemin =new URL(URL_ALLPOSTS + "/" +id)

  return fetch(chemin,
      {
       method : "DELETE",
       headers :{
        'Authorization': `Bearer ${token}`
       }
    })
    .then((res)=>{
        console.log(res)
        res.json()
    })
}


function updatePost(post){
  
  const formData =new FormData()

  formData.append('post',JSON.stringify({
        employeeId : post.employeeId,
        title : post.title,
        message : post.message  
  }))
  
  //doit etre le meme nom image dans la config de multer
  if(post.image) formData.append('image',post.image)

  var chemin =new URL(URL_ALLPOSTS + "/" + post._id)

  return fetch(chemin,{
       method : "PUT",
       headers :{
        'Authorization': `Bearer ${token}`
       },
      body : formData
    })
    .then((res)=>{
        console.log(res)
        res.json()
    })
}

export {findPost,findPosts,persistPost,updatePost,deletePost}

