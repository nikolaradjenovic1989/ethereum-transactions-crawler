import { FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import InputField from './InputField'
import { useValidateTxnForm } from '../../utils'

export type TransactionFormData = {
  address: string
  block: string
}

type TransactionFormProps = {
  isLoading: boolean
  setFormData: React.Dispatch<React.SetStateAction<TransactionFormData>>
}

const TransactionForm = ({ isLoading, setFormData }: TransactionFormProps) => {
  const { t } = useTranslation()
  const [address, setAddress] = useState('')
  const [block, setBlock] = useState('')
  const { addressError, blockError } = useValidateTxnForm(address, block)
  const disableButton = Boolean(addressError || blockError || isLoading)

  const inputClass =
    'p-2 pl-0 bg-transparent outline-none border-b-2 w-1/3 border-indigo-500'
  const buttonClass = cn('bg-indigo-600 font-bold py-2 px-4 rounded', {
    'opacity-50 cursor-not-allowed': disableButton,
    'hover:bg-indigo-700': !disableButton,
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormData({ address, block })
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center">
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
      <div className="flex justify-center mt-4">
        <button disabled={disableButton} className={buttonClass} type="submit">
          {t('showTransactions')}
        </button>
      </div>
    </form>
  )
}

export default TransactionForm
