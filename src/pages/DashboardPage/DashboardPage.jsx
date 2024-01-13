import Moment from 'moment'

import './dashboard-page.scss'
import copyIcon from 'assets/img/copy-icon.svg'
import roundedCheckIcon from 'assets/img/rounded-gree-check.svg'
import {useCallback, useMemo, useRef} from "react";

const dailyRates = {
    yield: 0,
    baseRate: 1.5,
    holdBonus: 0,
    contractBonus: 0,
    VIPBonus: 0.1
}

const investedStats = {
    totalInvested: 0,
    depositsAmount: 1,
    lastDepositDate: new Date()
}

const walletStats = {
    earned: 0,
    withdraw: 0
}

const referralInfo = {
    totalBonus: 0,
    level: 5,
    turnover: 0,
    numberOfReferrals: 0
}

export const DashboardPage = () => {
    const referralInputRef = useRef(null)

    const referralLink = useMemo(() => {
        return 'https://bnbpulse.com/?ref=0xf46e2ed532338293ac4e56c1a84a8cbf6b55d723'
    }, [])

    const copyRefToClipboard = useCallback(() => {
        if (referralInputRef?.current?.value) {
            navigator.clipboard.writeText(referralInputRef?.current?.value)
        }
    }, [referralInputRef])

    return (
        <section className={'con-def db'}>
            <h1>Wallet statistics</h1>
            <div className={'db__main-info'}>
                <div className={'db__tile'}>
                    <b className={'db__tile__header'}>Available BNB for withdrawal</b>
                    <span className={'db__tile__number'}>{(0).toFixed(4)}</span>
                    <p className={'db__tile__description'}>
                        IMPORTANT Don't forget about the blockchain network fees! You must have approximately 0.01 BNB
                        in your wallet to pay for transactions.
                    </p>
                    <button className={'red-bttn mid-bttn'}>Withdraw</button>
                </div>

                <div className={'db__tile'}>
                    <p className={'db__tile__lite-header'}>Daily yield</p>
                    <span className={'db__tile__number'}>{(dailyRates.yield).toFixed(4)}</span>
                    <table>
                        <tbody>
                        <tr>
                            <td><span>Base interest rate</span></td>
                            <td>+{(dailyRates.baseRate).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <td><span>Hold bonus</span></td>
                            <td>+{(dailyRates.holdBonus).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <td><span>Contract bonus</span></td>
                            <td>+{(dailyRates.contractBonus).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <td><span>VIP bbonus</span></td>
                            <td>+{(dailyRates.VIPBonus).toFixed(2)}%</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className={'db__tile'}>
                    <p className={'db__tile__lite-header'}>Daily yield</p>
                    <span className={'db__tile__number'}>{(investedStats.totalInvested).toFixed(4)}</span>
                    <table>
                        <tbody>
                        <tr>
                            <td><span>Total deposits</span></td>
                            <td>{investedStats.depositsAmount}</td>
                        </tr>
                        <tr>
                            <td><span>Last deposit date</span></td>
                            <td>{Moment(investedStats.lastDepositDate).format('HH:mm • D.M.Y')}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className={'db__tile__buttons'}>
                        <button className={'red-bttn mid-bttn'}>Make new deposit</button>
                        <button className={'trnp-bttn mid-bttn'}>Deposits history</button>
                    </div>
                </div>
            </div>
            <div className={'db__additional-info'}>
                <div className={'db__tile'}>
                    <p className={'db__tile__small-header'}>Earned BNB</p>
                    <span className={'db__tile__light-number'}>{(walletStats.earned).toFixed(4)}</span>
                </div>

                <div className={'db__tile'}>
                    <p className={'db__tile__small-header'}>Withdrawn BNB</p>
                    <span className={'db__tile__light-number'}>{(walletStats.withdraw).toFixed(4)}</span>
                </div>
            </div>

            <h2>Referral program</h2>

            <div className={'db__referral'}>
                <div className={'db__tile'}>
                    <div className={'db__tile__input'}>
                        <input ref={referralInputRef} disabled value={referralLink}/>
                        <button onClick={copyRefToClipboard}><img src={copyIcon} alt={'copyIcon'}/></button>
                    </div>

                    <ul>
                        <li><img src={roundedCheckIcon} alt={'roundedCheckIcon'}/>Your referral level depends on the turnover of your structure of 5 lines</li>
                        <li><img src={roundedCheckIcon} alt={'roundedCheckIcon'}/>Referral reward is paid based on the difference in levels. The higher your level, the more you earn.</li>
                        <li><img src={roundedCheckIcon} alt={'roundedCheckIcon'}/>Payments are instantly credited to your wallet</li>
                    </ul>

                </div>

                <div className={'db__tile'}>
                    <p className={'db__tile__lite-header'}>Referral bonuses (BNB)</p>
                    <span className={'db__tile__number'}>{(referralInfo.totalBonus).toFixed(4)}</span>
                    <hr className={'con-full'}/>
                    <table>
                        <tbody>
                        <tr>
                            <td><span>Referral level</span></td>
                            <td>{referralInfo.level}%</td>
                        </tr>
                        <tr>
                            <td><span>Turnover from 5 lines</span></td>
                            <td>{(referralInfo.turnover).toFixed(2)} BNB</td>
                        </tr>
                        <tr>
                            <td><span>Number of referrals</span></td>
                            <td>{referralInfo.numberOfReferrals}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}