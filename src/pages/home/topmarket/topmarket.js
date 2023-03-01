import React, { useEffect, useState } from "react";
import SingleCoin from "../../../component/singlecoin/SingleCoin";
import axios from "axios"
import "./style.css"

const TopMarket = () => {
    const [marketData, setMarketData] = useState();
    useEffect(() => {
        getTopMarket();
        setInterval(getTopMarket, 60000);
    }, [])
    const getTopMarket = () => {
        axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/cryptocurrency/getMainCoin`)
            .then((res) => {
                setMarketData(Object.values(res.data.data).sort(function (a, b) { return a.cmc_rank - b.cmc_rank }));
            })
            .catch((res) => {
                console.log(res, "res error");
            });
    }
    return (
        <>
            <div className="home-top-market">
                <div className="title">
                    <p style={{ color: "#5367FF" }}>Top Market</p>
                    <h1>Get Various Crypto Coin</h1>
                    {!marketData ? <div>Loading</div> : <><div className="topcoin-wrap">
                        {marketData.map((item, index) =>
                            <SingleCoin coinName={item.name} coinId={item.id} logogram={item.symbol} price={item.quote.USD.price.toFixed(2)} percent={item.quote.USD.percent_change_7d.toFixed(2)} />
                        )}
                    </div></>}

                </div>
            </div>
        </>
    )
}
export default TopMarket