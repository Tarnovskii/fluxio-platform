
export const Config = () => {
  if (process.env.REACT_APP_ENV === 'production') {
    return {
      WEB3_BSC_URL: 'https://bsc-dataseed.binance.org/',
      FARM_ADDRESS: '0x11e29f70A49b5ECBA337b35e267d676147642649',
      HEARTBEAT_RATE: 10,
      BASE_URL: '/',
      PROJECT_ID: '5b88e380cb7f9736a57c4175e26f1c55',
      CHAIN_ID: 56,
      BSC_SCAN_URL: 'https://bscscan.com/tx/',
      BSC_SCAN_CONTRACT: 'https://bscscan.com/address/'
    }
  } else {
    return {
      WEB3_BSC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      FARM_ADDRESS: '0x79CC632B85634414501812E60C1Eaac30F117718',
      HEARTBEAT_RATE: 10,
      BASE_URL: '/',
      PROJECT_ID: '5b88e380cb7f9736a57c4175e26f1c55',
      CHAIN_ID: 97,
      BSC_SCAN_URL: 'https://testnet.bscscan.com/tx/',
      BSC_SCAN_CONTRACT: 'https://testnet.bscscan.com/address/'
    }
  }
}
