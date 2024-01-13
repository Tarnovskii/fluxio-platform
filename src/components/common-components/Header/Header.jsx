import './header.scss'

import logoSVG from 'assets/img/logo.svg'
import burgerMenuIcon from 'assets/img/burger-menu-icon.svg'
import closeBurgerMenuIcon from 'assets/img/close-burger-icon.svg'
import classnames from "classnames";
import { useScrollPosition } from "../../../hooks/useScrollPosition";
import { Web3Modal, useWeb3Modal } from '@web3modal/react';
import { ConfigContext } from 'applicationContext';
import {useCallback, useContext, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount, useWalletClient } from 'wagmi';
import { ApplicationActionCreator } from 'store/reducers/applicationReducer/action-creator';
import { AccountActionCreator } from 'store/reducers/accountReducer/action-creator';

export const Header = () => {
  const { ethereumClient, projectId } = useContext(ConfigContext)
  const { open } = useWeb3Modal();
  const { walletAddress } = useSelector(state => state.accountReducer)
  const { connector: activeConnector, address, isConnecting, isDisconnected } = useAccount()
  const { data, isError } = useWalletClient()

  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false)

  const dispatch = useDispatch()

  const scrollDirection = useScrollPosition();

  const handleConnectWalletClick = useCallback(() => {
    open()
  }, [window.wallet, walletAddress])

  const disconnectWallet = () => {
    dispatch(AccountActionCreator.resetUserInfo())
    dispatch(AccountActionCreator.setWalletAddress(null))
  }

  useEffect(() => {
    console.log(address, data)
    if (!!data && !isDisconnected) {
      dispatch(ApplicationActionCreator.setWalletRpc(data))
      dispatch(ApplicationActionCreator.connectWallet())
    } else if (data === undefined && isDisconnected === undefined) {
      disconnectWallet()
    }
  }, [address, data])

  useEffect(() => {
    if (isDisconnected) {
      disconnectWallet()
    }
  }, [isDisconnected])

  return (
    <header className={classnames('con-full', 'header', { 'solid': scrollDirection >= 50 })}>
      <Web3Modal explorerRecommendedWalletIds={[
        'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
        '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
      ]} projectId={projectId} ethereumClient={ethereumClient} />
      <div className='con-desk con-def header__desktop-content'>
        <img className='header__desktop-content__logo' src={logoSVG} alt={'svg'} />
        <nav className='header__desktop-content__nav'>
          <a>Contract</a>
          <a>Investments</a>
          <a>How it works</a>
          <button onClick={handleConnectWalletClick} className='dark-bttn big-bttn'>Dashboard</button>
        </nav>
      </div>
      <div className='header__mobile-content con-mob con-full '>
        <div className={'header__mobile-content__main'}>
          <img className='header__mobile-content__main__logo' src={logoSVG} alt={'svg'} />
          <button onClick={setIsMobileMenuVisible.bind(null, !isMobileMenuVisible)} className={'header__mobile-content__main__burger dark-bttn'}>
            {!isMobileMenuVisible ?  <img src={burgerMenuIcon} alt={'burger-menu-icon'}/> :  <img src={closeBurgerMenuIcon} alt={'burger-menu-icon'}/>}
          </button>
          <nav onClick={setIsMobileMenuVisible.bind(null, false)} className={classnames('header__mobile-content__main__nav', {'open': isMobileMenuVisible})}>
            <a>Contract</a>
            <a>Investments</a>
            <a>How it works</a>
            <button onClick={handleConnectWalletClick} className='dark-bttn big-bttn'>Dashboard</button>
          </nav>
        </div>
      </div>
    </header>
  )
}
