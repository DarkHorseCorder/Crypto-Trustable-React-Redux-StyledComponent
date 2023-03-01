import React, { useEffect, useState } from "react";
import "./style.css"
import SearchDropdown from "../searchDropdown/SearchDropdown";
const SelectCoin = ({ marketData, label, placeholder, initialId, coinValue, setCoinValue, coinAmount, setCoinAmount }) => {
    let selectList = [];
    useEffect(() => {
        marketData.map((item, index) => {
            selectList.push({ value: index + 1, label: item.name.logogram, image: item.id })
        })
    })
    return (
        <>
            <section className="coin-selection-wrap">
                <div className="input-wrap">
                    <p>{label}</p>
                    <input value={coinAmount} type="text" placeholder={placeholder} onChange={(e) => setCoinAmount(e.target.value)} />
                </div>
                <div className="select-wrap">
                    <SearchDropdown image={marketData[initialId].id} type="coin" name={marketData[initialId].name.logogram} options={selectList} value={coinValue} setValue={setCoinValue} />
                </div>
            </section>
        </>
    )
}
export default SelectCoin;