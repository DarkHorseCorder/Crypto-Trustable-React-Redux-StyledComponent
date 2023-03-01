import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { attemptGetWalletData, attemptSendWalletTokenList } from "../../../store/thunks/wallet"
import AddCoinModal from "../../../component/AddCoinModal/AddCoinModal";
import "./style.css"
const Wallet = () => {
    const { walletAddress, walletData } = useSelector(state => state.wallet);
    const { isAuth, user } = useSelector(state => state.user);
    const walletBalance = [
        {
            coinName: "Bitcoin",
            available: 1,
            id: 1,
            usdValuatioin: 25754.70,
            coinLogogram: "BTC"
        },
        {
            coinName: "Ethereum",
            available: 1027,
            id: 1027,
            usdValuatioin: 1547740.35,
            coinLogogram: "ETH"
        },
        {
            coinName: "Binance",
            available: 1839,
            id: 1839,
            usdValuatioin: 441893.31,
            coinLogogram: "BNB"
        },
        {
            coinName: "Tether",
            available: 825,
            id: 825,
            usdValuatioin: 825,
            coinLogogram: "USDT"
        },
        {
            coinName: "XRP",
            available: 52,
            id: 52,
            usdValuatioin: 19.76,
            coinLogogram: "XRP"
        },
    ]
    const [selectedValue, setSelectedValue] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onOpenModal = () => {
        setModalShow(true);
    }
    const onCloseModal = () => {
        setModalShow(false);
    }
    const onClickToken = (token) => {
        navigate(`/profile/walletHistory/${token.coinName}/${token.id}`);
    }
    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
        setLoading(true);
        if (isAuth)
            dispatch(attemptGetWalletData(user.name))
                .then((res) => {
                    setLoading(false)
                })
    }, []);
    useEffect(() => {
        if (!modalShow && selectedValue) {
            const sendTokenList = selectedValue.map(item => item.label);
            const sendData = { tokenlist: sendTokenList, userName: user.name };
            setLoading(true)
            dispatch(attemptSendWalletTokenList(sendData))
                .then(res => {
                    dispatch(attemptGetWalletData(user.name))
                        .then((res) => {
                            setLoading(false);
                        })
                    setSelectedValue(undefined);
                })
        }
    }, [modalShow]);
    console.log(walletData, "walletData");
    return (
        <>
            <div className="wallet">
                <h1>
                    Wallet
                </h1>
                <div className="wallet-button-wrap">

                    <button onClick={onOpenModal}><GoPlus />Add Coin</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="coinName">
                                Coin
                            </th>
                            <th className="coin-available">
                                Available
                            </th>
                            <th className="usd-valuation">
                                USD Valuation
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <div className="loader-wrap"><div className="Loader"></div></div>
                        {/* {!walletData || loading ? <div className="loader-wrap"><div className="Loader"></div></div>
                            : <>
                                {
                                    walletData.map((item, index) => <tr key={index} onClick={() => onClickToken(item)}>
                                        <td className="coinName">
                                            <img alt="" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`} />
                                            {item.name}
                                        </td>
                                        <td className="coin-available">
                                            {(item.available).toFixed(5)} {item.symbol}
                                        </td>
                                        <td className="usd-valuation">
                                            {(item.price * item.available).toFixed(2)} USD
                                        </td>
                                    </tr>)
                                }
                            </>
                        } */}

                    </tbody>
                </table>
            </div>
            <AddCoinModal selectedValue={selectedValue} setSelectedValue={setSelectedValue} modalShow={modalShow} onCloseModal={onCloseModal} />
        </>
    )
}
export default Wallet;