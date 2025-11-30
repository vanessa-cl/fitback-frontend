import { useState, useEffect } from "react";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { usePageTitle } from "../../context/PageTitleContext";
import categoriaService from "../../services/categoriaService";
import perguntaService from "../../services/perguntaService";
import QuestionFormDialog from "./QuestionFormDialog";
import QuestionConsultList from "./QuestionConsultList";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

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
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [openQuestionForm, setOpenQuestionForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Gerenciador de Perguntas");
  }, [setTitle]);

  const fetchCategories = async () => {
    categoriaService
      .getAllCategorias()
      .then((res) => {
        console.log("Categorias carregadas:", res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Erro ao carregar categorias:", err);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchQuestions = () => {
    perguntaService
      .getAllPerguntas()
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data);
      })
      .catch((err) => {
        console.error("Erro ao carregar perguntas:", err);
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestionsByCategory = (categoryId) => {
    perguntaService
      .searchPerguntasPorCategoria(categoryId)
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data);
      })
      .catch((err) => {
        console.error("Erro ao carregar perguntas por categoria:", err);
      });
  };

  useEffect(() => {
    if (currentTab === 0) {
      fetchQuestions();
    } else {
      fetchQuestionsByCategory(currentTab);
    }
  }, [currentTab]);

  const handleAddQuestion = () => {
    perguntaService
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
        fetchQuestions();
        resetForm();
        showSnackbar("Pergunta adicionada com sucesso!", "success");
      })
      .catch((err) => {
        console.error("Erro ao adicionar pergunta:", err);
        showSnackbar("Erro ao adicionar pergunta", "error");
      });
  };

  const handleUpdateQuestion = () => {
    perguntaService
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
        fetchQuestions();
        resetForm();
        showSnackbar("Pergunta atualizada com sucesso!", "success");
      })
      .catch((err) => {
        console.error("Erro ao atualizar pergunta:", err);
        showSnackbar("Erro ao atualizar pergunta", "error");
      });
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
        {/* Formulário de Adição/Edição */}
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
        />
        {/*  Consulta de Perguntas */}
        {questions.length > 0 ? (
          <QuestionConsultList
            questions={questions}
            setCurrentQuestion={setCurrentQuestion}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            categories={categories}
            onEdit={handleEditQuestion}
            // onView={handleViewQuestion}
            // onDelete={handleDeleteQuestion}
          />
        ) : (
          <LoadingSpinner />
        )}
      </Box>

      {/* Snackbar for notifications */}
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
    </Box>
  );
};

export default QuestionManagement;
