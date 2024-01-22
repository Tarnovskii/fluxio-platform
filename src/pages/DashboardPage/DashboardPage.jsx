import Moment from 'moment'

import './dashboard-page.scss'
import copyIcon from 'assets/img/copy-icon.svg'
import roundedCheckIcon from 'assets/img/rounded-gree-check.svg'
import { useCallback, useMemo, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AccountActionCreator } from 'store/reducers/accountReducer/action-creator';
import { withAuth } from "../../hocs/withAuth";
import { useOutletContext } from "react-router-dom";

export const DashboardPage = withAuth(() => {
  const referralInputRef = useRef(null)
  const { walletAddress, userStats, userReferralsStats, depositRates } = useSelector(state => state.accountReducer)
  const dispatch = useDispatch()

  const { openDepositModal } = useOutletContext();

  const referralLink = useMemo(() => {
    return `${window.location.origin}/?ref=${walletAddress}`
  }, [])

  const copyRefToClipboard = useCallback(() => {
    if (referralInputRef?.current?.value) {
      navigator.clipboard.writeText(referralInputRef?.current?.value)
    }
  }, [referralInputRef])

  const handleWithdrawButton = () => {
    dispatch(AccountActionCreator.withdraw())
  }
  //dividends = (totalInvested.mul(userStats.userPercentRate).div(10000))
  //  .mul(block.timestamp.sub(uint256(user.checkpoint)))
  //  .div(86400);
  //

  const dailyYield = userStats.totalDeposits * userStats.percentRate / 100

  const referralPercents = [5, 7, 9, 11, 14, 16, 18, 20]

  return (
    <section className={'con-def db'}>
      <h1>Wallet statistics</h1>
      <div className={'db__main-info'}>
        <div className={'db__tile'}>
          <b className={'db__tile__header'}>Available BNB for withdrawal</b>
          <span className={'db__tile__number'}>{(userStats.availableWithdraw).toFixed(4)}</span>
          <p className={'db__tile__description'}>
            IMPORTANT Don't forget about the blockchain network fees! You must have approximately 0.01 BNB
            in your wallet to pay for transactions.
          </p>
          <button disabled={!userStats.availableWithdraw} onClick={handleWithdrawButton} className={'red-bttn mid-bttn'}>Withdraw</button>
        </div>

        <div className={'con-mob db__additional-info'}>
          <div className={'db__tile'}>
            <p className={'db__tile__small-header'}>Earned BNB</p>
            <span className={'db__tile__light-number'}>{(userStats.totalWithdrawn + userStats.availableWithdraw).toFixed(4)}</span>
          </div>

          <div className={'db__tile'}>
            <p className={'db__tile__small-header'}>Withdrawn BNB</p>
            <span className={'db__tile__light-number'}>{(userStats.totalWithdrawn).toFixed(4)}</span>
          </div>
        </div>

        <div className={'db__tile'}>
          <p className={'db__tile__lite-header'}>Daily yield</p>
          <span className={'db__tile__number'}>{(dailyYield).toFixed(4)}</span>
          <table>
            <tbody>
              <tr>
                <td><span>Base interest rate</span></td>
                <td>+{(depositRates.basePercent).toFixed(2)}%</td>
              </tr>
              <tr>
                <td><span>Hold bonus</span></td>
                <td>+{(depositRates.holdBonus).toFixed(2)}%</td>
              </tr>
              <tr>
                <td><span>Contract bonus</span></td>
                <td>+{(depositRates.contractBonus).toFixed(2)}%</td>
              </tr>
              <tr>
                <td><span>VIP bonus</span></td>
                <td>+{(depositRates.vipBonus).toFixed(2)}%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={'db__tile'}>
          <p className={'db__tile__lite-header'}>Invested BNB</p>
          <span className={'db__tile__number'}>{(userStats.totalDeposits).toFixed(4)}</span>
          <table>
            <tbody>
              <tr>
                <td><span>Total deposits</span></td>
                <td>{userStats.depositsAmount}</td>
              </tr>
              <tr>
                <td><span>Last deposit date</span></td>
                <td>{Moment(userStats.deposits[0]?.start * 1000).format('HH:mm • DD.MM.Y')}</td>
              </tr>
            </tbody>
          </table>
          <div className={'db__tile__buttons'}>
            <button onClick={openDepositModal} className={'red-bttn mid-bttn'}>Make new deposit</button>
          </div>
        </div>
      </div>
      <div className={'con-desk db__additional-info'}>
        <div className={'db__tile'}>
          <p className={'db__tile__small-header'}>Earned BNB</p>
          <span className={'db__tile__light-number'}>{(userStats.totalWithdrawn + userStats.availableWithdraw).toFixed(4)}</span>
        </div>

        <div className={'db__tile'}>
          <p className={'db__tile__small-header'}>Withdrawn BNB</p>
          <span className={'db__tile__light-number'}>{(userStats.totalWithdrawn).toFixed(4)}</span>
        </div>
      </div>

      <h2>Referral program</h2>

      <div className={'db__referral'}>
        <div className={'db__tile'}>
          <div className={'db__tile__input'}>
            <input ref={referralInputRef} disabled value={referralLink} />
            <button onClick={copyRefToClipboard}><img src={copyIcon} alt={'copyIcon'} /></button>
          </div>

          <ul>
            <li><img src={roundedCheckIcon} alt={'roundedCheckIcon'} />Your referral level depends on the turnover of your structure of 10 lines</li>
            <li><img src={roundedCheckIcon} alt={'roundedCheckIcon'} />Referral reward is paid based on the difference in levels. The higher your level, the more you earn.</li>
            <li><img src={roundedCheckIcon} alt={'roundedCheckIcon'} />Payments are instantly credited to your wallet</li>
          </ul>

        </div>

        <div className={'db__tile'}>
          <p className={'db__tile__lite-header'}>Referral bonuses (BNB)</p>
          <span className={'db__tile__number'}>{(userReferralsStats.referralBonusAmount).toFixed(4)}</span>
          <hr className={'con-full'} />
          <table>
            <tbody>
              <tr>
                <td><span>Referral level</span></td>
                <td>{referralPercents[userReferralsStats.referralLevel]}%</td>
              </tr>
              <tr>
                <td><span>Turnover from 10 lines</span></td>
                <td>{(userReferralsStats.referralTurnover).toFixed(2)} BNB</td>
              </tr>
              <tr>
                <td><span>Number of referrals</span></td>
                <td>{userReferralsStats.referralsNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
})

