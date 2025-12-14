import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePageTitle } from "../../../context/PageTitleContext.jsx";
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Chip,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  ArrowBack,
  KeyboardArrowUp,
  KeyboardArrowDown,
  Save,
} from "@mui/icons-material";
import questionarioService from "../../../services/questionarioService";
import { styles } from "./QuestionnaireOrder.styles";

const questionTypeLabel = {
  aberta: "Aberta",
  multipla_escolha: "Múltipla Escolha",
  escala: "Escala",
};

const QuestionnaireOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setTitle } = usePageTitle();
  const [questions, setQuestions] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";

    const sorted = [...questions].sort((a, b) => {
      if (key === "id") {
        return direction === "asc" ? a.id - b.id : b.id - a.id;
      }
      const av = (a[key] || "").toString();
      const bv = (b[key] || "").toString();
      return direction === "asc"
        ? av.localeCompare(bv, "pt", { sensitivity: "base" })
        : bv.localeCompare(av, "pt", { sensitivity: "base" });
    });

    const withOrder = sorted.map((p, idx) => ({ ...p, ordem: idx + 1 }));
    setQuestions(withOrder);
    setSortConfig({ key, direction });
  };

  const moveQuestion = (index, direction) => {
    const newPosition = index + direction;
    if (newPosition < 0 || newPosition >= questions.length) return;

    const move = (arr, from, to) => {
      const copy = arr.slice();
      const [item] = copy.splice(from, 1);
      copy.splice(to, 0, item);
      return copy.map((p, idx) => ({ ...p, ordem: idx + 1 }));
    };

    setQuestions((prev) => move(prev, index, newPosition));
  };

  const handleSave = async () => {
    if (!id) {
      setSnackbar({
        open: true,
        message: "ID do modelo não encontrado. Volte e tente novamente.",
        severity: "error",
      });
      return;
    }

    const payload = questions.map((p) => p.id_pergunta);

    await questionarioService
      .updateOrdemPerguntas(id, payload)
      .then((res) => {
        setSnackbar({
          open: true,
          message: "Questionário salvo com sucesso!",
          severity: "success",
        });
        setTimeout(() => {
          navigate("/consultar-questionario", { replace: true });
        }, 6000);
      })
      .catch((err) => {
        setSnackbar({
          open: true,
          message:
            err.response?.data?.error || "Erro ao salvar o questionário.",
          severity: "error",
        });
      });
  };

  useEffect(() => {
    setTitle("Ordenar Perguntas do Questionário");
  }, [setTitle]);

  const fetchQuestions = async () => {
    await questionarioService
      .getModelo(id)
      .then((res) => {
        setQuestions(res.data.perguntas);
      })
      .catch((err) => {
        setSnackbar({
          open: true,
          message:
            err.response?.data?.error || "Erro ao carregar as perguntas.",
          severity: "error",
        });
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  const content = (
    <Box sx={styles.container}>
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
        3 - Perguntas selecionadas em ordem de exibição, use as setas para
        alterar a ordem:
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={styles.tableHeaderRow}>
              <TableCell width="120">
                <strong>Código</strong>
                <IconButton
                  size="small"
                  onClick={() => handleSort("id")}
                  sx={{ ml: 1 }}
                >
                  <KeyboardArrowDown
                    sx={{
                      transform:
                        sortConfig.key === "id" &&
                        sortConfig.direction === "asc"
                          ? "rotate(180deg)"
                          : "none",
                    }}
                  />
                </IconButton>
              </TableCell>
              <TableCell>
                <strong>Categoria</strong>
                <IconButton
                  size="small"
                  onClick={() => handleSort("categoria")}
                  sx={{ ml: 1 }}
                >
                  <KeyboardArrowDown
                    sx={{
                      transform:
                        sortConfig.key === "categoria" &&
                        sortConfig.direction === "asc"
                          ? "rotate(180deg)"
                          : "none",
                    }}
                  />
                </IconButton>
              </TableCell>
              <TableCell>
                <strong>Tipo</strong>
                <IconButton
                  size="small"
                  onClick={() => handleSort("tipo")}
                  sx={{ ml: 1 }}
                >
                  <KeyboardArrowDown
                    sx={{
                      transform:
                        sortConfig.key === "tipo" &&
                        sortConfig.direction === "asc"
                          ? "rotate(180deg)"
                          : "none",
                    }}
                  />
                </IconButton>
              </TableCell>
              <TableCell>
                <strong>Pergunta</strong>
                <IconButton
                  size="small"
                  onClick={() => handleSort("conteudo")}
                  sx={{ ml: 1 }}
                >
                  <KeyboardArrowDown
                    sx={{
                      transform:
                        sortConfig.key === "conteudo" &&
                        sortConfig.direction === "asc"
                          ? "rotate(180deg)"
                          : "none",
                    }}
                  />
                </IconButton>
              </TableCell>
              <TableCell align="center" width="120">
                <strong>Ações</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((pergunta, index) => (
              <TableRow key={pergunta.id_pergunta} hover sx={styles.tableRow}>
                <TableCell>{pergunta.id_pergunta}</TableCell>
                <TableCell>{pergunta.nome_categoria}</TableCell>
                <TableCell>{questionTypeLabel[pergunta.tipo]}</TableCell>
                <TableCell>{pergunta.conteudo}</TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => moveQuestion(index, -1)}
                    disabled={index === 0}
                  >
                    <KeyboardArrowUp />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => moveQuestion(index, 1)}
                    disabled={index === questions.length - 1}
                  >
                    <KeyboardArrowDown />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={styles.backButton}
        >
          Voltar
        </Button>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleSave}
          sx={styles.saveButton}
        >
          Salvar Questionário
        </Button>
      </Box>
    </Box>
  );

  if (!questions.length) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">
          Por favor, selecione as perguntas primeiro.
        </Typography>
        <Button
          sx={{ mt: 2, color: "#B25E09", border: "1px solid #B25E09" }}
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
      </Box>
    );
  }

  return content;
};

export default QuestionnaireOrder;
