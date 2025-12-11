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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  Grid,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ViewIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../utils/colors";
import { useState } from "react";
import QuestionDetailsDialog from "./QuestionDetailsDialog";
import QuestionDeleteDialog from "./QuestionDeleteDialog";
import { SearchOff } from "@mui/icons-material";

const QuestionConsultList = ({
  questions,
  setCurrentQuestion,
  currentTab,
  setCurrentTab,
  categories,
  onEdit,
  onDelete,
  searchName,
  setSearchName,
  searchType,
  setSearchType,
}) => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleViewQuestion = (question) => {
    setSelectedQuestion(question);
    setOpenDetailsDialog(true);
  };

  const handleDeleteQuestion = (question) => {
    setSelectedQuestion(question);
    setOpenDeleteDialog(true);
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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
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
          <Box
            sx={{
              width: "32%",
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
            }}
          >
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
                  value={searchName}
                  onChange={(e) => {
                    setSearchName(e.target.value);
                  }}
                  sx={{ width: "55%" }}
                  fullWidth
                />
                <FormControl fullWidth sx={{ width: "40%" }}>
                  <InputLabel>Tipo de Pergunta</InputLabel>
                  <Select
                    value={searchType}
                    label="Tipo de Pergunta"
                    onChange={(e) => {
                      setSearchType(e.target.value);
                    }}
                  >
                    <MenuItem value="Todas">Todas</MenuItem>
                    <MenuItem value="aberta">Aberta</MenuItem>
                    <MenuItem value="multipla_escolha">
                      Múltipla Escolha
                    </MenuItem>
                    <MenuItem value="escala">Escala</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Box>
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
          <Box sx={{ textAlign: "center", py: 6 }}>
            <SearchOff sx={{ fontSize: 56, color: "#ccc" }} />
            <Typography variant="h6" color="textSecondary">
              Nenhuma pergunta encontrada
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Clique em + Nova Pergunta e adicione sua primeira pergunta no
              formulário.
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
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start", 
                          gap: 1,
                          width: "100%",
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
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "0.8rem",
                            flex: 1,
                            color: PRIMARY_COLOR,
                          }}
                        >
                          {question.categoria || question.categoria_nome}
                        </Typography>
                      </Box>
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
                          onClick={() => onEdit(question)}
                          sx={{ color: SECONDARY_COLOR }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteQuestion(question)}
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
      {/* Modal de Confirmação para Excluir */}
      <QuestionDeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => {
          onDelete(selectedQuestion.id_pergunta);
        }}
        title="Excluir Pergunta"
        message="Tem certeza que deseja excluir esta pergunta?"
        confirmText="Excluir Pergunta"
        cancelText="Manter Pergunta"
        itemName={selectedQuestion?.conteudo}
        severity="error"
      />
    </Box>
  );
};

export default QuestionConsultList;
