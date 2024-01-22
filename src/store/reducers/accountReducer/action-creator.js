import { initWeb3 } from "utils/initWeb3";
import { accountTypes } from "./types";
import FarmContract from 'contracts/FarmContract.json'
import { Config } from "config";
import { ApplicationActionCreator } from "../applicationReducer/action-creator";
import { Bounce, toast } from "react-toastify";

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
  setDepositRates: (depositRates) => ({
    type: accountTypes().SET_DEPOSIT_RATES,
    payload: depositRates
  }),
  getBnbBalance:
    () => async (dispatch, store) => {

      const walletRPC = store().applicationReducer.walletRPC
      const walletAddress = store().accountReducer.walletAddress
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
        referralsNumber: userInfo[5].reduce((curr, acc) => {
          const referralsByLevel = parseInt(curr.toString())
          acc = parseInt(acc.toString())
          return acc += referralsByLevel
        }, 0),
        referralBackPercent: +web3.utils.fromWei(+userInfo[1].toString(), 'ether'),
        referralLevel: parseInt(userInfo[6].toString()),
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
        depositsAmount: userInfo[3].toString(),
        totalWithdrawn: +web3.utils.fromWei(userInfo[4].toString(), 'ether'),
        depositRate: +web3.utils.fromWei(userInfo[5].toString(), 'ether'),
      }

      dispatch(AccountActionCreator.setUserStats(info))
    },
  getUserDeposits:
    () => async (dispatch, store) => {
      const walletRPC = store().applicationReducer.walletRPC
      const walletAddress = store().accountReducer.walletAddress
      const depositsAmount = store().accountReducer.userStats.depositsAmount

      const web3 = await initWeb3(walletRPC)

      const farmContract = new web3.eth.Contract(FarmContract, Config().FARM_ADDRESS)

      let userDeposits

      try {
        userDeposits = await farmContract.methods.getUserDeposits(walletAddress, 0, depositsAmount).call()
      } catch (error) {
        console.log(error)
        return
      }

      const newUserDeposits = userDeposits[0].map((amount, index) => {
        const deposit = {
          amount: +web3.utils.fromWei(amount.toString(), 'ether'),
          withdrawn: +web3.utils.fromWei(userDeposits[1][index].toString(), 'ether'),
          refBack: +web3.utils.fromWei(userDeposits[2][index].toString(), 'ether'),
          start: parseInt(userDeposits[3][index].toString()),
        }

        return deposit
      })

      dispatch(AccountActionCreator.setUserDeposits(newUserDeposits))

    },
  getDepositRates:
    () => async (dispatch, store) => {
      const walletRPC = store().applicationReducer.walletRPC
      const walletAddress = store().accountReducer.walletAddress

      const web3 = await initWeb3(walletRPC)

      const farmContract = new web3.eth.Contract(FarmContract, Config().FARM_ADDRESS)

      let depositRates

      try {
        depositRates = await farmContract.methods.getDepositsRates(walletAddress).call()
      } catch (error) {
        console.log(error)
        return
      }

      console.log(depositRates)
      const info = {
        basePercent: depositRates[0].toString() / 100,
        holdBonus: depositRates[1].toString() / 100,
        contractBonus: depositRates[2].toString() / 100,
        vipBonus: depositRates[3].toString() / 100
      }

      console.log(info)

      dispatch(AccountActionCreator.setDepositRates(info))

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

      const investData = farmContract.methods.invest(upliner, amountToSend, walletAddress, false).encodeABI()

      const gasLimit = await farmContract.methods.invest(upliner, amountToSend, walletAddress, false).estimateGas({ value: amountToSend, from: walletAddress })

      console.log(upliner, walletAddress, amountToSend)

      const signTxToast = toast.loading('Please sign a transaction', {
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      let investTx
      let processTxToast
      try {

        investTx = await web3.eth.sendTransaction({
          from: walletAddress,
          to: Config().FARM_ADDRESS,
          data: investData,
          value: amountToSend,
          gas: gasLimit * 2
        })

        processTxToast = toast.loading('Processing transaction...', {
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        toast.dismiss(signTxToast)

      } catch (error) {
        toast.dismiss(signTxToast)
        toast.dismiss(processTxToast)
        const errorTxToast = toast.error(error.message, {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        dispatch(AccountActionCreator.setBnbInvestInput(0))

        console.log(error)
        return
      }

      const SuccessText = () => {
        return (
          <>
            <p>You are successfuly invested {bnbInvestInput} BNB</p>
            <a className={'oblique'} target='_blank' href={`${Config().BSC_SCAN_URL}${investTx.transactionHash}`}>{investTx.transactionHash}</a >
          </>
        )
      }


      toast.dismiss(processTxToast)

      const successTxToast = toast.success(<SuccessText />, {
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      dispatch(AccountActionCreator.setBnbInvestInput(0))

      dispatch(ApplicationActionCreator.setIsNeedUpdate(true))
    },
  withdraw:
    () => async (dispatch, store) => {
      console.log('xyu')
      const walletRPC = store().applicationReducer.walletRPC
      const web3 = await initWeb3(walletRPC)
      const walletAddress = store().accountReducer.walletAddress

      const farmContract = new web3.eth.Contract(FarmContract, Config().FARM_ADDRESS)

      const withdrawData = farmContract.methods.withdraw().encodeABI()

      const gasLimit = await farmContract.methods.withdraw().estimateGas({ from: walletAddress })

      let withdrawTx

      const signTxToast = toast.loading('Please sign a transaction', {
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      let processTxToast
      try {
        withdrawTx = await web3.eth.sendTransaction({
          from: walletAddress,
          data: withdrawData,
          to: Config().FARM_ADDRESS,
          gas: gasLimit
        })

        processTxToast = toast.loading('Processing transaction...', {
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } catch (error) {
        toast.dismiss(signTxToast)
        toast.dismiss(processTxToast)
        const errorTxToast = toast.error(error.message, {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        console.log(error)
        return
      }

      const SuccessText = () => {
        return (
          <>
            <p>You are successfuly withdrawn BNB</p>
            <a className={'oblique'} target='_blank' href={`${Config().BSC_SCAN_URL}${withdrawTx.transactionHash}`}>{withdrawTx.transactionHash}</a >
          </>
        )
      }


      toast.dismiss(processTxToast)

      const successTxToast = toast.success(<SuccessText />, {
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      dispatch(ApplicationActionCreator.setIsNeedUpdate(true))
    }
}
