import {Outlet} from 'react-router-dom';
import {Header} from "../../components/common-components/Header/Header";
import {Footer} from "../../components/common-components/Footer/Footer";

export const MainLayout = () => {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}