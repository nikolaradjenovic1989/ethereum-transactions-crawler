import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BalanceForm, { BalanceQueryData } from '../Form/BalanceForm'
import { useBalanceQuery, useBlockNoQuery } from '../../api'

const BalancePage = () => {
  const { t } = useTranslation()
  const [{ address, date }, setQueryData] = useState<BalanceQueryData>({
    address: '',
    date: '',
  })

  // the proper way of obtaining balance on a certan date is to get block that was mined
  // at provided timestamp, after getting the block we can use it to get address balance
  const { data, isLoading } = useBlockNoQuery(date)

  // unfortunately, this endpoint s PRO endpoint and it won't return actual balance
  // since I cannot afford $200/month for PRO key I will leave the message in the app
  const { data: balance, isLoading: loadingBalance } = useBalanceQuery(
    address,
    data?.result || ''
  )

  return (
    <>
      <BalanceForm
        isLoading={isLoading || loadingBalance}
        setQueryData={setQueryData}
      />
      {balance?.result && (
        <div className="flex justify-center text-xl font-bold mt-6">
          {t('balance')}: {balance.result}
        </div>
      )}
    </>
  )
}

export default BalancePage
