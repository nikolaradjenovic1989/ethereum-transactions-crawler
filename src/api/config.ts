export const baseUrl = 'https://api.etherscan.io/api'

// for security reasons `apiKey` should be in `.env` file and should not be
// pushed remotely, for simplicity reasons it's here since this is test app
export const txnQueryParams = {
  apikey: '568E6J3J3XHJZASJV21UFWDF8YKJG2G3JM',
  action: 'txlist',
  module: 'account',
  sort: 'desc',
}
