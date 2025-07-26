import {createBrowserRouter} from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Home/Authentication/Login/Login";
import Register from "../Pages/Home/Authentication/Register/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import AddScholarship from "../Pages/Dashboard/DashboardHome/Moderator/AddScholarship";
import AllScholarship from "../Pages/AllScholarships/AllScholarships";
import ScholarshipDetails from "../Pages/ScholarshipDetails/ScholarshipDetails";
import Payment from "../Pages/Payment/Payment";
import Applications from "../Pages/Dashboard/DashboardHome/User/Applications";
import PrivateRoute from "../Routes/PrivetRoute";
import MyProfile from "../Pages/SharedComponents/MyProfile/MyProfile";
import MyReviews from "../Pages/Dashboard/DashboardHome/User/MyReviews";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "allScholarships",
                element: <AllScholarship></AllScholarship>
            },
            {
                 path: 'scholarships/:id',
                 element: <PrivateRoute><ScholarshipDetails></ScholarshipDetails></PrivateRoute> 
            },
            {
                path: 'payment/:id',
                element: <PrivateRoute> <Payment></Payment></PrivateRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: "addScholarships",
                element: <AddScholarship></AddScholarship>
            },
            {
                path: 'applications',
                element: <Applications></Applications>
            },
            {
                path: 'myProfile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'myReviews',
                element: <MyReviews></MyReviews>
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
        ]

    }
]);