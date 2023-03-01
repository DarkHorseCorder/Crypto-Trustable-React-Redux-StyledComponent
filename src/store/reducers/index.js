import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import userReducer from "./user";
import watchlistReducer from "./watchlist"
import walletReducer from "./wallet"

const buildRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    watchlist: watchlistReducer,
    wallet: walletReducer
  });

export default buildRootReducer;
