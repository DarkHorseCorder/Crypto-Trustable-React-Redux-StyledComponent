import React from "react";
import { Link } from "react-router-dom";
import "./style.css"
const StartMining = () => {
    return (
        <>
            <div className="start-mining row">
                <div className="col-6 left">
                    <h2>Newsletter</h2>
                    <p>Just insert your e-mail to get the latest news about Crypto Trustable !</p>
                </div>
                <div className="col-6 right">
                    <div className="input-wrap">
                        <input placeholder="Enter your email" />
                    </div>
                    <Link to="">Subscribe</Link>
                </div>
            </div>
        </>
    )
}
export default StartMining;