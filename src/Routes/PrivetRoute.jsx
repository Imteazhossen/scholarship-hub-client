import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import Loading from '../Pages/SharedComponents/Loading/Loading';

const PrivateRoute = ({children}) => {
    
    const {user, loading} = useAuth();
    const location = useLocation()

    if ( loading){
        return <Loading></Loading> ;
    }
    if(!user){
     return   <Navigate to='/login' state={{form: location.pathname}}> </Navigate>
    } 
    
    return children;
};

export default PrivateRoute;