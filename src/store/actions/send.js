export const SET_WATCHLIST_TOKENLIST = "SET_WATCHLIST_TOKENLIST";
export function setWatchlistTokenlist(tokenlist) {
    return {
        type: SET_WATCHLIST_TOKENLIST,
        tokenlist,
    };
}