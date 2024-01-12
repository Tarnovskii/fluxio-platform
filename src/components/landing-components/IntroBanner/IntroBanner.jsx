import './intro-banner.scss'

export const IntroBanner = () => {
    return (
        <section className='con-def ib'>
            <div className='ib__text'>
                <h1>Safe investments<br/>up to 200% in BNB<br/><span>on your deposit</span></h1>
                <p>Best offer on the market</p>
                <div className='ib__text__buttons'>
                    <button className='red-bttn mid-bttn'>Make a deposit</button>
                    <button className='trnp-bttn mid-bttn'>Verified contract</button>
                    <button className='trnp-bttn mid-bttn'>Audit results</button>
                </div>
            </div>
        </section>
    )
}