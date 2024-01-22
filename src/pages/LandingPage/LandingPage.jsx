import ScrollAnimation from 'react-animate-on-scroll'
import {IntroBanner} from "components/landing-components/IntroBanner/IntroBanner";
import {ListedOn} from "components/landing-components/ListedOn/ListedOn";
import {AboutUs} from "../../components/landing-components/AboutUs/AboutUs";
import {SmartStats} from "../../components/landing-components/SmartStats/SmartStats";
import {Footer} from "../../components/landing-components/Footer/Footer";
import {Conditions} from "../../components/landing-components/Conditions/Conditions";
import {InvestmentRules} from "../../components/landing-components/InvestmentRules/InvestmentRules";
import {HowTo} from "../../components/landing-components/HowTo/HowTo";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {ParallaxProvider} from "react-scroll-parallax";

export const LandingPage = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const referral = Object.fromEntries(searchParams.entries()).ref
        if (referral) {
            localStorage.setItem("refAddress", referral);
        }

    }, [searchParams])

    return (
        <ParallaxProvider>
                <IntroBanner/>
                <ListedOn/>
                <AboutUs/>
                <SmartStats/>
                <Conditions/>
                <InvestmentRules/>
                <HowTo/>
                <Footer/>
        </ParallaxProvider>
    )
}
