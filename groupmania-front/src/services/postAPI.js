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


export {findPost,findPosts}

