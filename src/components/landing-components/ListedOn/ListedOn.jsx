import './listed-on.scss'

import dappRadarLogo from 'assets/img/dapp-radar-logo.svg'
import dappLogo from 'assets/img/dapp-logo.svg'
import reviewDappLogo from 'assets/img/review-dapp-logo.svg'
import dappStatsLogo from 'assets/img/dapp-stats-logo.svg'

export const ListedOn = () => {
    return (
        <section className='con-def lo'>
            <p>We are listed on:</p>
            <div className='lo__listed-logos'>
                <img src={dappRadarLogo} alt={'dapp-radar-logo'}/>
                <img src={dappLogo} alt={'dapp-logo'}/>
                <img src={reviewDappLogo} alt={'review-dapp-logo'}/>
                <img src={dappStatsLogo} alt={'dapp-stats-logo'}/>
            </div>
        </section>
    )
}