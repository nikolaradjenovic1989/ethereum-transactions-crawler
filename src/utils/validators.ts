import { useTranslation } from 'react-i18next'
import { isAddress, isBlockNumber } from 'web3-validator'

export const useValidateTxnForm = (address: string, block: string) => {
  const { t } = useTranslation()
  let addressError = ''
  let blockError = ''

  if (!isAddress(address)) {
    addressError = t('validation.addressErrorMessage')
  }

  if (!isBlockNumber(block)) {
    blockError = t('validation.blockErrorMessage')
  }
  return {
    addressError,
    blockError,
  }
}
