import React from "react";
import { Outlet } from "react-router-dom";
import LeftSide from "../component/LeftSide/LeftSide";
import "./style.css"
const ProfileLayout = () => {
    return (
        <>
            <div className="personal">
                <LeftSide />
                <div className="personal-right">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default ProfileLayout;