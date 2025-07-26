import React from 'react';

import { Navigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import Loading from '../Pages/SharedComponents/Loading/Loading';

const ModeratorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { roleLoading, role } = useUserRole()

    if (loading || roleLoading) {
        return <Loading></Loading>;
    }


    if (!user || role !== 'moderator') {
        return <Navigate to='/forbidden' state={{ form: location.pathname }}> </Navigate>
    }

    return children;
};

export default ModeratorRoute ;