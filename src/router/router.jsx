import { createBrowserRouter } from "react-router";
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
import Forbidden from "../Pages/Forbidden/Forbidden";
import ManageScholarships from "../Pages/Dashboard/DashboardHome/Moderator/ManageScholarships";
import AllReviews from "../Pages/Dashboard/DashboardHome/Moderator/AllReviews";
import AllAppliedScholarship from "../Pages/Dashboard/DashboardHome/Moderator/AllAppliedScholarship";
import AddScholarshipAdmin from "../Pages/Dashboard/DashboardHome/Admin/AddScholarshipAdmin";
import ManageUsers from "../Pages/Dashboard/DashboardHome/Admin/ManageUsers";
import ManageReview from "../Pages/Dashboard/DashboardHome/Admin/ManageReview";
import ManageScholarshipAdmin from "../Pages/Dashboard/DashboardHome/Admin/ManageScholarshipAdmin";
import ManageAppliedApplication from "../Pages/Dashboard/DashboardHome/Admin/ManageAppliedApplication";
import Analytics from "../Pages/Dashboard/DashboardHome/Admin/Analytics";
import ModeratorRoute from "../Routes/ModeratorRoute";
import AdminRoute from "../Routes/AdminRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Loading from "../Pages/SharedComponents/Loading/Loading";
import AboutUs from "../Pages/About Us/AboutUs";
import Media from "../Pages/About Us/Media/Media";
import ModeratorOverview from "../Pages/Dashboard/DashboardHome/Moderator/ModeratorOverview";
import UserOverview from "../Pages/Dashboard/DashboardHome/User/UserOverview";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <ErrorPage></ErrorPage>,
        hydrateFallbackElement: <Loading></Loading>,
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
                path: "aboutUs",
                element: <AboutUs></AboutUs>
            },
            {
                path: "media",
                element: <Media></Media>
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
                path: 'forbidden',
                element: <Forbidden></Forbidden>
            },
            //user
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
            },
            {
                path: 'userOverview',
                element: <UserOverview></UserOverview>
            },
            //Moderator 
            {
                path: "addScholarships",
                element: <ModeratorRoute><AddScholarship></AddScholarship></ModeratorRoute>
            },
            {
                path: "moderatorOverview",
                element: <ModeratorRoute><ModeratorOverview></ModeratorOverview></ModeratorRoute>,
            },
            {
                path: 'manageScholarships',
                element: <ModeratorRoute><ManageScholarships></ManageScholarships></ModeratorRoute>
            },
            {
                path: 'allReviews',
                element: <ModeratorRoute><AllReviews></AllReviews></ModeratorRoute>
            },
            {
                path: 'allAppliedScholarship',
                element: <ModeratorRoute><AllAppliedScholarship></AllAppliedScholarship></ModeratorRoute>
            },
            //Admin
            {
                path: 'addScholarshipAdmin',
                element: <AdminRoute><AddScholarshipAdmin></AddScholarshipAdmin></AdminRoute>
            },
            {
                path: 'manageUsers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'manageReviews',
                element: <AdminRoute><ManageReview></ManageReview></AdminRoute>
            },
            {
                path: 'manageScholarshipsAdmin',
                element: <AdminRoute><ManageScholarshipAdmin></ManageScholarshipAdmin></AdminRoute>
            },
            {
                path: 'manageAppliedApplication',
                element: <AdminRoute><ManageAppliedApplication></ManageAppliedApplication></AdminRoute>
            },
            {
                path: 'analytics',
                element: <AdminRoute><Analytics></Analytics></AdminRoute>
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