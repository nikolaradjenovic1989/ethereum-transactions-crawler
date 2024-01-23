import { useTranslation } from 'react-i18next'

const Title = () => {
  const { t } = useTranslation()

  return (
    <span className="flex justify-center text-3xl font-bold mb-4">
      {t('title')}
    </span>
  )
}

export default Title
