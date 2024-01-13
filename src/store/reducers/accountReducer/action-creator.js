import { initWeb3 } from "utils/initWeb3";
import { accountTypes } from "./types";
import FarmContract from 'contracts/FarmContract.json'
import { Config } from "config";

export const AccountActionCreator = {
  setUserStats: (userStats) => ({
    type: accountTypes().SET_USER_STATS,
    payload: userStats
  }),
  setUserReferralsStats: (userInfo) => ({
    type: accountTypes().SET_USER_REFERRALS_STATS,
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
  setBnbInvestInput: (bnbInvestInput) => ({
    type: accountTypes().SET_BNB_INVEST_INPUT,
    payload: bnbInvestInput
  }),
  setUserDeposits: (userDeposits) => ({
    type: accountTypes().SET_USER_DEPOSITS,
    payload: userDeposits
  }),
  resetUserInfo: () => ({
    type: accountTypes().RESET_USER_INFO
  }),
  getBnbBalance:
    () => async (dispatch, store) => {

      const walletRPC = store().applicationReducer.walletRPC
      const walletAddress = store().applicationReducer.walletAddress
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
  getUserReferralsStats:
    () => async (dispatch, store) => {
      const walletRPC = store().applicationReducer.walletRPC
      const walletAddress = store().accountReducer.walletAddress

      const web3 = await initWeb3(walletRPC)

      const farmContract = new web3.eth.Contract(FarmContract, Config().FARM_ADDRESS)

      let userInfo

      try {
        userInfo = await farmContract.methods.getUserReferralsStats(walletAddress).call()
      } catch (error) {
        console.log(error)
      }

      const info = {
        upliner: userInfo[0],
        referralBonusAmount: +web3.utils.fromWei(+userInfo[3].toString(), 'ether'),
        referrals: userInfo[4].map(el => +el.toString()),
        referralsNumber: userInfo[5].map(el => +el.toString()),
        referralBackPercent: +web3.utils.fromWei(+userInfo[1].toString(), 'ether'),
        referralLevel: +userInfo[6].toString(),
        referralTurnover: +web3.utils.fromWei(userInfo[7], 'ether'),
      }

      dispatch(AccountActionCreator.setUserReferralsStats(info))
    },
  getUserStats:
    () => async (dispatch, store) => {
      const walletRPC = store().applicationReducer.walletRPC
      const walletAddress = store().accountReducer.walletAddress

      const web3 = await initWeb3(walletRPC)

      const farmContract = new web3.eth.Contract(FarmContract, Config().FARM_ADDRESS)

      let userInfo

      try {
        userInfo = await farmContract.methods.getUserStats(walletAddress).call()
      } catch (error) {
        console.log(error)
      }

      const info = {
        percentRate: userInfo[0].toString() / 100,
        availableWithdraw: +web3.utils.fromWei(userInfo[1].toString(), 'ether'),
        totalDeposits: +web3.utils.fromWei(userInfo[2].toString(), 'ether'),
        depositsAmount: +web3.utils.fromWei(userInfo[3].toString(), 'ether'),
        totalWithdrawn: +web3.utils.fromWei(userInfo[4].toString(), 'ether'),
        depositRate: +web3.utils.fromWei(userInfo[5].toString(), 'ether'),
      }

      dispatch(AccountActionCreator.setUserStats(info))
    },
  getUserDeposits:
    () => async (dispatch, store) => {
      const walletRPC = store().applicationReducer.walletRPC
      const walletAddress = store().accountReducer.walletAddress

      const web3 = await initWeb3(walletRPC)

      const farmContract = new web3.eth.Contract(FarmContract, Config().FARM_ADDRESS)

      let userDeposits

      try {
        userDeposits = await farmContract.methods.getUserDeposits(walletAddress, 0, 10).call()
      } catch (error) {
        console.log(error)
        return
      }

      const newUserDeposits = userDeposits.amount.map((amount, index) => {
        const deposit = {
          amount: +web3.utils.fromWei(amount.toString(), 'ether'),
          withdrawn: +web3.utils.fromWei(userDeposits.withdrawn[index].toString(), 'ether'),
          refBack: +web3.utils.fromWei(userDeposits.refBack[index].toString(), 'ether'),
          start: userDeposits.start[index].toString(),
        }

        return deposit
      })

      dispatch(AccountActionCreator.setUserDeposits(newUserDeposits))

    },
  invest:
    () => async (dispatch, store) => {
      const walletRPC = store().applicationReducer.walletRPC
      const web3 = await initWeb3(walletRPC)
      const walletAddress = store().accountReducer.walletAddress
      const bnbInvestInput = store().accountReducer.bnbInvestInput

      const farmContract = new web3.eth.Contract(FarmContract, Config().FARM_ADDRESS)

      const upliner = localStorage.getItem('refAddress') || walletAddress

      console.log(localStorage.getItem('refAddress'), upliner)
      const amountToSend = web3.utils.toWei(bnbInvestInput, 'ether')

      console.log(amountToSend)

      const investData = farmContract.methods.invest(upliner).encodeABI()


      let investTx


      try {
        investTx = await web3.eth.sendTransaction({
          from: walletAddress,
          to: Config().FARM_ADDRESS,
          data: investData,
          value: amountToSend,
        })
      } catch (error) {
        console.log(error)
        return
      }
    },
  withdraw:
    () => async (dispatch, store) => {

      const walletRPC = store().applicationReducer.walletRPC
      const web3 = await initWeb3(walletRPC)
      const walletAddress = store().accountReducer.walletAddress

      const farmContract = new web3.eth.Contract(FarmContract, Config().FARM_ADDRESS)

      const withdrawData = farmContract.methods.withdraw().encodeABI()

      const gasLimit = farmContract.methods.withdraw().estimateGas({ from: walletAddress })

      let withdrawTx

      try {
        withdrawTx = await web3.eth.sendTransaction({
          from: walletAddress,
          data: withdrawData,
          to: Config().FARM_ADDRESS,
          gas: gasLimit
        })
      } catch (error) {
        console.log(error)
        return
      }
    }
}
