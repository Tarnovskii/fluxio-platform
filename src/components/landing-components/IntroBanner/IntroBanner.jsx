import './intro-banner.scss'

import intoBannerImage from 'assets/img/intro-banner-image.svg'

export const IntroBanner = () => {
    return (
        <section className='con-def ib'>
            <div className='ib__text'>
                <h1>Safe investments up to 200% in BNB <span>on your deposit</span></h1>
                <p>Best offer on the market</p>
                <div className='ib__text__buttons con-desk'>
                    <button className='red-bttn mid-bttn'>Make a deposit</button>
                    <button className='trnp-bttn mid-bttn'>Verified contract</button>
                    <button className='trnp-bttn mid-bttn'>Audit results</button>
                </div>
            </div>
            <img className='ib__image' src={intoBannerImage} alt={'into-banner-image'}/>
            <div className='ib__text__buttons con-mob'>
                <button className='red-bttn mid-bttn'>Make a deposit</button>
                <button className='trnp-bttn mid-bttn'>Verified contract</button>
                <button className='trnp-bttn mid-bttn'>Audit results</button>
            </div>
        </section>
    )
}