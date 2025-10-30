import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Paper,
  Divider,
  Chip,
  useTheme
} from "@mui/material";
import { 
  People, 
  Category, 
  Quiz, 
  Assignment, 
  Dashboard
} from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Clientes",
      description: "Gerencie os clientes do sistema",
      icon: <People sx={{ fontSize: 40 }} />,
      path: "/consultar-clientes",
      color: theme.palette.primary.main,
      disabled: false
    },
    {
      title: "Perguntas",
      description: "Gerencie as perguntas do sistema",
      icon: <Quiz sx={{ fontSize: 40 }} />,
      path: "/gerenciar-perguntas",
      color: theme.palette.success.main,
      disabled: true // Desabilitado
    },
    {
      title: "Questionários",
      description: "Crie e gerencie questionários",
      icon: <Assignment sx={{ fontSize: 40 }} />,
      path: "/consultar-questionario",
      color: theme.palette.warning.main,
      disabled: false
    },
    {
      title: "Dashboard",
      description: "Visualize relatórios e métricas",
      icon: <Dashboard sx={{ fontSize: 40 }} />,
      path: "/example",
      color: theme.palette.info.main,
      disabled: true // Desabilitado
    }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container sx={{ mt: 5, mb: 5 }}>
        <Typography variant="h1" gutterBottom>
          Bem-vindo ao FITBACK
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: theme.palette.text.secondary }}
          gutterBottom
        >
          Sistema de Gestão de Feedbacks
        </Typography>
        <Divider sx={{ my: 4 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
           <Paper
  elevation={0}
  sx={{
    p: 3,
    backgroundColor: theme.palette.background.default,
  }}
>
  <Grid container spacing={3} justifyContent="center">
    {menuItems.map((item, index) => (
      <Grid item xs={12} sm={8} md={5} lg={4} key={index}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.palette.background.paper,
            maxWidth: 350, 
            margin: '0 auto',
            minHeight: 320,
            opacity: item.disabled ? 0.7 : 1,
            position: 'relative',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: item.disabled ? 'none' : 'translateY(-4px)',
              boxShadow: item.disabled ? 1 : 4
            }
          }}
        >
          {/* Badge "Disponível em breve" */}
          {item.disabled && (
            <Chip 
              label="Disponível em breve" 
              size="small" 
              color="primary"
              sx={{ 
                position: 'absolute',
                top: 12,
                right: 12,
                fontSize: '0.65rem',
                height: 24,
                backgroundColor: `${theme.palette.primary.main}20`,
                color: theme.palette.primary.main,
                border: `1px solid ${theme.palette.primary.main}30`,
                zIndex: 1
              }}
            />
          )}

          <CardContent sx={{ 
            p: 3, 
            flexGrow: 1, 
            display: "flex", 
            flexDirection: "column",
          }}>
            {/* Ícone */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
                borderRadius: 2,
                backgroundColor: `${item.color}15`,
                color: item.color,
                mb: 2,
                mx: 'auto', 
                opacity: item.disabled ? 0.6 : 1
              }}
            >
              {item.icon}
            </Box>

            {/* Título e Descrição */}
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 600, 
                textAlign: 'center',
                opacity: item.disabled ? 0.8 : 1
              }}
            >
              {item.title}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                mb: 3, 
                flexGrow: 1, 
                textAlign: 'center',
                opacity: item.disabled ? 0.7 : 1
              }}
            >
              {item.description}
            </Typography>

            {/* Botão de Ação */}
            <Button
              variant="contained"
              fullWidth
              disabled={item.disabled}
              sx={{
                backgroundColor: item.color,
                opacity: item.disabled ? 0.6 : 1,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: item.color,
                  opacity: item.disabled ? 0.6 : 0.9
                }
              }}
              onClick={() => !item.disabled && navigate(item.path)}
            >
              {item.disabled ? "Em Breve" : "Acessar"}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;