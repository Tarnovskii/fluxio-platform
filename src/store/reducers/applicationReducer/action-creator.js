import { initWeb3 } from "utils/initWeb3";
import { applicationTypes } from "./types";
import { AccountActionCreator } from "../accountReducer/action-creator";
import Web3 from "web3";
import { Config } from "config";
import FarmContract from 'contracts/FarmContract.json'

export const ApplicationActionCreator = {
  setWalletRpc: (walletRPC) => ({
    type: applicationTypes().SET_WALLET_RPC,
    payload: walletRPC
  }),
  setWeb3: (web3) => ({
    type: applicationTypes().SET_WEB3,
    payload: web3
  }),
  setNotCorrectChain: (notCorrectChain) => ({
    type: applicationTypes().SET_NOT_CORRECT_CHAIN,
    payload: notCorrectChain
  }),
  setDefaultReferrer: (defaultReferrer) => ({
    type: applicationTypes().SET_DEFAULT_REFERRER,
    payload: defaultReferrer
  }),
  setTotalBnbDeposit: (totalBnbDeposit) => ({
    type: applicationTypes().SET_TOTAL_BNB_DEPOSIT,
    payload: totalBnbDeposit
  }),
  setParticipants: (participants) => ({
    type: applicationTypes().SET_PARTICIPANTS,
    payload: participants
  }),
  setContractBonus: (contractPercent) => ({
    type: applicationTypes().SET_CONTRACT_PERCENT,
    payload: contractPercent
  }),
  connectWallet:
    () => async (dispatch, store) => {

      const walletRPC = store().applicationReducer.walletRPC

      // Create a new Web3 instance using the MetaMask provider
      const web3 = await initWeb3(walletRPC)

      async function getConnectedChainId() {
        try {
          // Request the current chain ID from MetaMask
          const chainId = await web3.eth.getChainId();

          const newChainId = Number(chainId)

          return newChainId;
        } catch (error) {
          console.error('Error retrieving chain ID:', error);
          return null;
        }
      }

      const chainId = await getConnectedChainId()
      const currentAddress = walletRPC.account.address
      console.log('Wallet connected:', currentAddress)
      dispatch(AccountActionCreator.setWalletAddress(currentAddress))
    },
  getSiteStats:
    () => async (dispatch, store) => {
      const web3 = new Web3(Config().WEB3_BSC_URL);

      const farmContract = new web3.eth.Contract(FarmContract, Config().FARM_ADDRESS)

      let siteData

      try {
        siteData = await farmContract.methods.getSiteStats().call()
      } catch (error) {
        console.log(error)
        return
      }

      const totalBnbDeposit = +web3.utils.fromWei(siteData[0].toString(), 'ether')
      const participants = +siteData[1].toString()
      const contractPercent = siteData[3].toString() / 100

      console.log(totalBnbDeposit, participants, contractPercent)

      dispatch(ApplicationActionCreator.setTotalBnbDeposit(totalBnbDeposit))
      dispatch(ApplicationActionCreator.setParticipants(participants))
      dispatch(ApplicationActionCreator.setContractBonus(contractPercent))

    }
}
