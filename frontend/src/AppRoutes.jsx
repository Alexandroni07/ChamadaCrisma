import { Routes, Route } from 'react-router-dom'
import MinhaTurma from './Pages/MinhaTurma'
import Historico from './Pages/Historico'
import Chamada2 from './Pages/Chamada2'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MinhaTurma />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/chamada" element={<Chamada2 />} />
    </Routes>
  )
}

export default AppRoutes;