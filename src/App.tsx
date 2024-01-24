import { BalancePage, Header, TransactionsPage } from './components'
import { Navigate, Route, Routes } from 'react-router-dom'
import './index.css'

const App = () => {
  return (
    <div className="pt-4 min-h-screen text-white bg-gray-600 fill-gray-400">
      <Header />
      <Routes>
        <Route index path="/" element={<TransactionsPage />} />
        <Route index path="/balance" element={<BalancePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
