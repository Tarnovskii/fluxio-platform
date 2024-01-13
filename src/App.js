import { BrowserRouter, Routes } from "react-router-dom";
import { RouterComponent } from "./routes/RouterComponent";

import { routerSchema } from "./routes/routerSchema";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { Config } from "config";
import { AccountActionCreator } from "store/reducers/accountReducer/action-creator";
import { WagmiConfig } from "wagmi";
import { initWagmi } from "utils/initWagmi";
import { ConfigContext } from "applicationContext";
import { ApplicationActionCreator } from "store/reducers/applicationReducer/action-creator";

export default () => {

  const { walletAddress } = useSelector(state => state.accountReducer)
  const { notCorrectChain } = useSelector(state => state.applicationReducer)

  const [seconds, setSeconds] = useState(0)
  const [wagmiConfig, setWagmiConfig] = useState()
  const [ethereumClient, setEthereumClient] = useState()
  const [projectId, setProjectId] = useState()
  const dispatch = useDispatch()

  useMemo(() => {
    const { wagmiConfig, ethereumClient, projectId } = initWagmi()

    setWagmiConfig(wagmiConfig)
    setEthereumClient(ethereumClient)
    setProjectId(projectId)
  }, [])

  useEffect(() => {
    let interval
    interval = setInterval(() => {
      if (!seconds) {

        if (walletAddress) {
          dispatch(AccountActionCreator.getUserReferralsStats())
          dispatch(AccountActionCreator.getUserStats())
          dispatch(ApplicationActionCreator.getSiteStats())
        }
        setSeconds(1);
      } else if (seconds >= Config().HEARTBEAT_RATE) {
        setSeconds(0)
      } else setSeconds(seconds + 1)
    }, 1000)

    return () => clearInterval(interval);
  }, [seconds])

  useEffect(() => {
    if (notCorrectChain) alert('Connect to another supported chain')
    if (!!walletAddress && !notCorrectChain) {
      setSeconds(0)
    }
  }, [walletAddress, notCorrectChain])

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
    };

    const handleChainChanged = (chainId) => {

      if (chainId !== Config().CHAIN_ID) {
        dispatch(ApplicationActionCreator.setNotCorrectChain(false))
      } else dispatch(ApplicationActionCreator.setNotCorrectChain(true))
    }

    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  return (
    <ConfigContext.Provider value={{ ethereumClient, projectId }}>
      <WagmiConfig config={wagmiConfig}>
        <BrowserRouter>
          <Routes>{routerSchema.map(RouterComponent)}</Routes>
        </BrowserRouter>
      </WagmiConfig>
    </ConfigContext.Provider>
  )
}
