import { useSelector } from 'react-redux';
import './conditions.scss'
import { useMemo } from "react";


export const Conditions = () => {

  const { contractPercent } = useSelector(state => state.applicationReducer)
  const { depositRate, percentRate } = useSelector(state => state.accountReducer.userStats)

  const conditionRules = [{
    header: '1.5% every 24 hours(0.0625% an hour)',
    nowPercent: percentRate,
    description: 'The smart contract calculates the profitability from the moment the deposit is made. Every hour you get 0.0625%, every day + 1.5%.',
    footer: 'The base interest rate does not change and is always 1.5%'
  }, {
    header: '+0,1% for each +100 BNB on the contract balance',
    nowPercent: contractPercent,
    description: 'The smartcontract calculates the contract hold-bonus when the contract balance grows.',
    footer: 'Maximum contract hold bonus -100%'
  }, {
    header: '+0.1% for every 24 hours without withdrawals',
    nowPercent: contractPercent,
    description: 'The smart contract calculates the hold bonus from the moment the deposit or the last withdrawal is made. If you don\'t make any withdrawals, you receive additional profitability. After 24 hours + 0.1%, after 48 hours + 0.2%, after 72 hours + 0.3%, etc.',
    footer: 'Maximum hold bonus - 100%.'
  }, {
    header: '+0,1% for each +10 BNB personally deposited',
    nowPercent: depositRate,
    description: 'The smart contract calculates the VIP hold bonus for each personal deposit.',
    footer: 'Maximum VIP hold bonus 100%.'
  }]

  const conditionRulesTiles = useMemo(() => {
    return conditionRules.map((condition, index) => {
      const { header, nowPercent, description, footer } = condition
      return (
        <div style={{ '--index': index }} className={'cond__tiles__tile'}>
          <div className={'cond__tiles__tile__number'}>
            <b>{index + 1}</b>
          </div>
          <div className={'cond__tiles__tile__description'}>
            <b>{header}</b>
            <span className={'cond__tiles__tile__description__sub-header'}>Now: {nowPercent}%</span>
            <p>{description}</p>
            <span className={'cond__tiles__tile__description__footer'}>{footer}</span>
          </div>
        </div>
      )
    })
  }, [conditionRules])

  return (
    <section id={'investments'} className={'con-def cond'}>
      <h2>Investment conditions</h2>
      <p className={'cond__sub-header'}>Best offer on the market</p>
      <div className={'cond__tiles'}>
        {conditionRulesTiles}
      </div>
    </section>
  )
}
