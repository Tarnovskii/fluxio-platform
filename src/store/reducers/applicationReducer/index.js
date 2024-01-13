import { applicationTypes } from "./types";

const initialState = {
  walletRPC: null,
  web3: null,
  notCorrectChain: false,
  defaultReferrer: null,
  totalBnbDeposit: 0,
  participants: 0,
  contractPercent: 0
}

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case applicationTypes().SET_WALLET_RPC:
      return { ...state, walletRPC: action.payload }
    case applicationTypes().SET_WEB3:
      return { ...state, web3: action.payload }
    case applicationTypes().SET_NOT_CORRECT_CHAIN:
      return { ...state, notCorrectChain: action.payload }
    case applicationTypes().SET_DEFAULT_REFERRER:
      return { ...state, defaultReferrer: action.payload }
    case applicationTypes().SET_TOTAL_BNB_DEPOSIT:
      return { ...state, totalBnbDeposit: action.payload }
    case applicationTypes().SET_PARTICIPANTS:
      return { ...state, participants: action.payload }
    default:
      return state
  }
}

export default applicationReducer
