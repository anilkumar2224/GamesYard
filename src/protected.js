import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { isExpired} from "react-jwt";
// import axios from 'axios';

var isexpired = true;

const token = localStorage.getItem('jwttoken');
 if(isExpired(token)){
    isexpired = true;
  localStorage.removeItem('jwttoken');
}
else{
    isexpired = false;
}

// axios.get('/authenticated',{
//     headers:{
//       Authorization:token?`Bearer ${token}`:""

//     }
//   }).then(res=>{
//        if(res.data=='user authenticated'){
//      isexpired2= false; 
//        }
//   }).catch(err=>{
//       console.log(err);
//   })
    
const ProtectedRoute = ({ component: Component, ...rest }) => (
        

 
    <Route {...rest} render={(props) => (
        isexpired === false
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
)

export default ProtectedRoute;