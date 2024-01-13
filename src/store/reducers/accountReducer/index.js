import { accountTypes } from "./types";

const initialState = {
  walletAddress: null,
  bnbBalance: 0,
  userInfo: {
    deposits: [],
    checkpoint: 0,
    upliner: null,
    referrals: [],
    referralBonusAmount: 0,
    referrals: [],
    referralsNumber: [],
    referralBackPercent: 0,
    referralLevel: 0,
    referralTurnover: 0,
  },
  userStats: {
    percentRate: 0,
    availableWithdraw: 0,
    totalWithdrawn: 0,
    totalDeposits: 0,
    depositsAmount: 0,
    depositRate: 0,
  }
}

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case accountTypes().SET_USER_STATS:
      return { ...state, userStats: { ...state.userStats, ...action.paylaod } }
    case accountTypes().SET_USER_INFO:
      return { ...state, userInfo: { ...state.userInfo, ...action.paylaod } }
    default:
      return state
  }
}

export default accountReducer
