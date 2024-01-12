import './header.scss'

import logoSVG from 'assets/img/logo.svg'
import {useScrollDirection} from "../../../hooks/useScrollDirection";
import classnames from "classnames";

export const Header = () => {
    const scrollDirection = useScrollDirection();

    return (
        <header className={classnames('con-def', 'header', {'hidden': scrollDirection === 'down'})}>
            <img className='header__logo' src={logoSVG} alt={'svg'}/>
            <nav className='header__nav-desktop con-desk'>
                <a>Contract</a>
                <a>Investments</a>
                <a>How it works</a>
                <button className='dark-bttn big-bttn'>Dashboard</button>
            </nav>
        </header>
    )
}