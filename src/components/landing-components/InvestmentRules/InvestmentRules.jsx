import './investment-rules.scss'
import {useMemo} from "react";

const rules = [
    'We work only with BNB (Binance Smart Chain)',
    'Minimum deposit amount 0.01 BNB',
    'Maximum profit 200% (including deposit)',
    'You can withdraw your profit at any moment',
    'Payments are instantly credited to your wallet',
    'The referral system works only for active accounts',
    'Referral reward is calculated based on the difference in levels'
]

export const InvestmentRules = () => {
    const rulesTiles = useMemo(() => {
        return rules.map(rule => (
            <div className={'ir__main__tiles__tile'}>
                {rule}
            </div>
        ))
    }, [rules])

    return (
        <section className={'con-full ir'}>
            <div className={'con-def ir__main'}>
                <h2>Investment rules</h2>
                <div className={'ir__main__tiles'}>
                    {rulesTiles}
                </div>
            </div>
        </section>
    )
}