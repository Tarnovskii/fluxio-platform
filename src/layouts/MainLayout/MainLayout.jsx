import {Outlet} from 'react-router-dom';
import {Header} from "../../components/common-components/Header/Header";
import {useModal} from "../../hooks/useModal";
import {MakeDeposit} from "../../modals/MakeDeposit/MakeDeposit";
import {useCallback} from "react";

export const MainLayout = () => {
    const [MakeDepositModal, setIsDepositModalOpen] = useModal({
        Component: MakeDeposit
    });

    const makeDepositButtonHandler = useCallback(() => {
        setIsDepositModalOpen(true)
    }, [setIsDepositModalOpen])

    return (
        <>
            <Header/>
            <MakeDepositModal closeModal={setIsDepositModalOpen.bind(null, false)}/>
            <Outlet context={{
                openDepositModal: makeDepositButtonHandler
            }}/>
        </>
    )
}