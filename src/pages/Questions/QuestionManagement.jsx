import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  IconButton,
  Divider,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  FitnessCenter as FitnessCenterIcon,
} from "@mui/icons-material";
import ModalDeleteQuestion from "../../components/Modal/ModalDeleteQuestion";
import { usePageTitle } from "../../context/PageTitleContext";
import categoriaService from "../../services/categoriaService";
import perguntaService from "../../services/perguntaService";
import QuestionForm from "./QuestionFormDialog";

const PRIMARY_COLOR = "#B25E09";
const DARK_PRIMARY = "#914d07";
const LIGHT_BG = "#f5f5f5";
const SECONDARY_COLOR = "#424242";

const QuestionManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    id_categoria: "",
    tipo: "",
    ordem_exibicao: "",
    conteudo: "",
    permite_multiplas: false,
    obrigatoria: false,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Gerenciador de Perguntas");
  }, [setTitle]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [openQuestionForm, setOpenQuestionForm] = useState(false);
  const [categories, setCategories] = useState([]);

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
    if (!currentQuestion.text.trim()) {
      showSnackbar("Por favor, digite a pergunta", "error");
      return;
    }

    const newQuestion = {
      id: Date.now(),
      text: currentQuestion.text,
      type: currentQuestion.type,
      isDescriptive: currentQuestion.isDescriptive,
      createdAt: new Date().toISOString(),
    };

    const updatedQuestions = [...questions, newQuestion];
    saveQuestions(updatedQuestions);
    resetForm();
    showSnackbar("Pergunta adicionada com sucesso!", "success");
  };

  const handleUpdateQuestion = () => {
    if (!currentQuestion.text.trim()) {
      showSnackbar("Por favor, digite a pergunta", "error");
      return;
    }

    const updatedQuestions = questions.map((q) =>
      q.id === currentQuestion.id
        ? { ...currentQuestion, updatedAt: new Date().toISOString() }
        : q
    );

    saveQuestions(updatedQuestions);
    resetForm();
    showSnackbar("Pergunta atualizada com sucesso!", "success");
  };

  const handleEditQuestion = (question) => {
    setCurrentQuestion({ ...question });
    setIsEditing(true);
    setOpenQuestionForm(true);
  };

  const handleViewQuestion = (question) => {
    setSelectedQuestion(question);
    setViewDialogOpen(true);
  };

  const handleDeleteClick = (question) => {
    setQuestionToDelete(question);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (questionToDelete) {
      const updatedQuestions = questions.filter(
        (q) => q.id !== questionToDelete.id
      );
      saveQuestions(updatedQuestions);
      showSnackbar("Pergunta removida com sucesso!", "info");
      setQuestionToDelete(null);
    }
  };

  const resetForm = () => {
    setCurrentQuestion({
      id: null,
      text: "",
      type: "estrutura",
      isDescriptive: false,
    });
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
        <QuestionForm
          open={openQuestionForm}
          onClose={() => setOpenQuestionForm(false)}
          categories={categories}
          isEditing={isEditing}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />
        {/*  Consulta de Perguntas */}
        <Box sx={{ flex: "0 0 55.3333%", minHeight: "600px" }}>
          <Paper elevation={3} sx={{ p: 3, width: "100%" }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                mb: 3,
                width: "100%",
              }}
            >
              <Tabs
                value={currentTab}
                onChange={(e, newValue) => setCurrentTab(newValue)}
              >
                <Tab
                  label="Todas"
                  value={0}
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                />
                {categories.map((category, index) => (
                  <Tab
                    key={category.id_categoria}
                    label={category.nome}
                    value={category.id_categoria}
                    sx={{ textTransform: "none", fontWeight: "bold" }}
                  />
                ))}
              </Tabs>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                width: "100%",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: SECONDARY_COLOR }}
              >
                Perguntas Cadastradas
              </Typography>
              <Chip
                label={`${questions.length} pergunta(s)`}
                sx={{
                  bgcolor: PRIMARY_COLOR,
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            </Box>

            <Divider sx={{ mb: 3 }} />

            {questions.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <FitnessCenterIcon
                  sx={{ fontSize: 64, color: "#ccc", mb: 2 }}
                />
                <Typography variant="h6" color="textSecondary">
                  Sem resultados
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {currentTab === 0
                    ? "Comece adicionando sua primeira pergunta!"
                    : `Nenhuma pergunta da categoria selecionada encontrada.`}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ maxHeight: 600, overflow: "auto" }}>
                {questions.map((question) => {
                  return (
                    <Card
                      key={question.id}
                      sx={{ mb: 2, borderLeft: `4px solid ${PRIMARY_COLOR}` }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            mb: 1,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "1rem",
                              flex: 1,
                              color: SECONDARY_COLOR,
                            }}
                          >
                            {question.conteudo}
                          </Typography>
                          <Box sx={{ display: "flex", gap: 0.5 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleViewQuestion(question)}
                              sx={{ color: PRIMARY_COLOR }}
                            >
                              <ViewIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleEditQuestion(question)}
                              sx={{ color: SECONDARY_COLOR }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteClick(question)}
                              sx={{ color: "#d32f2f" }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            flexWrap: "wrap",
                            mt: 1,
                          }}
                        >
                          {question.createdAt && (
                            <Chip
                              label={new Date(
                                question.createdAt
                              ).toLocaleDateString("pt-BR")}
                              size="small"
                              variant="outlined"
                              sx={{
                                borderColor: "#ccc",
                                color: "#666",
                                fontSize: "0.7rem",
                              }}
                            />
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
            )}
          </Paper>
        </Box>
      </Box>
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Detalhes da Pergunta
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedQuestion && (
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="body1"
                sx={{ mb: 3, p: 2, bgcolor: LIGHT_BG, borderRadius: 1 }}
              >
                {selectedQuestion.conteudo}
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Tipo:
                  </Typography>
                  <Chip
                    label={selectedQuestion.tipo}
                    size="small"
                    sx={{ mt: 0.5 }}
                  />
                </Box>
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Categoria:
                  </Typography>
                  <Typography variant="body2">
                    {selectedQuestion.categoria_nome}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Obrigatória:
                  </Typography>
                  <Typography variant="body2">
                    {selectedQuestion.obrigatoria ? "Sim" : "Não"}
                  </Typography>
                </Box>
                {selectedQuestion.tipo === "multipla_escolha" ? (
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      Permite Múltiplas Respostas:
                    </Typography>
                    <Typography variant="body2">
                      {selectedQuestion.permite_multiplas ? "Sim" : "Não"}
                    </Typography>
                  </Box>
                ) : (
                  <></>
                )}
                {selectedQuestion.tipo === "multipla_escolha" ? (
                  <Box>
                    {selectedQuestion.opcoes &&
                    selectedQuestion.opcoes.length > 0 ? (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                          Opções:
                        </Typography>
                        <ul>
                          {selectedQuestion.opcoes.map((opcao, index) => (
                            <li key={index}>
                              <Typography variant="body1">
                                {opcao.texto}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </Box>
                    ) : (
                      <Typography variant="body1" sx={{ mt: 2 }}>
                        Nenhuma opção disponível.
                      </Typography>
                    )}
                  </Box>
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>

      {/* Componente de Confirmação para Excluir */}
      <ModalDeleteQuestion
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Excluir Pergunta"
        message="Tem certeza que deseja excluir esta pergunta?"
        confirmText="Excluir Pergunta"
        cancelText="Manter Pergunta"
        itemName={questionToDelete?.text}
        severity="error"
      />

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
