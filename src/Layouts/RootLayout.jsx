import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/SharedComponents/Navbar/Navbar';
import Footer from '../Pages/SharedComponents/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='md:px-10 mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;