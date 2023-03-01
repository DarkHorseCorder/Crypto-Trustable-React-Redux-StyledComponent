import { SET_WATCHLIST_TOKENLIST } from "../actions/watchlist";
const initialState = {
    tokenlist: undefined
}
export default function watchlist(state = initialState, action) {
    switch (action.type) {
        case SET_WATCHLIST_TOKENLIST:
            return {
                tokenlist: action.tokenlist
            }
        default:
            return state;
    }
}