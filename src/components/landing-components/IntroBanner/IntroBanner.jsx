import './intro-banner.scss'

import { useOutletContext } from "react-router-dom";

import intoBannerImage from 'assets/img/intro-banner-image.svg'
import {Config} from "../../../config";

export const IntroBanner = () => {
    const {openDepositModal} = useOutletContext();

    return (
        <section className='con-def ib'>
            <div className='ib__text'>
                <h1>Safe investments up to 200% in BNB <span>on your deposit</span></h1>
                <p>Best offer on the market</p>
                <div className='ib__text__buttons con-desk'>
                    <button onClick={openDepositModal} className='red-bttn mid-bttn'>Make a deposit</button>
                    <a href={`${Config().BSC_SCAN_CONTRACT}/${Config().FARM_ADDRESS}`} target={'_blank'} className='trnp-bttn mid-bttn'>Verified contract</a>
                    <a href={'https://github.com/solidproof/projects/tree/main/2024/Fluxio'} target={'_blank'} className='trnp-bttn mid-bttn'>Audit results</a>
                </div>
            </div>
            <img className='ib__image' src={intoBannerImage} alt={'into-banner-image'}/>
            <div className='ib__text__buttons con-mob'>
                <button onClick={openDepositModal} className='red-bttn mid-bttn'>Make a deposit</button>
                <a href={`${Config().BSC_SCAN_CONTRACT}/${Config().FARM_ADDRESS}`} target={'_blank'} className='trnp-bttn mid-bttn'>Verified contract</a>
                <a href={'https://github.com/solidproof/projects/tree/main/2024/Fluxio'} target={'_blank'} className='trnp-bttn mid-bttn'>Audit results</a>
            </div>
        </section>
    )
}