import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header/header";
import Footer from "../component/Footer/Footer";
const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
export default Layout;