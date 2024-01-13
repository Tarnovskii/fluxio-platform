import {IntroBanner} from "components/landing-components/IntroBanner/IntroBanner";
import {ListedOn} from "components/landing-components/ListedOn/ListedOn";
import {AboutUs} from "../../components/landing-components/AboutUs/AboutUs";
import {SmartStats} from "../../components/landing-components/SmartStats/SmartStats";
import {Footer} from "../../components/landing-components/Footer/Footer";
import {Conditions} from "../../components/landing-components/Conditions/Conditions";
import {InvestmentRules} from "../../components/landing-components/InvestmentRules/InvestmentRules";
import {HowTo} from "../../components/landing-components/HowTo/HowTo";

export const LandingPage = () => {
    return (
        <>
            <IntroBanner/>
            <hr className={'con-full'}/>
            <ListedOn/>
            <AboutUs/>
            <SmartStats/>
            <Conditions/>
            <InvestmentRules/>
            <HowTo/>
            <Footer/>
        </>
    )
}