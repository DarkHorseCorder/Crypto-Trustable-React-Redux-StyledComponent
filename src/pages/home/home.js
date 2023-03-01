import React from "react";
import Benefit from "./Benefit/Benefit";
import CreateProfile from "./CreateProfile/CreateProfile";
import DownloadApp from "./DownloadApp/DownloadApp";
import Instant from "./instant/instant";
import Investor from "./Investor/Investor";
import StartMining from "./StartMining/StartMining";
import "./style.css"
import TopMarket from "./topmarket/topmarket";
const Home = () => {
    return (
        <>
            <div className="home">
                <Instant />
                <TopMarket />
                <CreateProfile />
                {/* <DownloadApp /> */}
                <Benefit />
                {/* <Investor /> */}
                <StartMining />
            </div>
        </>
    )
}
export default Home;