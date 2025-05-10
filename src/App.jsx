import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Layout/Header'
import SideNav from './components/SideNav/SideNav'
import Footer from './components/Layout/Footer'
import AppRoutes from './AppRoutes'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <SideNav />
        <main className="main-content">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App