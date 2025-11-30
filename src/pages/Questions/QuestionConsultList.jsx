import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  Chip,
  Divider,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ViewIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../utils/colors";
import { useState } from "react";
import QuestionDetailsDialog from "./QuestionDetailsDialog";

const QuestionConsultList = ({
  questions,
  setCurrentQuestion,
  currentTab,
  setCurrentTab,
  categories,
  onEdit,
  onView,
  onDelete,
}) => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

   const handleViewQuestion = (question) => {
    setSelectedQuestion(question);
    setViewDialogOpen(true);
  };

  const handleDeleteQuestion = (question) => {
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

  return (
    <Box sx={{ minHeight: "600px", width: "100%" }}>
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
            <FitnessCenterIcon sx={{ fontSize: 64, color: "#ccc", mb: 2 }} />
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
      {/* Modal de Detalhes da Pergunta */}
      <QuestionDetailsDialog
        open={openDetailsDialog}
        onClose={() => setOpenDetailsDialog(false)}
        question={selectedQuestion}
      />
      {/* Componente de Confirmação para Excluir */}
      {/* <ModalDeleteQuestion
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Excluir Pergunta"
        message="Tem certeza que deseja excluir esta pergunta?"
        confirmText="Excluir Pergunta"
        cancelText="Manter Pergunta"
        itemName={questionToDelete?.text}
        severity="error"
      /> */}
    </Box>
  );
};

export default QuestionConsultList;
