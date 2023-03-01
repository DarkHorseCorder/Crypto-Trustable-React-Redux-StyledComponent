import React from "react";
import { ArkenWidget } from 'arken-widget'
import cryptocurrencies from "cryptocurrencies"
import Icon from "react-crypto-icons";
import "./style.css";
import { toLower } from "lodash";
const Bonus = () => {
    return (
        <>
            <div className="Bonus">
                <h1>This Is Bonus Page</h1>
                {/* <ArkenWidget
                    chain='bsc'
                    mode="light"
                    themeColor="#e09819"
                    themeTextColor="#efce88"
                    baseTokenAddress="0xbb622ceba240980b3d6a200108e1753bc928adb3"
                    quoteTokenAddress="0xbb622ceba240980b3d6a200108e1753bc928adb3"
                    externalTopTokenAddress={[]}
                    customImageToken={{}}
                    graphRange={7}
                    widgetType="graph-swap"
                    containerStyle={{
                        width: "100%",
                        minHeight: 700
                        // put container style here
                    }}
                /> */}
                <button>create</button>
                <div>
                    <img src={`https://api.coinicons.net/icon/ETH/64x64`} alt="img" />
                    {/* <Icon name="btc" size={25} /> */}
                </div>
                <div>
                    {/* {Object.values(cryptocurrencies).map((item, index) =>
                        <div>{item}<p>{cryptocurrencies.symbols()[index]}</p></div>
                    )} */}
                </div>
            </div>
        </>
    )
}
export default Bonus;