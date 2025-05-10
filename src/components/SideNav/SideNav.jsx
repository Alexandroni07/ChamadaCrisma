import { FaHome, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import './SideNav.css';

export const SideNav = () => {
  return (
    <div className="sidenav">
      <div className="sidenav-header">
        <h2>Crisma 2023</h2>
      </div>
      
      <ul className="sidenav-links">
        <li>
          <a href="/" className="sidenav-link">
            <FaHome className="sidenav-icon" />
            <span>Minha Turma</span>
          </a>
        </li>
        <li>
          <a href="/historico" className="sidenav-link">
            <FaHistory className="sidenav-icon" />
            <span>Histórico</span>
          </a>
        </li>
      </ul>
      
      <div className="sidenav-footer">
        <a href="/logout" className="sidenav-link">
          <FaSignOutAlt className="sidenav-icon" />
          <span>Sair</span>
        </a>
      </div>
    </div>
  );
};

export default SideNav;