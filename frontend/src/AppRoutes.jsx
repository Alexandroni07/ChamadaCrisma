import { Route, Routes } from 'react-router-dom'
import Chamada from './Pages/Chamada'
import Historico from './Pages/Historico'
import MinhaTurma from './Pages/MinhaTurma'
import Login from './Pages/Login'
import PrivateRoute from './components/PrivateRoute'
import Register from './Pages/Register'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MinhaTurma />
          </PrivateRoute>
        }
      />
      <Route
        path="/historico"
        element={
          <PrivateRoute>
            <Historico />
          </PrivateRoute>
        }
      />
      <Route
        path="/chamada"
        element={
          <PrivateRoute>
            <Chamada />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default AppRoutes;
