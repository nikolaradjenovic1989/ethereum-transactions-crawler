import { useState } from 'react'
import {
  TransactionTable,
  Title,
  TransactionForm,
  TransactionFormData,
} from './components'
import { TransactionInfo, useTransactionsQuery } from './api'
import './index.css'

const App = () => {
  const [{ address, block }, setFormData] = useState<TransactionFormData>({
    address: '',
    block: '',
  })
  const { data: response, isLoading } = useTransactionsQuery(address, block)

  const data: TransactionInfo[] = Array.isArray(response?.result)
    ? response.result
    : []

  return (
    <div className="pt-4 min-h-screen text-white bg-gray-600 fill-gray-400">
      <Title />
      <TransactionForm isLoading={isLoading} setFormData={setFormData} />
      <TransactionTable isLoading={isLoading} data={data} />
    </div>
  )
}

export default App
