import './footer.scss'
import {useOutletContext} from "react-router-dom";
import {Config} from "../../../config";

export const Footer = () => {
    const {openDepositModal} = useOutletContext();

    return (
        <section className='footer con-full'>
            <div className='footer__main con-def'>
                <h3>Reliable smart contract on the Binance Smart Chain</h3>
                <div className='footer__main__buttons'>
                    <button onClick={openDepositModal} className='red-bttn long-bttn'>Make a deposit</button>
                    <a href={`${Config().BSC_SCAN_CONTRACT}/${Config().FARM_ADDRESS}`} target={'_blank'} className='trnp-bttn long-bttn'>Verified contract</a>
                </div>
                <hr className='con-def'/>
                <div className='footer__main__links'>
                    <a href={`${Config().BSC_SCAN_CONTRACT}/${Config().FARM_ADDRESS}`} target={'_blank'}>Contract</a>
                    <a href={'#investments'}>Investments</a>
                    <a href={'#how-it-works'}>How it works</a>
                </div>
                <hr className='con-def'/>
                <div className={'footer__main__copyright'}>
                    <small>Copyright © {new Date().getFullYear()} All rights reserved.</small>
                    <a>Privacy policy</a>
                </div>
            </div>
        </section>
    )
}