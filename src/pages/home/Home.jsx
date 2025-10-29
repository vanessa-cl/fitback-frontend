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
      color: theme.palette.primary.main
    },
    /*{
      title: "Perguntas",
      description: "Gerencie as perguntas do sistema",
      icon: <Quiz sx={{ fontSize: 40 }} />,
      path: "/gerenciar-perguntas",
      color: theme.palette.success.main
    },*/
    {
      title: "Questionarios",
      description: "Crie e gerencie questionários",
      icon: <Assignment sx={{ fontSize: 40 }} />,
      path: "/consultar-questionario",
      color: theme.palette.warning.main
    },
    /*{
      title: "Dashboard",
      description: "Visualize relatórios e métricas",
      icon: <Dashboard sx={{ fontSize: 40 }} />,
      path: "/example",
      color: theme.palette.info.main
    }*/
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
          }}
        >
          <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
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
              }}
            >
              {item.icon}
            </Box>

            {/* Título e Descrição */}
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, textAlign: 'center' }}>
              {item.title}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mb: 3, flexGrow: 1, textAlign: 'center' }}
            >
              {item.description}
            </Typography>

            {/* Botão de Ação */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: item.color,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: item.color,
                  opacity: 0.9
                }
              }}
              onClick={() => navigate(item.path)}
            >
              Acessar
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