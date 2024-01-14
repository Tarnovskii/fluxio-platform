import './header.scss'

import logoSVG from 'assets/img/logo.svg'
import burgerMenuIcon from 'assets/img/burger-menu-icon.svg'
import closeBurgerMenuIcon from 'assets/img/close-burger-icon.svg'
import classnames from "classnames";
import { useScrollPosition } from "../../../hooks/useScrollPosition";
import {useMemo, useState} from 'react';
import { useSelector } from 'react-redux';
import {useLocation, useNavigate} from "react-router-dom";
import {routerBook} from "../../../routes/routerBook";

export const Header = ({dashboardButtonHandler}) => {

  const navigate = useNavigate()

  const {pathname} = useLocation();

  const { walletAddress } = useSelector(state => state.accountReducer)

  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false)

  const scrollDirection = useScrollPosition();

  const dashboardButtonTitle = useMemo(() => {
    if (!walletAddress || pathname === routerBook.main) return 'Dashboard';

    if (pathname === routerBook.dashboard) return `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
  }, [pathname, walletAddress])

  return (
    <header className={classnames('con-full', 'header', { 'solid': scrollDirection >= 50 })}>

      <div className='con-desk con-def header__desktop-content'>
        <img onClick={navigate.bind(null, routerBook.main)} className='header__desktop-content__logo' src={logoSVG} alt={'svg'} />
        <nav className='header__desktop-content__nav'>
          <a>Contract</a>
          <a>Investments</a>
          <a>How it works</a>
          <button onClick={dashboardButtonHandler} className='dark-bttn big-bttn'>{dashboardButtonTitle}</button>
        </nav>
      </div>
      <div className='header__mobile-content con-mob con-full '>
        <div className={'header__mobile-content__main'}>
          <img onClick={navigate.bind(null, routerBook.main)} className='header__mobile-content__main__logo' src={logoSVG} alt={'svg'} />
          <button onClick={setIsMobileMenuVisible.bind(null, !isMobileMenuVisible)} className={'header__mobile-content__main__burger dark-bttn'}>
            {!isMobileMenuVisible ?  <img src={burgerMenuIcon} alt={'burger-menu-icon'}/> :  <img src={closeBurgerMenuIcon} alt={'burger-menu-icon'}/>}
          </button>
          <nav onClick={setIsMobileMenuVisible.bind(null, false)} className={classnames('header__mobile-content__main__nav', {'open': isMobileMenuVisible})}>
            <a>Contract</a>
            <a>Investments</a>
            <a>How it works</a>
            <button onClick={dashboardButtonHandler} className='dark-bttn big-bttn'>{dashboardButtonTitle}</button>
          </nav>
        </div>
      </div>
    </header>
  )
}
