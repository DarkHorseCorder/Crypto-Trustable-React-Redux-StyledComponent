import { postCreateWallet, getWalletAddress, getWalletData, postWalletTokenList } from "../../api/index";
import { setWallet, setWalletData } from "../actions/wallet";

export const attemptCreateWallet = (userName) => (dispatch) =>
    postCreateWallet(userName)
        .then((res) => {
            console.log(res, "create wallet res")
        })
        .catch((res) => {
            console.log(res, "create wallet res err")
        });
export const attemptGetWalletAddress = (userName) => (dispatch) => getWalletAddress(userName)
    .then((res) => {
        dispatch(setWallet(res.data));
        localStorage.setItem("wallet", JSON.stringify(res.data));
    })
    .catch((res) => {
        console.log("network error");
    })
export const attemptSendWalletTokenList = (data) => (dispatch) => postWalletTokenList(data)
    .then((res) => {
        // dispatch(setWalletData(res.data.tokenlist));
        return true;
    })
    .catch(() => {
        return false;
    });

export const attemptGetWalletData = (userName) => (dispatch) => getWalletData(userName)
    .then((res) => {
        console.log(res.data, "res wallet detail");
        dispatch(setWalletData(res.data));
        return true;
    })
    .catch(() => {
        return false;
    });