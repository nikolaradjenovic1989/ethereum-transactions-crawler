import { FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import InputField from './InputField'
import Button from './Button'
import { useValidateTxnForm } from '../../utils'

export type TransactionQueryData = {
  address: string
  block: string
}

type TransactionFormProps = {
  isLoading: boolean
  setQueryData: React.Dispatch<React.SetStateAction<TransactionQueryData>>
}

const TransactionForm = ({ isLoading, setQueryData }: TransactionFormProps) => {
  const { t } = useTranslation()
  const [address, setAddress] = useState('')
  const [block, setBlock] = useState('')
  const { addressError, blockError } = useValidateTxnForm(address, block)
  const disableButton = Boolean(addressError || blockError || isLoading)

  const inputClass =
    'p-2 pl-0 bg-transparent outline-none border-b-2 w-1/3 border-indigo-500'

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setQueryData({ address, block })
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center mb-2">
        <InputField
          center
          className={inputClass}
          disabled={isLoading}
          placeholder={t('address')}
          name="address"
          onChange={setAddress}
          value={address}
        />
        <div className="w-1/3 h-6 text-red-500">{addressError}</div>
      </div>
      <div className="flex flex-col items-center">
        <InputField
          center
          className={inputClass}
          disabled={isLoading}
          placeholder={t('startingBlock')}
          type="number"
          name="block"
          onChange={setBlock}
          value={block}
        />
        <div className="w-1/3 h-6 text-red-500">{blockError}</div>
      </div>
      <Button disabled={disableButton} value={t('showTransactions')} />
    </form>
  )
}

export default TransactionForm
