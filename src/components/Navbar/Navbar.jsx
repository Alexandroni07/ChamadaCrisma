import './Navbar.css'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className="site-nav">
      <ul className="nav-list">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
            Minha Turma
          </NavLink>
        </li>
        <li>
          <NavLink to="/historico" className={({ isActive }) => isActive ? 'active' : ''}>
            Histórico
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}