export type TransactionInfo = {
  blockNumber: string
  timeStamp: string
  hash: string
  nonce: string
  blockHash: string
  transactionIndex: string
  from: string
  to: string
  value: string
  gas: string
  gasPrice: string
  isError: string
  txreceipt_status: string
  input: string
  contractAddress: string
  cumulativeGasUsed: string
  gasUsed: string
  confirmations: string
  methodId: string
  functionName: string
}

export type TransactionsResponse = {
  status: string
  message: string
  result: TransactionInfo[]
}

export type BlockAndBalanceResponse = {
  status: string
  message: string
  result: string
}
