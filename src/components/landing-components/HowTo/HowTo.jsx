import './how-to.scss'
import {useMemo} from "react";

import roundedGreenCheck from 'assets/img/rounded-gree-check.svg'
import {useOutletContext} from "react-router-dom";

const turnovers = [{
    by: 20000,
    equal: 20
}, {
    by: 10000,
    equal: 18
}, {
    by: 3000,
    equal: 16
}, {
    by: 1000,
    equal: 14
}, {
    by: 500,
    equal: 11
}, {
    by: 120,
    equal: 9
}, {
    by: 30,
    equal: 7
}, {
    by: 0.01,
    equal: 5
},]

export const HowTo = () => {
    const {openDepositModal} = useOutletContext();

    const turnoverTableRows = useMemo(() => {
        return turnovers.map(({by, equal}) => {
            return (
                <tr>
                    <td>{by.toLocaleString()} BNB</td>
                    <td><span>{equal}%</span></td>
                </tr>
            )
        })
    }, [turnovers])

    return (
        <section className={'con-def ht'}>
            <div className={'ht__dep'}>
                <h2>How to work with Fluxio</h2>
                <p className={'ht__dep__sub-header'}>Follow a few easy steps to make profit</p>

                <div className={'ht__step-block'}>
                    <span className={'ht__step-block__number'}>Step 1</span>
                    <p className={'ht__step-block__header'}>Make a deposit</p>
                    <p className={'ht__step-block__description'}>
                        In order to start using all the functionality and opportunities of BNBPulse, you need to make a
                        deposit.
                    </p>

                    <div className={'ht__step-block__sub-block'}>
                        <p className={'ht__step-block__sub-block__header'}>Register BNB wallet</p>
                        <p className={'ht__step-block__sub-block__description'}>
                            We recommend using browser extension or Binance Chain Wallet. For mobile devices, use Trust
                            orthe wallet apps Metamask
                        </p>
                        <a className={'sqr-bttn'}>More information</a>
                    </div>

                    <div className={'ht__step-block__sub-block'}>
                        <p className={'ht__step-block__sub-block__header'}>Top up your wallet and make a deposit</p>
                        <p className={'ht__step-block__sub-block__description'}>
                            You can buy BNB cryptocurrency using the Binance exchange. Then make a deposit with any
                            amount of BNB to the smartcontract and start making profits. The minimum deposit amount is
                            0.01 BNB. There is no maximum limit.
                        </p>
                        <button onClick={openDepositModal} className={'sqr-bttn'}>Make a deposit</button>
                    </div>
                </div>
            </div>

            <div className={'ht__referral-n-withdraw'}>
                <div className={'ht__step-block'}>
                    <span className={'ht__step-block__number'}>STEP 2</span>
                    <p className={'ht__step-block__header'}>Invite friends and acquaintances</p>
                    <p className={'ht__step-block__description'}>
                        The referral program allows you to get additional income
                    </p>

                    <div className={'ht__step-block__sub-block'}>
                        <p className={'ht__step-block__sub-block__header'}>Unique referral program</p>
                        <p className={'ht__step-block__sub-block__description'}>
                            In BNBPulse, you receive referral rewards based on the level difference. The higher your
                            referral level, the higher your referral deductions.
                        </p>
                    </div>

                    <div className={'ht__step-block__sub-block'}>
                        <p className={'ht__step-block__sub-block__header'}>Reach the maximum level of the referral
                            program</p>

                        <table>
                            <thead>
                            <tr>
                                <th>Turnover from 5 lines</th>
                                <th>Referral level</th>
                            </tr>
                            </thead>
                            <tbody>
                            {turnoverTableRows}
                            </tbody>
                        </table>
                    </div>

                    <p className={'ht__step-block__footer'}>
                        Calculation example: You invited A, he invited B, and he invited C. Your referral level is 20%,
                        A - 9%, B - 5%, C - 5%. C makes a deposit of 100 BNB, then B will receive 5 BNB (5%), A will
                        receive 4 BNB (9% -5% = 4%), you will receive 11 BNB (20% -9% = 11%).
                    </p>
                </div>

                <div className={'ht__step-block'}>
                    <span className={'ht__step-block__number'}>Step 3</span>
                    <p className={'ht__step-block__header'}>Withdraw without restrictions</p>

                    <div className={'ht__step-block__sub-block'}>
                        <p className={'ht__step-block__sub-block__header'}>Order a payment</p>

                        <ul>
                            <li>
                                <img src={roundedGreenCheck} alt={'roundedGreenCheck'}/>
                                Funds will be instantly credited to your wallet
                            </li>
                            <li>
                                <img src={roundedGreenCheck} alt={'roundedGreenCheck'}/>
                                Your funds on all deposits will be paid out in one transaction
                            </li>
                            <li>
                                <img src={roundedGreenCheck} alt={'roundedGreenCheck'}/>
                                Order a withdawal from the same wallet that you made a deposit with
                            </li>
                        </ul>

                    </div>
                </div>
            </div>

        </section>
    )
}