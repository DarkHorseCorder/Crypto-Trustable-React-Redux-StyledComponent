import React from "react";
import { Link } from "react-router-dom";
const SingleServiceBenefit = ({ item }) => {
    return (
        <>
            <div className="service-item">
                <div className="img-wrap">
                    <img alt="" src={`image/${item.image} `} />
                </div>
                <h5>{item.name}</h5>
                <p><Link to="/bonus" style={{ display: item.name === "Bonus & Refferal" ? "" : "none" }}>Click Here</Link>{item.description}</p>
            </div>
        </>
    )
}
export default SingleServiceBenefit;