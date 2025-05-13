import { Routes, Route } from 'react-router-dom'
import MinhaTurma from './Pages/MinhaTurma'
import Historico from './Pages/Historico'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MinhaTurma />} />
      <Route path="/historico" element={<Historico />} />
    </Routes>
  )
}

export default AppRoutes;