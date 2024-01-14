import { accountTypes } from "./types";

const initialState = {
  walletAddress: null,
  bnbBalance: 0,
  bnbInvestInput: 0,
  userReferralsStats: {
    checkpoint: 0,
    upliner: null,
    referralBonusAmount: 0,
    referrals: [],
    referralsNumber: 0,
    referralBackPercent: 0,
    referralLevel: 0,
    referralTurnover: 0,
  },
  userStats: {
    deposits: [],
    percentRate: 0,
    availableWithdraw: 0,
    totalWithdrawn: 0,
    totalDeposits: 0,
    depositsAmount: 0,
    depositRate: 0,
  },
  depositRates: {
    basePercent: 0,
    holdBonus: 0,
    contractBonus: 0,
    vipBonus: 0
  }
}

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case accountTypes().SET_USER_STATS:
      return { ...state, userStats: { ...state.userStats, ...action.payload } }
    case accountTypes().SET_USER_REFERRALS_STATS:
      return { ...state, userReferralsStats: { ...state.userReferralsStats, ...action.payload } }
    case accountTypes().RESET_USER_INFO:
      return {
        ...state,
        walletAddress: null,
        bnbBalance: 0,
        bnbInvestInput: 0,
        userReferralsStats: {
          checkpoint: 0,
          upliner: null,
          referralBonusAmount: 0,
          referrals: [],
          referralsNumber: [],
          referralBackPercent: 0,
          referralLevel: 0,
          referralTurnover: 0,
        },
        userStats: {
          deposits: [],
          percentRate: 0,
          availableWithdraw: 0,
          totalWithdrawn: 0,
          totalDeposits: 0,
          depositsAmount: 0,
          depositRate: 0,
        },
        depositRates: {
          basePercent: 0,
          holdBonus: 0,
          contractBonus: 0,
          vipBonus: 0
        }
      }
    case accountTypes().SET_WALLET_ADDRESS:
      return { ...state, walletAddress: action.payload }
    case accountTypes().SET_USER_DEPOSITS:
      return { ...state, userStats: { ...state.userStats, deposits: action.payload } }
    case accountTypes().SET_DEPOSIT_RATES:
      return { ...state, depositRates: action.payload }
    case accountTypes().SET_BNB_BALANCE:
      return { ...state, bnbBalance: action.payload }
    case accountTypes().SET_BNB_INVEST_INPUT:
      return { ...state, bnbInvestInput: action.payload }
    default:
      return state
  }
}

export default accountReducer
