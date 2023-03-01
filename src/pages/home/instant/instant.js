import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
const Instant = () => {
    return (
        <>
            <div className="instant row">
                <div className="col-6 left">
                    <div className="title">
                        <h1 style={{ color: "white" }}>Trade</h1>
                        <h1 style={{ color: "#5367FF" }}>Crypto Instantly</h1>
                    </div>
                    <p >Welcome to Crypto Trustable  . Here you can send , receive , and exchange crypto very easy !</p>
                    <Link to="/market">Let’s Go</Link>
                    {/* <div className="logo-wrap row">
                        <div className="col-5 d-flex" style={{ flexDirection: "column", alignItems: "flex-start" }}>
                            <img className="logo1" alt="" src="image/instant-logo1.svg" />
                            <img className="logo4" alt="" src="image/instant-logo4.svg" />
                        </div>
                        <div className="col-3 d-flex" style={{ flexDirection: "column", alignItems: "center" }}>
                            <img className="logo2" alt="" src="image/instant-logo2.svg" />
                            <img className="logo5" alt="" src="image/instant-logo5.svg" />
                        </div>
                        <div className="col-4 d-flex" style={{ flexDirection: "column", alignItems: "center" }}>
                            <img className="logo3" alt="" src="image/instant-logo3.svg" />
                            <img className="logo6" alt="" src="image/instant-logo6.svg" />
                        </div>
                    </div> */}
                </div>
                <div className="col-6 right">
                    <img alt="" src="image/homelogo/2.gif" />
                </div>
            </div>
        </>
    )
}
export default Instant;