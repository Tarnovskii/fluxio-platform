import './make-deposit.scss'
import { useMemo } from "react";

import greenRoundedCheck from 'assets/img/rounded-gree-check.svg'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import { useDispatch, useSelector } from 'react-redux';
import getDepositFormSchema from './deposit-form-schema';
import { AccountActionCreator } from 'store/reducers/accountReducer/action-creator';
import {useWeb3Modal} from "@web3modal/react";


const rulesList = [
  "Your sponsor's wallet: No upline.",
  "IMPORTANT The minimum interest rate is 1.5% and increases depending on active bonuses.",
  "IMPORTANT The participant will receive a reward until he receives 200% of the profit from the deposit amount",
  "IMPORTANT Don't forget about the blockchain network fees! You must have approximately 0.001 BNB in your wallet to pay for transactions.",
  "Minimum deposit amount 0.01 BNB.There is no maximum limit.",
  "Your deposit will be activated after receiving 1 confirmation in the blockchain.",
  "Accruals are sent directly to your wallet, you can order a payment at any time."
]


export const MakeDeposit = ({closeModal}) => {
    const { walletAddress } = useSelector(state => state.accountReducer);
    const { open } = useWeb3Modal();
    const { bnbBalance, bnbInvestInput } = useSelector(state => state.accountReducer)
    const dispatch = useDispatch()

    const rulesListTiles = useMemo(() => {
        return rulesList.map(rule => {
            return <li><img src={greenRoundedCheck} alt={'greenRoundedCheck'}/>{rule}</li>
        })
    }, [rulesList])

    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(getDepositFormSchema(0.01, bnbBalance)),
      defaultValues: {
        depositValue: 0
      }
    })

  
    const onSubmit = (data) => {
      dispatch(AccountActionCreator.setBnbInvestInput(data.depositValue))
      dispatch(AccountActionCreator.invest())
    }

    const connectWalletHandler = () => {
       open();
    }

 
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'mdm'}>
      <h2>MAKE NEW DEPOSIT</h2>
      <button className={'mdm__close'} onClick={closeModal} type={'button'}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="30" height="30" rx="4" fill="black" fill-opacity="0.65"/>
              <path
                  d="M15.0002 13.586L19.9502 8.63599L21.3642 10.05L16.4142 15L21.3642 19.95L19.9502 21.364L15.0002 16.414L10.0502 21.364L8.63623 19.95L13.5862 15L8.63623 10.05L10.0502 8.63599L15.0002 13.586Z"
                  fill="#5F6574"/>
          </svg>
      </button>
      <fieldset>
          {!walletAddress &&
              <button onClick={connectWalletHandler} className='red-bttn big-bttn mdm__connect-wallet'>Connect
                  wallet</button>}
          {walletAddress && (
              <>
                  <legend>Enter the BNB deposit amounts <span>{bnbBalance.toFixed(4)} BNB</span></legend>
                  <input {...register('depositValue')} />
                  {errors.depositValue && <small>{errors.depositValue?.message}</small>}
                  <button className={classnames('red-bttn', 'big-bttn', {'disabled': errors.depositValue})}
                          type={'submit'}>Deposit
                  </button>
              </>
          )}

      </fieldset>
      <ul>
          {rulesListTiles}
      </ul>
    </form>
  )
}
