import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri"
import SingleCoin from "../../component/singlecoin/SingleCoin";
import MarketTable from "../../component/MarketTable/MarketTable";
import SearchDropdown from "../../component/searchDropdown/SearchDropdown";
import { attemptGetTokenList } from "../../store/thunks/watchlist";

import "./style.css";
const Market = () => {

    const { isAuth, user } = useSelector((state) => state.user);
    const { tokenlist } = useSelector(state => state.watchlist);
    const [rightMarketData, setRightMarketData] = useState();
    const [marketData, setMarketData] = useState();
    const [watchlistData, setWatchlistData] = useState();
    const [topMarketData, setTopMarketData] = useState();
    const platformList = [
        { value: "1", label: "Ethereum Ecosystem" },
        { value: "2", label: "Asset-Backed Token" },
        { value: "3", label: "TRON Ecosystem" },
        { value: "4", label: "Polkadot" },
        { value: "5", label: "Binance Chain" },
        { value: "6", label: "BNB Smart Chain" },
        { value: "7", label: "Polkadot Ecosystem" },
        { value: "8", label: "HECO Ecosystem" },
        { value: "9", label: "Avalanche Ecosystem" },
        { value: "0", label: "Solana Ecosystem" },
        { value: "11", label: "Wrapped Tokens" },
        { value: "12", label: "Synthetics" },
        { value: "13", label: "ETH 2.0 Staking" },
        { value: "14", label: "Polygon Ecosystem" },
        { value: "15", label: "Fantom Ecosystem" },
        { value: "16", label: "Arbitrum Ecosystem" },
        { value: "17", label: "IoTeX  Ecosystem" },
        { value: "18", label: "Zilliqa  Ecosystem" },
        { value: "19", label: "Cronos  Ecosystem" },
        { value: "20", label: "Injective Ecosystem" },
        { value: "21", label: "BNB Chain" },
    ]
    const [categoryValue, setCategoryValue] = useState(undefined);
    const [algorithmValue, setAlgorithmValue] = useState(undefined);
    const [platformValue, setPlatformValue] = useState(undefined);
    const [industryValue, setIndustryValue] = useState(undefined);
    const [isOtherOpen, setIsOtherOpen] = useState(false);
    const [trendingSelect, setTrendingSelect] = useState("getgainers");

    const dispatch = useDispatch();
    const clearFilter = () => {
        setCategoryValue(undefined);
        setAlgorithmValue(undefined);
        setPlatformValue(undefined);
        setIndustryValue(undefined);
    }
    const getMainMarketData = () => {
        axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/cryptocurrency/getcoins`)
            .then((res) => {
                setMarketData(res.data);
            })
            .catch((res) => {
                console.log(res, "res error");
            });
    }
    const getMainCoin = () => {
        axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/cryptocurrency/getMainCoin`)
            .then((res) => {
                setTopMarketData(Object.values(res.data.data).sort(function (a, b) { return a.cmc_rank - b.cmc_rank }));
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
    const getWatchlistData = () => {
        axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/cryptocurrency/watchlistCoin`, { tokenlist: tokenlist })
            .then((res) => {
                setWatchlistData(Object.values(res.data.data));
            })
            .catch((res) => {
                console.log(res, "res error");
            })
    }
    useEffect(() => {
        getMainMarketData();
        if (!isAuth) {
            getMainCoin();
        };
        if (isAuth)
            dispatch(attemptGetTokenList(user.name))
                .then((res) => {
                    console.log("success");
                })
        const interval = setInterval(() => {
            getMainMarketData();
            if (isAuth)
                getTrendingData();
            if (!isAuth) {
                getMainCoin();
            };
        }, 60000);
        return () => clearInterval(interval);
    }, [])
    useEffect(() => {
        if (isAuth)
            getTrendingData();
    }, [trendingSelect]);
    useEffect(() => {
        if (!!tokenlist && isAuth) {
            getWatchlistData();
            const interval = setInterval(() => {
                getWatchlistData();
            }, 60000);
            return () => clearInterval(interval);
        }
    }, [tokenlist]);
    return (
        <>
            <div className="market">
                <div className="prices-by-marketcap" style={{ display: isAuth ? "none" : "block" }}>
                    <div className="row filter">
                        <div className="col-6 left">
                            <h1>Cryptocurrency Prices by Market Cap</h1>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown</p>
                        </div>
                        <div className="col-6 right">
                            <img alt="" src="image/filter.svg" />
                            <DropdownButton id="dropdown-item-button" title="Filter">
                                <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
                                <Dropdown.Item as="button">Action</Dropdown.Item>
                                <Dropdown.Item as="button">Another action</Dropdown.Item>
                                <Dropdown.Item as="button">Something else</Dropdown.Item>
                            </DropdownButton>
                            <img alt="" src="image/calendar.svg" />
                            <input type="date" placeholder="today" />
                        </div>
                    </div>
                    <div className="topcoin-wrap">
                        {!topMarketData ? <div>Loading...</div> : <>
                            {topMarketData.slice(0, 4).map((item, index) =>
                                <SingleCoin coinName={item.name} coinId={item.id} logogram={item.symbol} price={item.quote.USD.price.toFixed(2)} percent={item.quote.USD.percent_change_7d.toFixed(2)} />
                            )}</>
                        }
                    </div>
                </div>
                <div className="d-flex" style={{ width: "100%", justifyContent: "space-between" }}>
                    <div className="market-unlogin" style={{ width: isAuth ? "70%" : "100%" }}>
                        <div className="filter-bar row">
                            {
                                isAuth ? <div className="col-6 left">
                                    <h5>Market Coins</h5>
                                    <p>Lorem Ipsum is simply dummy text of the printing.</p>
                                </div> :
                                    <div className="col-6 left">
                                        <button>Top Gainers</button>
                                        <button>Top Loser</button>
                                        <button>New in market</button>
                                        <button>Top in trading</button>
                                        <button>Top in Volume</button>
                                    </div>
                            }

                            <div className="col-6 right">
                                <div className="search-input-wrap">
                                    <img alt="" className="search-left" src="image/search-left.svg" />
                                    <input placeholder="Search Coin Name" />
                                    <img alt="" className="search-right" src="image/search-right.svg" />
                                </div>
                            </div>
                        </div>
                        <div className="toolbar row">
                            {isAuth ? <div className="left-login col-6">
                                <SearchDropdown isOtherOpen={isOtherOpen} setIsOtherOpen={setIsOtherOpen} options={platformList} value={categoryValue} setValue={setCategoryValue} type="login" name="Category" />
                                <SearchDropdown isOtherOpen={isOtherOpen} setIsOtherOpen={setIsOtherOpen} options={platformList} value={algorithmValue} setValue={setAlgorithmValue} type="login" name="Algorithm" />
                                <SearchDropdown isOtherOpen={isOtherOpen} setIsOtherOpen={setIsOtherOpen} options={platformList} value={platformValue} setValue={setPlatformValue} type="login" name="Platform" />
                                <SearchDropdown isOtherOpen={isOtherOpen} setIsOtherOpen={setIsOtherOpen} options={platformList} value={industryValue} setValue={setIndustryValue} type="login" name="Industry" />
                            </div> :
                                <div className="left col-6">
                                    <SearchDropdown isOtherOpen={isOtherOpen} setIsOtherOpen={setIsOtherOpen} options={platformList} value={categoryValue} setValue={setCategoryValue} type="normal" name="Category" />
                                    <SearchDropdown isOtherOpen={isOtherOpen} setIsOtherOpen={setIsOtherOpen} options={platformList} value={algorithmValue} setValue={setAlgorithmValue} type="normal" name="Algorithm" />
                                    <SearchDropdown isOtherOpen={isOtherOpen} setIsOtherOpen={setIsOtherOpen} options={platformList} value={platformValue} setValue={setPlatformValue} type="normal" name="Platform" />
                                    <SearchDropdown isOtherOpen={isOtherOpen} setIsOtherOpen={setIsOtherOpen} options={platformList} value={industryValue} setValue={setIndustryValue} type="normal" name="Industry" />
                                </div>
                            }
                            <div className="right col-6">
                                <select >
                                    <option value="5">Show 5</option>
                                    <option value="10">Show 10</option>
                                    <option value="20">Show 20</option>
                                    <option value="30">Show 30</option>
                                    <option value="40">Show 40</option>
                                    <option value="50">Show 50</option>
                                </select>
                                <Link to=""><img className="icon-filter" alt="" src="image/icon-filter.svg" /></Link>
                                <Link to=""><img className="clear-filter" alt="" src="image/clear-filter.svg" /></Link>
                                <Link to=""><img className="customize" alt="" src="image/customize.svg" /> Customize</Link>
                                <Link onClick={clearFilter} to=""><img className="close" alt="" src="image/close.svg" /> Clear Filter</Link>
                            </div>
                        </div>
                        <MarketTable marketData={marketData} smallType={false} />
                    </div>
                    <div className="right-side" style={{ display: isAuth ? "" : "none" }}>
                        <div className="right-side-coin-market">
                            <div className="header">
                                <Link to="" onClick={() => setTrendingSelect("getgainers")}>Top Gainers</Link>
                                <Link to="" onClick={() => setTrendingSelect("getlosers")}>Top Loser</Link>
                                <Link to="" onClick={() => setTrendingSelect("getnewmarket")}>New in Market</Link>
                            </div>
                            <MarketTable smallType={true} marketData={rightMarketData} />
                        </div>
                        <div className="right-watchlist-market">
                            <div className="header">
                                <p>Watchlist</p>
                                <Link to=""><RiArrowRightSLine /></Link>
                            </div>
                            <MarketTable smallType={true} marketData={watchlistData} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Market;