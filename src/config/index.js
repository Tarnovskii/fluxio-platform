
export const Config = () => {
  if (process.env.REACT_APP_ENV === 'production') {
    return {
      WEB3_BSC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      FARM_ADDRESS: '0x08e10ED3c9eaa72e260f5428ebe353f27291FebF',
      HEARTBEAT_RATE: 10,
      BASE_URL: '/',
      PROJECT_ID: '5b88e380cb7f9736a57c4175e26f1c55',
      CHAIN_ID: 97,
      BSC_SCAN_URL: 'https://testnet.bscscan.com/tx/'
    }
  } else {
    return {
      WEB3_BSC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      FARM_ADDRESS: '0xBB4293B8207513Ad047bEEBa88714519B58AD65B',
      HEARTBEAT_RATE: 10,
      BASE_URL: '/',
      PROJECT_ID: '5b88e380cb7f9736a57c4175e26f1c55',
      CHAIN_ID: 97,
      BSC_SCAN_URL: 'https://testnet.bscscan.com/tx/'
    }
  }
}
