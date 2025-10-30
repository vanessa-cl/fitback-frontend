import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  InputAdornment,
  Divider,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Search,
  PlaylistAddCheck, // Ícone para Total de Questionários
  BarChart, // Ícone para Questionários Ativos
  QuestionAnswer, // Ícone para Total de Perguntas
  ArrowBack, // Ícone para o botão Voltar
} from "@mui/icons-material";

import { usePageTitle } from "../../context/PageTitleContext.jsx";

const QuestionnaireList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [questionnaires, setQuestionnaires] = useState([]);
  const { setTitle } = usePageTitle();

  // Dados mockados baseados na imagem
  const mockQuestionnaires = [
    {
      id: 1,
      codigo: "1",
      categoria: "Funcionários",
      descricao: "Avaliar a satisfação geral dos clientes",
      dataCriacao: "2025-01-24",
      status: "Ativo",
    },
    {
      id: 3,
      codigo: "3",
      categoria: "Aulas",
      descricao: "Avaliar a satisfação geral dos clientes",
      dataCriacao: "2025-01-24",
      status: "Inativo",
    },
    {
      id: 4,
      codigo: "4",
      categoria: "Geral",
      descricao: "Avaliar a satisfação geral dos clientes",
      dataCriacao: "2025-01-24",
      status: "Ativo",
    },
  ];

  useEffect(() => {
    setTitle("Consultar Questionários");
  }, [setTitle]);

  useEffect(() => {
    setQuestionnaires(mockQuestionnaires);
  }, []);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navigate = useNavigate();

  const handleEdit = (q) => {
    try {
      console.log('Navigating to edit:', `/editar-questionario/${q.id}`);
      // Force navigation to the edit page
      window.location.href = `/editar-questionario/${q.id}`;
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente excluir este questionário?")) {
      setQuestionnaires((prev) => prev.filter((q) => q.id !== id));
    }
  };

  const handleCreateNew = () => {
    try {
      console.log('Navigating to create new questionnaire');
      // Force navigation to the create page
      window.location.href = '/cadastrar-questionario';
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const filtered = questionnaires.filter(
    (q) =>
      q.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginated = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const totalQuestionnaires = questionnaires.length;
  const activeQuestionnaires = questionnaires.filter(
    (q) => q.status === "Ativo"
  ).length;
  const totalQuestions = 4; 

  const metricCards = [
    {
      title: "Total de Questionários",
      value: totalQuestionnaires,
      icon: PlaylistAddCheck,
    },
    {
      title: "Questionários Ativos",
      value: activeQuestionnaires,
      icon: BarChart,
    },
    {
      title: "Total de Perguntas",
      value: totalQuestions,
      icon: QuestionAnswer,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Cabeçalho */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "#000", mb: 0.5 }}
        >
          Meus Questionários
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gerencie os questionários de feedback criados para sua academia
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />

      {/* Seção dos Cards e Controles (Pesquisa e Botões) */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={9}>
          <Grid container spacing={2}>
            {metricCards.map((metric) => (
              <Grid item xs={12} sm={4} key={metric.title}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 1,
                    py: 1,
                  }}
                >
                  <CardContent>
                    <Box
                        sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between", // Espaçamento entre valor e título
                        mb: 0.5,
                      }}
                    >
                      {/* Ícone e Valor - Alinhados no lado esquerdo do CardContent */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mr: 2,
                        }}
                      >
                        <metric.icon
                          sx={{
                            fontSize: 28,
                            color: "#B25E09",
                            mr: 1,
                          }}
                        />
                        <Typography variant="h5" fontWeight={700}>
                          {metric.value}
                        </Typography>
                      </Box>
                      {/* Título */}
                      <Typography variant="body2" color="text.secondary" sx={{ml: 'auto'}}>
                        {metric.title}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Coluna dos Controles (Pesquisa e Botões) */}
        <Grid item xs={12} lg={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%", 
              justifyContent: "space-between",
            }}
          >
            {/* Botões Acima do Input de Pesquisa */}
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "space-between", lg: "flex-end" }, 
                mb: { xs: 2, lg: 1 },
                gap: 1, 
              }}
            >

              {/* Botão Novo Questionário */}
              <Button
                variant="contained"
                size="small"
                onClick={handleCreateNew}
                sx={{
                  backgroundColor: "#B25E09",
                  textTransform: "none",
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#914d07" },
                }}
                startIcon={<Add fontSize="small" />}
              >
                Novo Questionário
              </Button>
            </Box>

            {/* Input de Pesquisa */}
            <TextField
              placeholder="Título, descrição ou id..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>
      
      {/* Tabela de Questionários */}
      <Paper elevation={0} sx={{ border: "1px solid #e0e0e0" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Código</strong>
                </TableCell>
                <TableCell>
                  <strong>Categoria</strong>
                </TableCell>
                <TableCell>
                  <strong>Descrição</strong>
                </TableCell>
                <TableCell>
                  <strong>Criado em</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Ações</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((q) => (
                <TableRow key={q.id} hover>
                  <TableCell>{q.codigo}</TableCell>
                  <TableCell>{q.categoria}</TableCell>
                  <TableCell>{q.descricao}</TableCell>
                  <TableCell>
                    {new Date(q.dataCriacao).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={q.status}
                      size="small"
                      sx={{
                        backgroundColor:
                          q.status === "Ativo" ? "#E8F5E9" : "#F5F5F5",
                        color: q.status === "Ativo" ? "#2E7D32" : "#757575",
                        borderRadius: "6px",
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEdit(q)}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(q.id)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
        <TablePagination
          component="div"
          count={filtered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Rows per page:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count}`
          }
        />
      </Paper>
    </Box>
  );
};

export default QuestionnaireList;