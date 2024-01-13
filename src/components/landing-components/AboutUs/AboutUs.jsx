import './about-us.scss'

import greenCheck from 'assets/img/green-check.svg'
import greenGlobe from 'assets/img/green-globe.svg'
import greenShield from 'assets/img/green-shield.svg'
import greenLock from 'assets/img/green-lock.svg'

export const AboutUs = () => {
    return (
        <section className='con-def au'>
            <div className='au__text'>
                <h2>Fluxio - a<br/>Breakthrough of<br/><span>the Year 2023</span></h2>
                <p>The project combines the security of smartcontracts and the best options for earning,
                    including income from investments, staking and a unique referral program.</p>
                <button className='red-bttn mid-bttn'>Make a deposit</button>
            </div>
            <div className='au__tiles'>
                <div className={'au__tiles__tile'}>
                    <img src={greenCheck} alt={'green-check'}/>
                    <span>Safety and reliability</span>
                    <p>Blockchain technology ensures complete security of funds. No one can steal them, or change the
                        functions of the contract.</p>
                </div>
                <div className={'au__tiles__tile'}>
                    <img src={greenGlobe} alt={'green-globe'}/>
                    <span>Yield Farming</span>
                    <p>Get from 3% daily and receive up to 200% in BNB on your deposit. Hold and VIP bonuses increase
                        your profoitability.</p>
                </div>
                <div className={'au__tiles__tile'}>
                    <img src={greenShield} alt={'green-shield'}/>
                    <span>Marketing</span>
                    <p>We prepared a vast marketing campaign that includes DappRadar, Coinzilla and many other crypto
                        related websites.</p>
                </div>
                <div className={'au__tiles__tile'}>
                    <img src={greenLock} alt={'green-lock'}/>
                    <span>Verified contract</span>
                    <p>The contract has been audited by the GenesisLab team and is
                        completely secure and reliable.</p>
                </div>

            </div>
        </section>
    )
}