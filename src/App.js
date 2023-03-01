import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useDispatch, useSelector, Provider } from "react-redux";
// import store from './store';
import Home from './pages/home/home';
import Layout from './layout/layout';
import Market from './pages/market/Market';
import Login from './pages/Auth/Login/Login';
import ConfirmRecoveryPhrase from "./pages/Auth/ConfirmRecoveryPhrase/ConfirmRecoveryPhrase"
import Register from './pages/Auth/Register/Register';
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword';
import RecoveryPhrase from './pages/Auth/RecoveryPhrase/RecoveryPhrase';
import configureStore from "./store/configureStore";
import { createBrowserHistory } from "history";
import CoinDetail from "./pages/CoinDetail/CoinDetail"
import Watchlist from "./pages/watchlist/Watchlist"
import ProfileLayout from './layout/ProfileLayout';
import Profile from './pages/Profile/Profile';
import Sequrity from './pages/Profile/Sequrity/Security';
import Wallet from './pages/Profile/Wallet/Wallet';
import WalletHistory from './pages/Profile/WalletHistory/WalletHistory';
import Learn from './pages/Learn/Learn';
import Bonus from './pages/Bonus/Bonus';

const history = createBrowserHistory();
const store = configureStore(history);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route exact path='login' element={<Login />} />
            <Route exact path="confirm-recovery-phrase" element={<ConfirmRecoveryPhrase />} />
            <Route exact path='register' element={<Register />} />
            <Route exact path='ResetPassword' element={<ResetPassword />} />
            <Route exact path="RecoveryPhrase" element={<RecoveryPhrase />} />
            <Route path='/' element={<Layout />}>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/market" element={<Market />} />
              <Route exact path="detail/:tokenSymbol" element={<CoinDetail />} />
              <Route exact path="/watchlist" element={<Watchlist />} />
              <Route exact path="/learn" element={<Learn />} />
              <Route exact path="/bonus" element={<Bonus />} />
              <Route path="/profile" element={<ProfileLayout />}>
                <Route exact path='/profile' element={<Profile />} />
                <Route exact path='sequrity' element={<Sequrity />} />
                <Route exact path='wallet' element={<Wallet />} />
                <Route exact path="walletHistory/:tokenName/:tokenId" element={<WalletHistory />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

