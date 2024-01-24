import { useState } from 'react'
import { TransactionInfo, useTransactionsQuery } from '../../api'
import { TransactionForm, TransactionQueryData, TransactionTable } from '..'

const TransactionsPage = () => {
  const [{ address, block }, setQueryData] = useState<TransactionQueryData>({
    address: '',
    block: '',
  })
  const { data: response, isLoading } = useTransactionsQuery(address, block)

  const data: TransactionInfo[] = Array.isArray(response?.result)
    ? response.result
    : []

  return (
    <>
      <TransactionForm isLoading={isLoading} setQueryData={setQueryData} />
      <TransactionTable isLoading={isLoading} data={data} />
    </>
  )
}

export default TransactionsPage
