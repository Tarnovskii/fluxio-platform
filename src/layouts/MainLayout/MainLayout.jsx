import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {Header} from "../../components/common-components/Header/Header";
import {useModal} from "../../hooks/useModal";
import {MakeDeposit} from "../../modals/MakeDeposit/MakeDeposit";
import {useCallback, useMemo, useRef} from "react";
import {useWeb3Modal, Web3Modal} from "@web3modal/react";
import {AccountActionCreator} from "../../store/reducers/accountReducer/action-creator";
import {useEffect} from "react";
import {ApplicationActionCreator} from "../../store/reducers/applicationReducer/action-creator";
import {routerBook} from "../../routes/routerBook";
import {useDispatch, useSelector} from "react-redux";
import {useContext} from "react";
import {ConfigContext} from "../../applicationContext";
import {useAccount, useWalletClient} from "wagmi";
import {Bounce, ToastContainer} from "react-toastify";

export const MainLayout = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const { ethereumClient, projectId } = useContext(ConfigContext)
    const { open } = useWeb3Modal();
    const { walletAddress } = useSelector(state => state.accountReducer)
    const { connector: activeConnector, address, isDisconnected } = useAccount()
    const { data } = useWalletClient()
    const dispatch = useDispatch()

    const [MakeDepositModal, setIsDepositModalOpen] = useModal({
        Component: MakeDeposit
    });

    const makeDepositButtonHandler = useCallback(() => {
        setIsDepositModalOpen(true)
    }, [setIsDepositModalOpen])


    const handleConnectWalletClick = useCallback(() => {
        if (walletAddress && pathname === routerBook.main) {
            navigate(routerBook.dashboard)
            return;
        }

        open()
    }, [window.wallet, walletAddress, pathname])

    const disconnectWallet = () => {
        dispatch(AccountActionCreator.resetUserInfo())
        dispatch(AccountActionCreator.setWalletAddress(null))
    }

    useEffect(() => {
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
        <>
            <Web3Modal explorerRecommendedWalletIds={[
                'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
                '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
            ]} projectId={projectId} ethereumClient={ethereumClient} />

            <Header dashboardButtonHandler={handleConnectWalletClick}/>
            <MakeDepositModal closeModal={setIsDepositModalOpen.bind(null, false)}/>
            <ToastContainer
                position="bottom-right"
                newestOnTop
                rtl={false}
                theme="dark"
                transition={Bounce}
            />
            <Outlet context={{
                openDepositModal: makeDepositButtonHandler
            }}/>

        </>
    )
}