import './footer.scss'
import {useOutletContext} from "react-router-dom";

export const Footer = () => {
    const {openDepositModal} = useOutletContext();

    return (
        <section className='footer con-full'>
            <div className='footer__main con-def'>
                <h3>Reliable smart contract on the Binance Smart Chain</h3>
                <div className='footer__main__buttons'>
                    <button onClick={openDepositModal} className='red-bttn long-bttn'>Make a deposit</button>
                    <button className='trnp-bttn long-bttn'>Verified contract</button>
                </div>
                <hr className='con-def'/>
                <div className='footer__main__links'>
                    <a>Сontract</a>
                    <a>Investments</a>
                    <a>How it works</a>
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