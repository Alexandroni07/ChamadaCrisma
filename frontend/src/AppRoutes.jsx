import { Route, Routes } from 'react-router-dom'
import Chamada from './Pages/Chamada'
import Historico from './Pages/Historico'
import MinhaTurma from './Pages/MinhaTurma'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MinhaTurma />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/chamada" element={<Chamada />} />
    </Routes>
  )
}

export default AppRoutes;