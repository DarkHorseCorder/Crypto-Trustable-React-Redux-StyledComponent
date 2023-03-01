import { postTokenList, getTokenList } from "../../api";
import { setWatchlistTokenlist } from "../actions/watchlist";

export const attemptSendTokenList = (data) => (dispatch) => postTokenList(data)
    .then((res) => {
        dispatch(setWatchlistTokenlist(res.data.tokenlist));
        return true;
    })
    .catch(() => {
        return false;
    });

export const attemptGetTokenList = (userName) => (dispatch) => getTokenList(userName)
    .then((res) => {
        dispatch(setWatchlistTokenlist(res.data.tokenList));
        return true;
    })
    .catch(() => {
        return false;
    });