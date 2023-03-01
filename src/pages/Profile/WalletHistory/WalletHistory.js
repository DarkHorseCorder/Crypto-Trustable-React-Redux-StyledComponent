import React from "react";
import { useParams } from "react-router-dom";
import "./style.css"
const WalletHistory = () => {
    const { tokenName, tokenId } = useParams();
    const walletHistory = [
        {
            date: "2022-06-11 02:24",
            amount: 110.03,
            address: "0x6ef99c7e1bdd57e344c5a7d96f666157fd48c31d",
            action: "Sent"
        },
        {
            date: "2022-06-12 02:24",
            amount: 110.03,
            address: "0x6ef99c7e1bdd57e344c5a7d96f666157fd48c31d",
            action: "Received"
        },
        {
            date: "2022-06-13 02:24",
            amount: 110.03,
            address: "0x6ef99c7e1bdd57e344c5a7d96f666157fd48c31d",
            action: "Sent"
        },
        {
            date: "2022-06-14 02:24",
            amount: 110.03,
            address: "0x6ef99c7e1bdd57e344c5a7d96f666157fd48c31d",
            action: "Pending"
        },
    ]
    return (
        <>
            <div className="wallet-history">
                <h1>Wallet History</h1>
                <table>
                    <thead>
                        <tr>
                            <th className="coinName">Coin </th>
                            <th className="date">Date</th>
                            <th className="amount">Amount</th>
                            <th className="address"> Address</th>
                            <th className="action">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            walletHistory.map((item, index) =>
                                <tr key={index} >
                                    <td className="coinName"><img alt="" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${tokenId}.png`} />{tokenName}</td>
                                    <td className="date">{item.date}</td>
                                    <td className="amount">{item.amount}</td>
                                    <td className="address">{item.address}</td>
                                    <td className="action" style={{ color: item.action === "Sent" ? "rgb(22, 199, 132)" : item.action === "Received" ? "rgb(0, 255, 0)" : item.action === "Pending" ? "yellow" : "white" }}>{item.action}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default WalletHistory;