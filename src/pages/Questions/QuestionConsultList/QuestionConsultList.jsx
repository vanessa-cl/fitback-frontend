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
  FormControlLabel,
  Switch,
} from "@mui/material";
import ViewIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../../utils/colors";
import { useState } from "react";
import QuestionDetailsDialog from "../QuestionDetailsDialog/QuestionDetailsDialog.jsx";
import QuestionDeactivateDialog from "../QuestionDeactivateDialog/QuestionDeactivateDialog.jsx";
import { SearchOff } from "@mui/icons-material";

const QuestionConsultList = ({
  questions,
  currentTab,
  setCurrentTab,
  categories,
  onEdit,
  handleConfirmDeactivate,
  searchName,
  setSearchName,
  searchType,
  setSearchType,
}) => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [openDeactivateDialog, setOpenDeactivateDialog] = useState(false);

  const handleViewQuestion = (question) => {
    setSelectedQuestion(question);
    setOpenDetailsDialog(true);
  };

  const handleDeactivateDialog = (question) => {
    setSelectedQuestion(question);
    setOpenDeactivateDialog(true);
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
                        <Box
                          sx={{ display: "flex", gap: 2, alignItems: "center" }}
                        >
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
                          <Chip
                            label={
                              question.status_pergunta === "ativo"
                                ? "Ativa"
                                : "Inativa"
                            }
                            size="small"
                            sx={{
                              backgroundColor:
                                question.status_pergunta === "ativo"
                                  ? "#E8F5E9"
                                  : "#F5F5F5",
                              color:
                                question.status_pergunta === "ativo"
                                  ? "#2E7D32"
                                  : "#b52222ff",
                              borderRadius: "6px",
                              fontWeight: 500,
                            }}
                          />
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={question.status_pergunta === "ativo"}
                              onChange={(e) => {
                                if (question.status_pergunta === "ativo") {
                                  handleDeactivateDialog(question, "inativo");
                                } else {
                                  handleConfirmDeactivate(question, "ativo");
                                }
                              }}
                              sx={{
                                "& .MuiSwitch-switchBase.Mui-checked": {
                                  color: PRIMARY_COLOR,
                                },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                  {
                                    backgroundColor: PRIMARY_COLOR,
                                  },
                              }}
                            />
                          }
                          sx={{ mr: 0, ml: 0, width: "100%" }}
                        />
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
      <QuestionDetailsDialog
        open={openDetailsDialog}
        onClose={() => setOpenDetailsDialog(false)}
        question={selectedQuestion}
      />
      <QuestionDeactivateDialog
        open={openDeactivateDialog}
        onClose={() => setOpenDeactivateDialog(false)}
        onConfirm={() => {
          handleConfirmDeactivate(selectedQuestion, "inativo");
        }}
        itemName={selectedQuestion?.conteudo}
        severity="error"
        selectedQuestion={selectedQuestion}
      />
    </Box>
  );
};

export default QuestionConsultList;
