import './App.css';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import SideNav from './components/SideNav/SideNav';
import { Grid } from '@mui/material';

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' ||  location.pathname === '/register';

  return (
    <Grid container>
      {!isLoginPage && (
        <Grid size={2}>
          <SideNav />
        </Grid>
      )}
      <Grid size={isLoginPage ? 12 : 10}>
        <AppRoutes />
      </Grid>
    </Grid>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
