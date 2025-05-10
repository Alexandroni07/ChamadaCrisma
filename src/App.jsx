import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import SideNav from './components/SideNav/SideNav'
import { Grid } from '@mui/material'

function App() {
  return (
    <Router>
      <Grid container>
        <Grid item >
          <SideNav />
        </Grid>
        <Grid item size={"grow"}>
          <AppRoutes />
        </Grid>
      </Grid>
    </Router>
  )
}

export default App