import { getGasFee, postSendCrypto } from "../../api";

export const attemptSendCrypto = (data) => (dispatch) => postSendCrypto(data)
    .then((res) => {
        console.log(res, "sendCryptoreceive")
        return true;
    })
    .catch(() => {
        return false;
    });

export const attemptGetGasfee = () => (dispatch) => getGasFee()
    .then((res) => {
        console.log(res, "res gasfee");
        return true;
    })
    .catch(() => {
        return false;
    })