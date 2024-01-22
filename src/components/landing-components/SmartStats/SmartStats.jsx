import {useSelector} from 'react-redux'
import './smart-stats.scss'

import {ParallaxProvider, useParallax} from 'react-scroll-parallax'

export const SmartStats = () => {
    const {participants, totalBnbDeposit} = useSelector(state => state.applicationReducer)

    const parallax = useParallax({
        speed: 40,
    });

    return (
            <section className='con-full ss'>
                <div className='con-def ss__main'>
                    <div ref={parallax.ref} className={'ss__main__bg'}></div>
                    <h2>Secure smartcontract on Binance Smart Chain</h2>
                    <p className='ss__main__sub-header'>Participating in Fluxio you can feel absolutely safe</p>
                    <div className={'ss__main__tiles'}>
                        <div className={'ss__main__tiles__tile'}>
                            <span>{totalBnbDeposit}</span>
                            <small>Total BNB deposited</small>
                        </div>
                        <span className={'ss__main__tiles__separator'}></span>
                        <div className={'ss__main__tiles__tile'}>
                            <span>{participants}</span>
                            <small>Number of participants</small>
                        </div>
                    </div>
                    <a href={'https://github.com/solidproof/projects/tree/main/2024/Fluxio'} target={'_blank'} className='trnp-bttn mid-bttn'>Audit results</a>
                    <p className='ss__main__audit-status'>Audit Status: Successfully passed</p>
                </div>
            </section>
    )
}
