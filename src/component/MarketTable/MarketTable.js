import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css"
import CoinRow from "./CoinRow";

const MarketTable = ({ marketData, smallType }) => {
    return (
        <>
            <table className={`table market-table ${smallType ? `market-table-small` : `market-table-normal`}`}>
                <thead className="">
                    <tr>
                        <th className="index" style={{ display: smallType ? "none" : "" }}>#<img alt="" src="image/arrow-up-triangle.svg" /> </th>
                        <th className="name">Coin Name <img alt="" src="image/arrow-up-triangle.svg" /></th>
                        <th className="price">Coin Price <img alt="" src="image/arrow-up-triangle.svg" /></th>
                        <th className="percent">24% <img alt="" src="image/arrow-up-triangle.svg" /></th>
                        <th className="high-price" style={{ display: smallType ? "none" : "" }}>Market Cap<img alt="" src="image/arrow-up-triangle.svg" /></th>
                        <th className="low-price" style={{ display: smallType ? "none" : "" }}>Volume(24h)<img alt="" src="image/arrow-up-triangle.svg" /></th>
                        <th className="chart" style={{ display: smallType ? "none" : "" }}>Last 7 Days </th>
                    </tr>
                </thead>
                <tbody>
                    {!marketData ? <div></div> : marketData.map((item, index) => <CoinRow smallType={smallType} item={item} key={index} index={index} />)}
                </tbody>
            </table>
            <br />
            <div className="market-table-footer" style={{ display: smallType ? "none" : "" }} >
                <p>1-20 of 9,383 assets</p>
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link">First</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link">{'<'}</a>
                    </li>
                    <li>
                        <a className="page-link">
                            Page{' '}
                            <strong>
                                1
                            </strong>{' '}
                        </a>
                    </li>
                    <li className="page-item" >
                        <a className="page-link">{'>'}</a>
                    </li>
                    <li className="page-item" >
                        <a className="page-link">Last</a>
                    </li>
                </ul>
            </div>
        </>
    )
}
export default MarketTable;