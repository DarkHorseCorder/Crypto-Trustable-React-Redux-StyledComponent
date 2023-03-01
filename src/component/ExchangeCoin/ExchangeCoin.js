import React, { useState } from "react";
import { Link } from "react-router-dom";
import SelectCoin from "../SelectCoin/SelectCoin";
import "./style.css"
const ExchangeCoin = () => {
    const [marketData, setMarketData] = useState([{
        name: {
            image: "bitcoin",
            fullName: "Bitcoin",
            logogram: "BTC"
        },
        id: 1,
    },
    {
        name: {
            image: "ethereum",
            fullName: "Ethereum",
            logogram: "ETH"
        },
        id: 1027,
    },
    {
        name: {
            image: "xrp",
            fullName: "XRP",
            logogram: "XRP"
        },
        id: 52,
    },
    {
        name: {
            image: "litecoin",
            fullName: "Litecoin",
            logogram: "LTC"
        },
        id: 2,
    },
    {
        name: {
            image: "polygon",
            fullName: "Polygon",
            logogram: "MATIC"
        },
        id: 3890,
    },
    {
        name: {
            image: "solana",
            fullName: "Solana",
            logogram: "SOL"
        },
        id: 5426,
    },
    {
        name: {
            image: "usdc",
            fullName: "United States Dollar",
            logogram: "USDC"
        },
        id: 3408,
    },
    {
        name: {
            image: "cardano",
            fullName: "Cardano",
            logogram: "ADA"
        },
        id: 2010,
    },
    {
        name: {
            image: "tether",
            fullName: "Tether",
            logogram: "USDT"
        },
        id: 825,
    },
    {
        name: {
            image: "avalanche",
            fullName: "Avalanche",
            logogram: "AVAX"
        },
        id: 5805,
    },]);
    return (
        <>
            <div className="exchange-coin">
                <h5>Exchange Coins</h5>
                <div className="price-status">
                    <p>
                        <img alt="" src="image/wallet.svg" />
                        $38,447.54
                    </p>
                    <p>
                        <img alt="" src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" />
                        $38,447.54
                    </p>
                </div>
                <SelectCoin label="Coin" placeholder="1.0" marketData={marketData} initialId={0} />

                <p className="exchange-wrap">
                    <img alt="" src="image/exchange.svg" />
                </p>
                <SelectCoin label="Coin" placeholder="1.0" marketData={marketData} initialId={1} />
                <p className="fee">No extra fees:</p>
                <div className="exchange-button-wrap">
                    <Link to="" className="exchange-button">Exchange</Link>
                </div>
            </div>
        </>
    )
}
export default ExchangeCoin