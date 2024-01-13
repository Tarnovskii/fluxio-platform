import { useSelector } from 'react-redux'
import './smart-stats.scss'

export const SmartStats = () => {
  const { participants, totalBnbDeposit } = useSelector(state => state.applicationReducer)

  return (
    <section className='con-full ss'>
      <div className='con-def ss__main'>
        <h2>Secure smartcontract on Binance Smart Chain</h2>
        <p className='ss__main__sub-header'>Participating in Fluxio you can feel absolutely safe</p>
        <div className={'ss__main__tiles'}>
          <div className={'ss__main__tiles__tile'}>
            <span>{totalBnbDeposit}</span>
            <small>Total BNB deposited</small>
          </div>
          <span className={'ss__main__tiles__separator'}></span>
          <div className={'ss__main__tiles__tile'}>
            <span>{participants}</span>
            <small>Number of participants</small>
          </div>
        </div>
        <button className='trnp-bttn mid-bttn'>Audit results</button>
        <p className='ss__main__audit-status'>Audit Status: Successfully passed</p>
      </div>
    </section>
  )
}
