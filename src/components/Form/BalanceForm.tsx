import { FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import DatePicker from 'react-datepicker'
import InputField from './InputField'
import Button from './Button'
import { isAddress } from 'web3-validator'

export type BalanceQueryData = {
  address: string
  date: string
}

type BalanceFormProps = {
  isLoading: boolean
  setQueryData: React.Dispatch<React.SetStateAction<BalanceQueryData>>
}

const BalanceForm = ({ isLoading, setQueryData }: BalanceFormProps) => {
  const { t } = useTranslation()
  const [address, setAddress] = useState('')
  const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0))) // always initialize to midnight
  const isValidAddress = isAddress(address)
  const addressError = !isValidAddress
    ? t('validation.addressErrorMessage')
    : ''

  const inputClass =
    'p-2 pl-0 bg-transparent outline-none border-b-2 w-1/3 border-indigo-500'

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setQueryData({ address, date: String(date.getTime() / 1000) })
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
      <div className="flex justify-center mb-6">
        <DatePicker
          showIcon
          disabled={isLoading}
          calendarClassName="w-full"
          wrapperClassName="w-1/3"
          className="p-2 pl-0 bg-transparent w-full outline-none border-b-2 border-indigo-500"
          maxDate={new Date()}
          selected={date}
          onChange={(date) => setDate(date!)}
        />
      </div>
      <Button
        disabled={!isValidAddress || isLoading}
        value={t('showBalance')}
      />
    </form>
  )
}

export default BalanceForm
