import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePageTitle } from "../../../context/PageTitleContext.jsx";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  IconButton,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";
import { ArrowBack, ArrowForward, Clear } from "@mui/icons-material";
import questionarioService from "../../../services/questionarioService";
import { styles } from "./RegisterQuestionnaire.styles";
import categoriaService from "../../../services/categoriaService.js";
import QuestionsList from "../QuestionsList/QuestionsList.jsx";
import perguntaService from "../../../services/perguntaService.js";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner.jsx";

const INITIAL_FORM_STATE = {
  nome: "",
  descricao: "",
  perguntasIds: [],
};

const RegisterQuestionnaire = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setTitle } = usePageTitle();
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [filters, setFilters] = useState({
    termo: "",
    categoria: "Todas",
    tipo: "Todas",
  });
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [helperText, setHelperText] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [loading, setLoading] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchQuestionsByFilters = async ({ termo, categoria, tipo }) => {
    setLoading(true);
    await perguntaService
      .getPerguntasPorFiltros({
        termo,
        categoria,
        tipo,
      })
      .then((res) => {
        setFilteredQuestions(res.data);
      })
      .catch((err) => {
        setFilteredQuestions([]);
        setSnackbar({
          open: true,
          message:
            err.response?.data?.error || "Erro ao carregar dados das perguntas",
          severity: "error",
        });
      })
      .finally(() => setLoading(false));
  };

  const fetchAllQuestions = async () => {
    setLoading(true);
    await perguntaService
      .getAllPerguntas()
      .then((res) => {
        setFilteredQuestions(res.data);
      })
      .catch((err) => {
        setFilteredQuestions([]);
        setSnackbar({
          open: true,
          message:
            err.response?.data?.error || "Erro ao carregar dados das perguntas",
          severity: "error",
        });
      })
      .finally(() => setLoading(false));
  };

  const fetchQuestionsFromQuestionnaire = async (id) => {
    setLoading(true);
    await questionarioService
      .getModelo(id)
      .then((res) => {
        const modelo = res.data || {};
        setForm((prev) => ({
          ...prev,
          nome: modelo.nome || "",
          descricao: modelo.descricao || "",
        }));
        const filtered = Array.from(
          new Map(
            [...modelo.perguntas, ...filteredQuestions].map((item) => [
              item.id,
              item,
            ])
          ).values()
        );
        setForm((prev) => ({
          ...prev,
          perguntasIds: modelo.perguntas.map((p) => p.id_pergunta) || [],
        }));
        setFilteredQuestions(filtered);
      })
      .catch((err) => {
        setFilteredQuestions([]);
        setSnackbar({
          open: true,
          message:
            err.response?.data?.error ||
            "Erro ao carregar dados do questionário",
          severity: "error",
        });
      })
      .finally(() => setLoading(false));
  };

  const fetchCategories = async () => {
    await categoriaService
      .getAllCategorias()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        setFilteredQuestions([]);
        setSnackbar({
          open: true,
          message:
            err.response?.data?.error ||
            "Erro ao carregar categorias de perguntas",
          severity: "error",
        });
      });
  };

  useEffect(() => {
    setTitle(id ? "Editar Questionário" : "Cadastrar Questionário");
  }, [setTitle, id]);

  useEffect(() => {
    fetchCategories();
    fetchAllQuestions();
  }, []);

  useEffect(() => {
    if (id) {
      fetchQuestionsFromQuestionnaire(id);
    } else if (
      filters.termo ||
      filters.categoria !== "Todas" ||
      filters.tipo !== "Todas"
    ) {
      fetchQuestionsByFilters(filters);
    }
  }, [id]);

  const toggleQuestion = (question) => {
    const exists = form.perguntasIds.find((p) => p === question.id_pergunta);
    if (exists) {
      setForm((prev) => ({
        ...prev,
        perguntasIds: prev.perguntasIds.filter(
          (p) => p !== question.id_pergunta
        ),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        perguntasIds: [...prev.perguntasIds, question.id_pergunta],
      }));
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    await questionarioService
      .createModelo({
        nome: form.nome,
        descricao: form.descricao,
        perguntasIds: form.perguntasIds,
      })
      .then((res) => {
        setSnackbar({
          open: true,
          message: "Questionário cadastrado com sucesso!",
          severity: "success",
        });
        const newId = res?.data?.id || null;
        setTimeout(() => {
          navigate(`/ordenar-questionario/${newId}`, { replace: true });
        }, 6000);
      })
      .catch((err) => {
        if (err.response?.data?.validationErrors) {
          return setHelperText(err.response?.data?.validationErrors);
        }
        setSnackbar({
          open: true,
          message: err.response.data.error || "Erro ao cadastrar questionário",
          severity: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    await questionarioService
      .updateModelo(id, {
        nome: form.nome,
        descricao: form.descricao,
        perguntasIds: form.perguntasIds,
      })
      .then((res) => {
        setSnackbar({
          open: true,
          message: "Questionário atualizado com sucesso!",
          severity: "success",
        });
        setTimeout(() => {
          navigate(`/ordenar-questionario/${id}`, { replace: true });
        }, 6000);
      })
      .catch((err) => {
        if (err.response?.data?.validationErrors) {
          return setHelperText(err.response?.data?.validationErrors);
        }
        setSnackbar({
          open: true,
          message: err.response.data.error || "Erro ao atualizar questionário",
          severity: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={styles.container}>
      {loading && <LoadingSpinner />}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Typography variant="h6" sx={styles.sectionTitle}>
        1 - Preencha os dados do questionário:
      </Typography>
      <Box sx={styles.formSection}>
        <TextField
          label="Título"
          value={form.nome}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, nome: e.target.value }))
          }
          fullWidth
          required
          sx={{ mb: 2 }}
          error={!!helperText.nome}
          helperText={helperText.nome}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setForm((prev) => ({ ...prev, nome: "" }))}
                  >
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
            },
            htmlInput: {
              minLength: 3,
              maxLength: 100,
            },
          }}
        />
        <TextField
          label="Descrição"
          value={form.descricao}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, descricao: e.target.value }))
          }
          multiline
          rows={3}
          fullWidth
          required
          error={!!helperText.descricao}
          helperText={helperText.descricao}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setForm((prev) => ({ ...prev, descricao: "" }))
                    }
                  >
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
            },
            htmlInput: {
              minLength: 10,
              maxLength: 255,
            },
          }}
        />
      </Box>

      <Typography variant="h6" sx={styles.sectionTitle}>
        2 - Selecione as perguntas que farão parte do questionário:
      </Typography>
      <Box sx={styles.filterSection}>
        <Grid container spacing={2}>
          <Box
            sx={{
              width: "100%",
              mb: 1,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <TextField
              label="Buscar por conteúdo"
              value={filters.termo}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, termo: e.target.value }));
                fetchQuestionsByFilters({ termo: e.target.value });
              }}
              sx={{ width: "60%" }}
              fullWidth
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setFilters((prev) => ({ ...prev, termo: "" }));
                          fetchAllQuestions();
                        }}
                      >
                        <Clear />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
                htmlInput: {
                  minLength: 3,
                  maxLength: 100,
                },
              }}
            />
            <FormControl fullWidth sx={{ width: "30%" }}>
              <InputLabel>Categoria</InputLabel>
              <Select
                value={filters.categoria}
                label="Categoria"
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    categoria: e.target.value,
                  }));
                  fetchQuestionsByFilters({ categoria: e.target.value });
                }}
              >
                <MenuItem value="Todas">Todas</MenuItem>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <MenuItem key={item.id_categoria} value={item.id_categoria}>
                      {item.nome}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ width: "30%" }}>
              <InputLabel>Tipo de Pergunta</InputLabel>
              <Select
                value={filters.tipo}
                label="Tipo de Pergunta"
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    tipo: e.target.value,
                  }));
                  fetchQuestionsByFilters({ tipo: e.target.value });
                }}
              >
                <MenuItem value="Todas">Todas</MenuItem>
                <MenuItem value="aberta">Aberta</MenuItem>
                <MenuItem value="multipla_escolha">Múltipla Escolha</MenuItem>
                <MenuItem value="escala">Escala</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Box>
      <FormControl fullWidth error={!!helperText.perguntasIds}>
        <QuestionsList
          filteredQuestions={filteredQuestions}
          page={page}
          rowsPerPage={rowsPerPage}
          form={form}
          toggleQuestion={toggleQuestion}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
        {helperText.perguntasIds && (
          <FormHelperText>{helperText.perguntasIds}</FormHelperText>
        )}
      </FormControl>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, gap: 2 }}>
        <Button
          id="back-button"
          name="back-button"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/consultar-questionario")}
          sx={styles.backButton}
        >
          Voltar
        </Button>
        <Button
          id="next-button"
          name="next-button"
          variant="contained"
          endIcon={<ArrowForward />}
          onClick={id ? handleUpdate : handleAdd}
          sx={styles.nextButton}
        >
          Próxima Etapa
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterQuestionnaire;
