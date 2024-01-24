import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const radioClass =
    'w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 cursor-pointer'

  return (
    <div className="mb-4">
      <h1 className="flex justify-center text-3xl font-bold mb-4">
        {t('title')}
      </h1>
      <div className="flex justify-center gap-20">
        <div className="flex items-center me-4">
          <input
            checked={pathname === '/'}
            id="transactions"
            type="radio"
            className={radioClass}
            onChange={() => navigate('/')}
          />
          <label
            htmlFor="transactions"
            className="ms-2 font-medium cursor-pointer"
          >
            {t('transactions')}
          </label>
        </div>
        <div className="flex items-center me-4">
          <input
            checked={pathname === '/balance'}
            id="balance"
            type="radio"
            className={radioClass}
            onChange={() => navigate('/balance')}
          />
          <label htmlFor="balance" className="ms-2 font-medium cursor-pointer">
            {t('balance')}
          </label>
        </div>
      </div>
    </div>
  )
}

export default Header
