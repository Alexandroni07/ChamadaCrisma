import { Routes, Route } from 'react-router-dom'
import MinhaTurma from './Pages/MinhaTurma'
import Historico from './Pages/Historico'
import Chamada from './Pages/Chamada'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MinhaTurma />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/historico" element={<Chamada />} />
    </Routes>
  )
}

export default AppRoutes;