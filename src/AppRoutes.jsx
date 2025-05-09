import { Routes, Route } from 'react-router-dom'
import { MinhaTurma } from './pages/MinhaTurma/MinhaTurma'
import { Historico } from './pages/Historico/Historico'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MinhaTurma />} />
      <Route path="/historico" element={<Historico />} />
    </Routes>
  )
}

export default AppRoutes