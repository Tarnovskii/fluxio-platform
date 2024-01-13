import './header.scss'

import logoSVG from 'assets/img/logo.svg'
import classnames from "classnames";
import {useScrollPosition} from "../../../hooks/useScrollPosition";

export const Header = () => {
    const scrollDirection = useScrollPosition();

    return (
        <header className={classnames('con-full', 'header', {'solid': scrollDirection >= 50})}>
            <div className='con-desk con-def header__desktop-content'>
                <img className='header__desktop-content__logo' src={logoSVG} alt={'svg'}/>
                <nav className='header__desktop-content__nav'>
                    <a>Contract</a>
                    <a>Investments</a>
                    <a>How it works</a>
                    <button className='dark-bttn big-bttn'>Dashboard</button>
                </nav>
            </div>
        </header>
    )
}