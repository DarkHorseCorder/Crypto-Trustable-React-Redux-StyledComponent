import React from "react";
import { useNavigate } from "react-router-dom";

const CoinRow = ({ item, index, smallType }) => {
    const navigate = useNavigate();
    const coinClick = () => {
        navigate(`/detail/${item.symbol}`);
    }
    const percent = item.quote.USD.percent_change_24h.toFixed(3);
    return (
        <>
            <tr onClick={() => coinClick()}>
                <td style={{ display: smallType ? "none" : "" }} className="index"><img alt="" src="image/market/star.svg" /> {index + 1}</td>
                <td className="name">
                    <img style={{ borderRadius: "100px" }} alt="" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`} />
                    <h5>{item.name}</h5>
                    <p>{item.symbol}</p>
                </td>
                <td className="price">${item.quote.USD.price.toFixed(5)}</td>
                <td className="percent" style={{ color: item.quote.USD.percent_change_24h > 0 ? "rgb(22, 199, 132)" : "rgb(234, 57, 67)" }} >{item.quote.USD.percent_change_24h > 0 ? "+" : ""}{percent}%</td>
                <td style={{ display: smallType ? "none" : "" }} className="high-price">${item.quote.USD.market_cap.toFixed(0)}</td>
                <td style={{ display: smallType ? "none" : "" }} className="low-price">${item.quote.USD.volume_24h.toFixed(0)}</td>
                <td style={{ display: smallType ? "none" : "" }} className="chart">
                    <img style={{ display: item.quote.USD.percent_change_7d > 0 ? "" : "none" }} className="up" alt="" src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${item.id}.svg`} />
                    <img style={{ display: item.quote.USD.percent_change_7d > 0 ? "none" : "" }} className="down" alt="" src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${item.id}.svg`} />
                </td>
            </tr>
        </>
    )
}
export default CoinRow;