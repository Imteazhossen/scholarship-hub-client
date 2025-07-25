import React from 'react';


import useUserRole from '../../../Hooks/useUserRole';
import Loading from '../../SharedComponents/Loading/Loading';
import UserDashboard from '../OtherDashboards/UserDashboard';
import AdminDashboard from '../OtherDashboards/AdminDashboard';
import ModeratorDashboard from '../OtherDashboards/ModeratorDashboard';


const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();


    if (roleLoading) {
      return  <Loading></Loading>
    }

    if (role === 'user') {
        return <UserDashboard></UserDashboard>
    }
    else if (role === 'admin') {
       return  <AdminDashboard></AdminDashboard>
    }
    else if (role === 'moderator') {
       return <ModeratorDashboard></ModeratorDashboard>
    }
    // // else {
    //    return <Forbidden></Forbidden>
    // }
};

export default DashboardHome;