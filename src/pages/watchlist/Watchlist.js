import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoPlus, GoSearch } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import MarketTable from "../../component/MarketTable/MarketTable";
import ExchangeCoin from "../../component/ExchangeCoin/ExchangeCoin";
import AddCoinModal from "../../component/AddCoinModal/AddCoinModal";
import { attemptSendTokenList } from "../../store/thunks/watchlist";
import { attemptGetTokenList } from "../../store/thunks/watchlist";
import "./style.css";
const Watchlist = () => {

    const { isAuth, user } = useSelector(state => state.user);
    const { tokenlist } = useSelector(state => state.watchlist);
    const [marketData, setMarketData] = useState();
    const [rightMarketData, setRightMarketData] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [selectedValue, setSelectedValue] = useState(undefined);
    const [trendingSelect, setTrendingSelect] = useState("getgainers");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onOpenModal = () => {
        setModalShow(true);
    }
    const onCloseModal = () => {
        setModalShow(false);
    }
    const getWatchlistData = () => {
        axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/cryptocurrency/watchlistCoin`, { tokenlist: tokenlist })
            .then((res) => {
                setMarketData(Object.values(res.data.data));
            })
            .catch((res) => {
                console.log(res, "res error");
            })
    }
    const getTrendingData = () => {
        axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/cryptocurrency/${trendingSelect}`)
            .then((res) => {
                setRightMarketData(res.data.data);
            })
            .catch((res) => {
                console.log(res, "res error");
            });
    }
    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
        if (isAuth)
            dispatch(attemptGetTokenList(user.name))
                .then((res) => {
                    console.log("success");
                })
        const interval = setInterval(() => {
            getTrendingData();
        }, 60000);
        return () => clearInterval(interval);
    }, [])
    useEffect(() => {
        if (!!tokenlist) {
            getWatchlistData();
            const interval = setInterval(() => {
                getWatchlistData();
            }, 60000);
            return () => clearInterval(interval);
        }
    }, [tokenlist]);
    useEffect(() => {
        if (!modalShow && selectedValue) {
            const sendTokenList = selectedValue.map(item => item.label);
            const sendData = { tokenlist: sendTokenList, userName: user.name };
            dispatch(attemptSendTokenList(sendData))
                .then(res => {
                    setSelectedValue(undefined);
                })
        }
    }, [modalShow]);
    useEffect(() => {
        getTrendingData();
    }, [trendingSelect]);
    return (
        <>
            <div className="watchlist">
                <div className="watchlist-left">
                    <div className="watchlist-left-header">
                        <div className="title">
                            <h1>Watchlist</h1>
                            <p>Update 16/02/2022 at 02:30 PM</p>
                        </div>
                        {/* <div className="add-coin-button-wrap">
                            <button onClick={onOpenModal}>
                                <GoPlus />
                                Add Coin
                            </button>
                        </div> */}
                    </div>
                    <div className="watchlist-left-filter">
                        {/* <div className="button-wrap">
                            <TableFilterCategory name="Watchlist" type="login" />
                            <button><GoPlus /></button>
                        </div> */}
                        <div className="add-coin-button-wrap">
                            <button onClick={onOpenModal}>
                                <GoPlus />
                                Add Coin
                            </button>
                        </div>
                        <div className="search-wrap">
                            <GoSearch />
                            <input type="text" placeholder="Search $ Trade" />
                        </div>
                    </div>
                    <MarketTable smallType={false} marketData={marketData} />
                </div>
                <div className="watchlist-right">
                    <div className="watchlist-right-up">
                        <ExchangeCoin />
                    </div>
                    <div className="watchlist-right-down">
                        <div className="watchlist-right-down-header">
                            <Link to="" onClick={() => setTrendingSelect("getgainers")}>Top Gainers</Link>
                            <Link to="" onClick={() => setTrendingSelect("getlosers")}>Top Loser</Link>
                            <Link to="" onClick={() => setTrendingSelect("getnewmarket")}>New in Market</Link>
                        </div>
                        <MarketTable smallType={true} marketData={rightMarketData} />
                    </div>
                </div>
            </div>
            <AddCoinModal selectedValue={selectedValue} setSelectedValue={setSelectedValue} modalShow={modalShow} onCloseModal={onCloseModal} />
        </>
    )
}
export default Watchlist
