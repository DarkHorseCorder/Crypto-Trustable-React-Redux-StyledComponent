import { SET_WALLET_ADDRESS, SET_WALLET_DATA } from "../actions/wallet";

const inititalState = {
    walletAddress: getInitialWalletData(),
    tokenlist: undefined,
    walletData: undefined,
}

function getInitialWalletData() {
    try {
        const walletData = JSON.parse(localStorage.getItem("wallet"));
        if (!!walletData) {
            return walletData;
        } else {
            return ""
        }
    }
    catch (err) {
        return ""
    }
}

export default function wallet(state = inititalState, action) {
    switch (action.type) {
        case SET_WALLET_ADDRESS:
            return {
                walletAddress: action.data
            };
        case SET_WALLET_DATA:
            return {
                walletData: action.walletData
            };
        default:
            return state;
    }
}