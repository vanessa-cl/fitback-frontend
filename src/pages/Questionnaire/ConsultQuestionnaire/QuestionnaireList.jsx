import { useState, useEffect, use } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Search,
  PlaylistAddCheck,
  BarChart,
  QuestionAnswer,
  Warning as WarningIcon,
} from "@mui/icons-material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { usePageTitle } from "../../../context/PageTitleContext.jsx";
import questionarioService from "../../../services/questionarioService.js";

// Componente Modal de Exclusão
const ModalDeleteQuestionnaire = ({
  open,
  onClose,
  onConfirm,
  title = "Confirmar Exclusão",
  message = "Tem certeza que deseja excluir este questionário?",
  confirmText = "Excluir",
  cancelText = "Cancelar",
  itemName = "",
  severity = "warning",
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="confirmation-dialog-title" sx={{ pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningIcon color="warning" />
          <Typography variant="h6" component="span" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Alert severity={severity} sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: "medium" }}>
            {message}
          </Typography>
        </Alert>

        {itemName && (
          <Box
            sx={{
              p: 2,
              bgcolor: "grey.50",
              borderRadius: 1,
              border: "1px solid",
              borderColor: "grey.300",
              mt: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontStyle: "italic",
                color: "text.secondary",
                textAlign: "center",
              }}
            >
              "{itemName}"
            </Typography>
          </Box>
        )}

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 2, textAlign: "center" }}
        >
          Esta ação não pode ser desfeita.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          size="large"
          sx={{ flex: 1 }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="error"
          size="large"
          startIcon={<Delete />}
          sx={{ flex: 1 }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const QuestionnaireList = () => {
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
        console.error("Erro ao buscar questionários:", err);
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
      console.log("Navigating to edit:", `/editar-questionario/${q.id_modelo}`);
      navigate(`/editar-questionario/${q.id_modelo}`, {
        state: { questionnaire: q },
      });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const handleDeleteClick = (questionnaire) => {
    setSelectedQuestionnaire(questionnaire);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedQuestionnaire) {
      questionarioService
        .deleteModelo(selectedQuestionnaire.id_modelo)
        .then(() => {
          consultQuestionnaires();
          setSelectedQuestionnaire(null);
          setDeleteModalOpen(false);
          showSnackbar("Questionário deletado com sucesso.", "success");
        })
        .catch((err) => {
          console.error("Erro ao deletar questionário:", err);
          showSnackbar("Erro ao deletar questionário.", "error");
        });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setSelectedQuestionnaire(null);
  };

  const handleCreateNew = () => {
    try {
      console.log("Navigating to create new questionnaire");
      navigate("/cadastrar-questionario");
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  // const filtered = questionnaires.filter(
  //   (q) =>
  //     // q.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     // q.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     // q.descricao.toLowerCase().includes(searchTerm.toLowerCase())}
  // );

  // const paginated = filtered.slice(
  //   page * rowsPerPage,
  //   page * rowsPerPage + rowsPerPage
  // );
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
          console.error("Erro ao buscar questionários:", err);
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
    (q) => q.status === "Ativo"
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
      <ModalDeleteQuestionnaire
        open={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemName={
          selectedQuestionnaire
            ? `Questionário ${selectedQuestionnaire.id_modelo} - ${selectedQuestionnaire.nome}`
            : ""
        }
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
                              : "#757575",
                          borderRadius: "6px",
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                          onClick={() => handleDeleteClick(q)}
                        >
                          <Delete fontSize="small" />
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

export default QuestionnaireList;
