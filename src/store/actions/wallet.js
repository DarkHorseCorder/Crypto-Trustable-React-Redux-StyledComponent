export const SET_WALLET_ADDRESS = "SET_WALLET_ADDRESS";
export const SET_WALLET_DATA = "SET_WALLET_DATA";

export const setWallet = (data) => {
    return {
        type: SET_WALLET_ADDRESS,
        data
    }
}
export function setWalletData(walletData) {
    return {
        type: SET_WALLET_DATA,
        walletData,
    };

}