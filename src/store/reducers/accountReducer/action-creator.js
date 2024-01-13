import { initWeb3 } from "utils/initWeb3";
import { accountTypes } from "./types";
import FarmContract from 'contracts/FarmContract.json'
import { Config } from "config";

export const AccountActionCreator = {
  setUserStats: (userStats) => ({
    type: accountTypes().SET_USER_STATS,
    payload: userStats
  }),
  setUserInfo: (userInfo) => ({
    type: accountTypes().SET_USER_INFO,
    payload: userInfo
  }),
  setWalletAddress: (walletAddress) => ({
    type: accountTypes().SET_WALLET_ADDRESS,
    payload: walletAddress
  }),
  setBnbBalance: (bnbBalance) => ({
    type: accountTypes().SET_BNB_BALANCE,
    payload: bnbBalance
  }),
  getBnbBalance:
    () => async (dispatch, store) => {

      const walletRPC = store().ApplicationReducer.walletRPC
      const walletAddress = store().ApplicationReducer.walletAddress
      const web3 = await initWeb3(walletRPC)

      let bnbBalance

      try {
        bnbBalance = await web3.eth.getBalance(walletAddress)
        bnbBalance = bnbBalance.toString()
        bnbBalance = +web3.utils.fromWei(bnbBalance, 'ether')
      } catch (error) {
        console.log(error)
        return
      }

      dispatch(AccountActionCreator.setBnbBalance(bnbBalance))
    },
  getUserInfo:
    () => async (dispatch, store) => {
      const walletRPC = store.AplicationReducer.walletRPC
      const walletAddress = '0xA93c06f552869993cD6b77cDDE3A148fC54C2F3e'
      //store().AccountReducer.walletAddress
      const web3 = await initWeb3(walletRPC)

      const farmContract = new web3.eth.Contract(FarmContract, Config().FARMING_CONTRACT)

      let userInfo

      try {
        userInfo = await farmContract.methods.getUserReferralsStats(walletAddress).call()
      } catch (error) {
        console.log(error)
      }

      console.log(userInfo)
    }
}
