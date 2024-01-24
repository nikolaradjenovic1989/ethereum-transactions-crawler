export const baseUrl = 'https://api.etherscan.io/api'

// for security reasons `apiKey` should be in `.env` file and should not be
// pushed remotely, for simplicity reasons it's here since this is test app
const apikey = 'M5CJMP93DM7MQB7RT3SCC7EUF3EFPRJVN4'

export const txnQueryParams = {
  apikey,
  action: 'txlist',
  module: 'account',
  sort: 'desc',
}

export const blockNoQueryParams = {
  apikey,
  action: 'getblocknobytime',
  module: 'block',
  closest: 'before',
}

export const balanceQueryParams = {
  apikey,
  action: 'balancehistory',
  module: 'account',
}
