import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
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
  Alert,
  Snackbar,
  Switch,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Search,
  PlaylistAddCheck,
  BarChart,
} from "@mui/icons-material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { usePageTitle } from "../../../context/PageTitleContext.jsx";
import questionarioService from "../../../services/questionarioService.js";
import DeactivateQuestionnaire from "../DeactivateQuestionnaire/DeactivateQuestionnaire.jsx";

const ConsultQuestionnaire = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [questionnaires, setQuestionnaires] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);
  const { setTitle } = usePageTitle();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const consultQuestionnaires = async () => {
    await questionarioService
      .getAllQuestionarios()
      .then((res) => {
        setQuestionnaires(res.data);
      })
      .catch((err) => {
        showSnackbar(
          err.response?.data?.error || "Erro ao buscar questionários.",
          "error"
        );
      });
  };

  useEffect(() => {
    setTitle("Consultar Questionários");
  }, [setTitle]);

  useEffect(() => {
    consultQuestionnaires();
  }, []);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (q) => {
    try {
      navigate(`/editar-questionario/${q.id_modelo}`, {
        state: { questionnaire: q },
      });
    } catch (error) {
      showSnackbar("Erro ao navegar para a edição.", "error");
    }
  };

  const handleDeleteClick = (questionnaire) => {
    setSelectedQuestionnaire(questionnaire);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = (selectedQuestionnaire, newStatus) => {
    if (selectedQuestionnaire) {
      questionarioService
        .updateModelo(selectedQuestionnaire.id_modelo, {
          ...selectedQuestionnaire,
          status_questionario: newStatus,
          perguntasIds: selectedQuestionnaire.perguntas.map(
            (p) => p.id_pergunta
          ),
        })
        .then(() => {
          consultQuestionnaires();
          setSelectedQuestionnaire(null);
          setDeleteModalOpen(false);
          showSnackbar(
            `Questionário ${
              newStatus === "inativo" ? "inativado" : "ativado"
            } com sucesso.`,
            "success"
          );
        })
        .catch((err) => {
          showSnackbar(
            err.response?.data?.error || "Erro ao atualizar questionário.",
            "error"
          );
        });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setSelectedQuestionnaire(null);
  };

  const handleCreateNew = () => {
    try {
      navigate("/cadastrar-questionario");
    } catch (error) {
      showSnackbar("Erro ao navegar para o cadastro.", "error");
    }
  };

  const fetchFilteredQuestionnaires = async () => {
    if (searchTerm.trim() === "") {
      consultQuestionnaires();
    } else {
      await questionarioService
        .getModelosByQuery(searchTerm)
        .then((res) => {
          setQuestionnaires(res.data);
        })
        .catch((err) => {
          showSnackbar(
            err.response?.data?.error || "Erro ao buscar questionários.",
            "error"
          );
        });
    }
  };

  useEffect(() => {
    fetchFilteredQuestionnaires();
  }, [searchTerm]);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const totalQuestionnaires = questionnaires.length;
  const activeQuestionnaires = questionnaires.filter(
    (q) => q.status_questionario === "ativo"
  ).length;

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
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <DeactivateQuestionnaire
        open={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemName={
          selectedQuestionnaire
            ? `Questionário ${selectedQuestionnaire.id_modelo} - ${selectedQuestionnaire.nome}`
            : ""
        }
        selectedQuestionnaire={selectedQuestionnaire}
      />
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
      <Box sx={{ mb: 3 }}>
        <Grid item xs={12} lg={9}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ width: "42%", display: "flex", gap: 2 }}>
              {metricCards.map((metric) => (
                <Box key={metric.title}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      boxShadow: 1,
                      py: 1,
                      minWidth: "200px",
                      pb: 0,
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 0.5,
                        }}
                      >
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
                          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            {metric.value}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: "auto", fontWeight: 500 }}
                        >
                          {metric.title}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
            <Box
              component="form"
              onSubmit={handleSearchSubmit}
              sx={{
                display: "flex",
                justifyContent: { xs: "space-between", lg: "flex-end" },
                alignItems: "center",
                mb: { xs: 2, lg: 1 },
                gap: 2,
                width: "78%",
              }}
            >
              <TextField
                placeholder="Busque por título, descrição ou id..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                size="medium"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: "78%" }}
              />
              <Button
                variant="contained"
                size="small"
                onClick={handleCreateNew}
                sx={{
                  backgroundColor: "#B25E09",
                  textTransform: "none",
                  borderRadius: "8px",
                  minWidth: "220px",
                  maxWidth: "250px",
                  "&:hover": { backgroundColor: "#914d07" },
                }}
                startIcon={<Add fontSize="small" />}
              >
                Novo Questionário
              </Button>
            </Box>
          </Box>
        </Grid>
      </Box>
      {questionnaires.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <SearchOffIcon sx={{ fontSize: 56, color: "#ccc" }} />
          <Typography variant="h6" color="textSecondary">
            Nenhum questionário encontrado.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Clique em + Novo Questionário e adicione seu primeiro questionário
            no formulário.
          </Typography>
        </Box>
      ) : (
        <Paper elevation={0} sx={{ border: "1px solid #e0e0e0" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Código</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Título</strong>
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
                {questionnaires.map((q) => (
                  <TableRow key={q.id_modelo} hover>
                    <TableCell>{q.id_modelo}</TableCell>
                    <TableCell>{q.nome}</TableCell>
                    <TableCell>{q.descricao}</TableCell>
                    <TableCell>
                      {new Date(q.data_criacao).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={q.status_questionario}
                        size="small"
                        sx={{
                          backgroundColor:
                            q.status_questionario === "ativo"
                              ? "#E8F5E9"
                              : "#F5F5F5",
                          color:
                            q.status_questionario === "ativo"
                              ? "#2E7D32"
                              : "#b52222ff",
                          borderRadius: "6px",
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Switch
                          checked={q.status_questionario === "ativo"}
                          onChange={() => {
                            if (q.status_questionario === "ativo") {
                              handleDeleteClick(q);
                            } else if (q.status_questionario === "inativo") {
                              handleDeleteConfirm(q, "ativo");
                            }
                          }}
                          color="primary"
                        />
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEdit(q)}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider />
          <TablePagination
            component="div"
            count={questionnaires.length}
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
      )}
    </Box>
  );
};

export default ConsultQuestionnaire;
