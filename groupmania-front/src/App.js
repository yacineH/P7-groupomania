import React, { useState } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import Posts from './pages/Posts';
import Post from './pages/Post';
import Login from './pages/Login';
import NewUser from './pages/NewUser'
import AuthContext from './contexts/authContext';
import AdminContext from './contexts/adminContext';
import EmployeeContext from './contexts/employeeContext';
import {checkAdmin, checkId, isAuth} from './services/authAPI';
import NewPost from './pages/NewPost';
//import PrivateRoute from './components/PrivateRoute';


function App() {
   
   const [isAuthenticated,setIsAuthenticated] = useState(isAuth)
   const [isAdmin , setIsAdmin] = useState(checkAdmin) 
   const [employeeId , setEmployeeId] = useState(checkId)

  return (
   <AuthContext.Provider value = {{isAuthenticated,setIsAuthenticated}}>
    <AdminContext.Provider value = {{isAdmin, setIsAdmin}}>
      <EmployeeContext.Provider value = {{employeeId, setEmployeeId}}>      
      <div className='container h-100'>
          <Router>
            <Route path="/" exact component={Login}/> 
            <Route path="/home"  component={Posts}/>
            <Route path="/post/:id" component={Post}/>
            <Route path="/register" component={NewUser}/>
            <Route path="/newPost" component={NewPost}/>             
          </Router>
      </div>
      </EmployeeContext.Provider>
    </AdminContext.Provider>
   </AuthContext.Provider>
  );
}

export default App;



