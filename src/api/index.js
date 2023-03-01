import axios from "axios";
//auth api
const postRegister = (user) => {
  return axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/users/register`, user);
};
const postLogin = (user) => {
  return axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/users/login`, user);
}
const postRecoveryPhrase = (data) => {
  return axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/users/recoveryphrase`, data);
}
const resetPassword = (user) =>
  axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/users/resetPassword`, user);
const resetUser = (user) =>
  axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/users/resetuser`, user);
const changePassword = (data) =>
  axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/users/changePassword`, data);
const uploadImage = (data) => {
  const formData = new FormData();
  formData.append('userName', data.userName);
  formData.append('photo', data.image);
  return axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/users/addImage`, formData);
}

const getUser = (token) => {
  axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
  return axios.get(`${process.env.REACT_APP_SERVER_HOST}:8000/api/user`);
};

//watchlist
const postTokenList = (data) => axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/watchlist/savetokenlist`, data);
const getTokenList = (userName) => axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/watchlist/gettokenlist/${userName}`);

//wallet
const postCreateWallet = (userName) => axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/wallet/createwallet`, { userName: userName });
const getWalletAddress = (userName) => axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/wallet/getwalletaddress/${userName}`);
const postWalletTokenList = (data) => axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/wallet/savetokenlist`, data);
const getWalletData = (userName) => axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/wallet/getwalletdata/${userName}`);

//sendCrypto
const postSendCrypto = (data) => axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/wallet/sendcrypto`, data);
const getGasFee = () => axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/wallet/getgasfee`);
export {
  postRegister,
  postLogin,
  postRecoveryPhrase,
  resetPassword,
  resetUser,
  changePassword,
  uploadImage,
  getUser,
  postTokenList,
  getTokenList,
  postCreateWallet,
  getWalletAddress,
  postWalletTokenList,
  getWalletData,
  postSendCrypto,
  getGasFee
};
