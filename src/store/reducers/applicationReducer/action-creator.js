import { initWeb3 } from "utils/initWeb3";
import { applicationTypes } from "./types";

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

      const walletRPC = store().ApplicationReducer.walletRPC

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
      dispatch(ApplicationActionCreator.setWalletAddress(currentAddress))
    },
}
