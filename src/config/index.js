
export const Config = () => {
  if (process.env.REACT_APP_ENV === 'production') {
    return {
      WEB3_BSC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      FARM_ADDRESS: '0x08e10ED3c9eaa72e260f5428ebe353f27291FebF',
      HEARTBEAT_RATE: 10,
      BASE_URL: '/',
      PROJECT_ID: '5b88e380cb7f9736a57c4175e26f1c55',
      CHAIN_ID: 97,
      BSC_SCAN_URL: 'https://testnet.bscscan.com/tx/',
      BSC_SCAN_CONTRACT: 'https://testnet.bscscan.com/address/'
    }
  } else {
    return {
      WEB3_BSC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      FARM_ADDRESS: '0x02626776C62b9da828A22c826F7615133F8D831D',
      HEARTBEAT_RATE: 10,
      BASE_URL: '/',
      PROJECT_ID: '5b88e380cb7f9736a57c4175e26f1c55',
      CHAIN_ID: 97,
      BSC_SCAN_URL: 'https://testnet.bscscan.com/tx/',
      BSC_SCAN_CONTRACT: 'https://testnet.bscscan.com/address/'
    }
  }
}
