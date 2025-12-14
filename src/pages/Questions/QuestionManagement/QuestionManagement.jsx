import { useState, useEffect } from "react";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { usePageTitle } from "../../../context/PageTitleContext";
import categoriaService from "../../../services/categoriaService";
import perguntaService from "../../../services/perguntaService";
import QuestionFormDialog from "../QuestionFormDialog/QuestionFormDialog.jsx";
import QuestionConsultList from "../QuestionConsultList/QuestionConsultList.jsx";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import questionarioService from "../../../services/questionarioService";

const INITIAL_QUESTION_STATE = {
  id_categoria: "",
  tipo: "",
  ordem_exibicao: "1",
  conteudo: "",
  permite_multiplas: false,
  obrigatoria: false,
  opcoes: [],
};

const QuestionManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(
    INITIAL_QUESTION_STATE
  );
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [currentTab, setCurrentTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [openQuestionForm, setOpenQuestionForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const { setTitle } = usePageTitle();
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("Todas");
  const [helperText, setHelperText] = useState({});

  useEffect(() => {
    setTitle("Gerenciador de Perguntas");
  }, [setTitle]);

  const fetchCategories = async () => {
    categoriaService
      .getAllCategorias()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        showSnackbar(
          err.response?.data?.error || "Erro ao buscar categorias.",
          "error"
        );
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    await perguntaService
      .getAllPerguntas()
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        showSnackbar(
          err.response?.data?.error || "Erro ao carregar perguntas.",
          "error"
        );
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestionsByFilters = async (filters) => {
    await perguntaService
      .getPerguntasPorFiltros(filters)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        showSnackbar(
          err.response?.data?.error || "Erro ao buscar perguntas.",
          "error"
        );
      });
  };

  useEffect(() => {
    if (currentTab === 0) {
      fetchQuestions();
    } else {
      fetchQuestionsByFilters({ categoria: currentTab, tipo: searchType });
    }
  }, [currentTab, searchType]);

  useEffect(() => {
    fetchQuestionsByFilters({ termo: searchName, tipo: searchType });
  }, [searchName, searchType]);

  const handleAddQuestion = async () => {
    setLoading(true);
    setHelperText({});
    await perguntaService
      .createPergunta({
        id_categoria: currentQuestion.id_categoria,
        tipo: currentQuestion.tipo,
        ordem_exibicao: currentQuestion.ordem_exibicao,
        conteudo: currentQuestion.conteudo,
        permite_multiplas: currentQuestion.permite_multiplas,
        obrigatoria: currentQuestion.obrigatoria,
        opcoes: currentQuestion.opcoes,
      })
      .then(() => {
        showSnackbar("Pergunta adicionada com sucesso!", "success");
        resetForm();
        setTimeout(() => {
          fetchQuestions();
          setOpenQuestionForm(false);
        }, 6000);
      })
      .catch((err) => {
        if (err.response?.data?.validationErrors) {
          return setHelperText(err.response?.data?.validationErrors);
        }
        showSnackbar(
          err.response?.data?.error || "Erro ao adicionar pergunta",
          "error"
        );
      })
      .finally(() => setLoading(false));
  };

  const handleUpdateQuestion = async () => {
    setLoading(true);
    await perguntaService
      .updatePergunta(currentQuestion.id_pergunta, {
        id_categoria: currentQuestion.id_categoria,
        tipo: currentQuestion.tipo,
        ordem_exibicao: currentQuestion.ordem_exibicao,
        conteudo: currentQuestion.conteudo,
        permite_multiplas: currentQuestion.permite_multiplas,
        obrigatoria: currentQuestion.obrigatoria,
        opcoes: currentQuestion.opcoes,
      })
      .then(() => {
        showSnackbar("Pergunta atualizada com sucesso!", "success");
        setTimeout(() => {
          resetForm();
          fetchQuestions();
          setOpenQuestionForm(false);
        }, 6000);
      })
      .catch((err) => {
        if (err.response?.data?.validationErrors) {
          return setHelperText(err.response?.data?.validationErrors);
        }
        showSnackbar(
          err.response?.data?.error || "Erro ao atualizar pergunta",
          "error"
        );
      })
      .finally(() => setLoading(false));
  };

  const handleConfirmDeactivate = async (question, newStatus) => {
    setLoading(true);
    await perguntaService
      .updatePergunta(question.id_pergunta, {
        ...question,
        status_pergunta: newStatus,
      })
      .then(() => {
        setCurrentTab(0);
        setSearchName("");
        setSearchType("Todas");
        fetchQuestions();
        showSnackbar(
          `Pergunta ${
            newStatus === "ativo" ? "ativada" : "inativada"
          } com sucesso!`,
          "success"
        );
      })
      .catch((err) => {
        showSnackbar(
          err.response?.data?.error || "Erro ao atualizar status da pergunta",
          "error"
        );
      })
      .finally(() => setLoading(false));
  };

  const handleEditQuestion = (question) => {
    setCurrentQuestion({ ...question });
    setIsEditing(true);
    setOpenQuestionForm(true);
  };

  const resetForm = () => {
    setCurrentQuestion(INITIAL_QUESTION_STATE);
    setIsEditing(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        width: "100%",
        margin: "0 auto",
      }}
    >
      {loading && <LoadingSpinner />}
      <Box
        sx={{
          p: 1,
          mb: 4,
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "text.secondary", fontSize: "1.1rem" }}
        >
          Gerencie e crie perguntas para os questionários
        </Typography>
        <Button
          sx={{ width: "260px" }}
          variant="contained"
          onClick={() => setOpenQuestionForm(true)}
        >
          <AddIcon />
          Adicionar Pergunta
        </Button>
      </Box>
      <Box
        container
        spacing={4}
        sx={{ display: "flex", gap: 4, height: "100%" }}
      >
        <QuestionFormDialog
          open={openQuestionForm}
          onClose={() => setOpenQuestionForm(false)}
          categories={categories}
          isEditing={isEditing}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          resetForm={resetForm}
          onAdd={handleAddQuestion}
          onUpdate={handleUpdateQuestion}
          helperText={helperText}
        />
        <QuestionConsultList
          questions={questions}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          categories={categories}
          onEdit={handleEditQuestion}
          handleConfirmDeactivate={handleConfirmDeactivate}
          searchName={searchName}
          setSearchName={setSearchName}
          searchType={searchType}
          setSearchType={setSearchType}
        />
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default QuestionManagement;
