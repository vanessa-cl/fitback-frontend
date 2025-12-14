import { Outlet } from "react-router-dom";
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography,
  Container,
  useTheme
} from "@mui/material";
import logo from "../../assets/logo_fitback_horizontal.png";

const HomeLayout = () => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default
    }}>
      <AppBar 
        position="static"
        sx={{ backgroundColor: theme.palette.secondary.main }}
      >
        <Toolbar>
          <Box
            component="img"
            src={logo}
            alt="FITBACK Logo"
            sx={{
              height: 50,
              width: 'auto',
              ml: 4
            }}
          />
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          backgroundColor: theme.palette.background.paper,
          borderTop: `1px solid ${theme.palette.divider}`
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center"
          >
            FITBACK 2025 © - Sistema de Gestão de Feedbacks
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomeLayout;