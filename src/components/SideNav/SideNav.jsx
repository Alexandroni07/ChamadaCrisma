import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { FaHome, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SideNav = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    console.log("Usuário deslogado")
  }

  return (
    <Grid container direction={"column"}
      style={{
        backgroundColor: "#4169E1",
        height: "100vh",
        color: "white",
        padding: 16
      }}>
      <Grid item style={{ flexGrow: 1 }}>
        <Box >
          <Typography style={{ fontSize: 28 }}>Crisma 2025</Typography>
        </Box>
        <Divider color={"white"} style={{ margin: "10px 0px" }} />

        <Box display="flex" alignItems="center" padding={1}
          sx={{
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#1E3A8A',
              borderRadius: '8px'
            }
          }}>
          <FaHome style={{ marginRight: 8 }} />
          <Button
            onClick={() => handleNavigate('/')}
            sx={{
              color: 'white',
              textTransform: 'none'
            }}
          >
            Minha turma
          </Button>
        </Box>

        <Box display="flex" alignItems="center" padding={1}
          sx={{
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#1E3A8A',
              borderRadius: '8px'
            }
          }}>
          <FaHistory style={{ marginRight: 8 }} />
          <Button
            onClick={() => handleNavigate('/historico')}
            sx={{
              color: 'white',
              textTransform: 'none'
            }}
          >
            Histórico
          </Button>
        </Box>

      </Grid>
      <Grid item>
        <Box display="flex" justifyContent="flex-end">
          <Box display="flex" alignItems="center" padding={1}
            sx={{
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#1E3A8A',
                borderRadius: '8px'
              }
            }}>
            <FaSignOutAlt />
            <Button
              type="button"
              variant="text"
              color='black'
              onClick={handleLogout}
            >
              Sair
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SideNav;