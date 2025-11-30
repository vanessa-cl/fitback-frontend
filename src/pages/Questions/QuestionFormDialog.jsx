import {
  Switch,
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  Dialog,
} from "@mui/material";
import { useState, useEffect } from "react";
import SubjectIcon from "@mui/icons-material/Subject";
import ListIcon from "@mui/icons-material/List";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import QuestionsOptions from "./QuestionsOptions";

const PRIMARY_COLOR = "#B25E09";
const DARK_PRIMARY = "#914d07";
const LIGHT_BG = "#f5f5f5";
const SECONDARY_COLOR = "#424242";

const questionTypes = [
  { value: "aberta", label: "Aberta" },
  { value: "multipla_escolha", label: "Múltipla Escolha" },
  { value: "escala", label: "Escala (1 a 5)" },
];

const QuestionForm = ({
  open,
  onClose,
  categories,
  isEditing,
  currentQuestion,
  setCurrentQuestion,
}) => {

  

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box sx={{ flex: "0 0 41.6667%", p: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            position: "relative",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", color: SECONDARY_COLOR }}
          >
            {isEditing ? "Editar Pergunta" : "Nova Pergunta"}
          </Typography>
          <CloseIcon
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              cursor: "pointer",
              color: SECONDARY_COLOR,
              marginBottom: "8.4px",
            }}
          />
        </Box>
        <Box
          component="form"
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ gap: 2, mb: 4, display: "flex", flexDirection: "column" }}>
            <TextField
              fullWidth
              label="Digite a pergunta"
              value={currentQuestion.conteudo}
              onChange={(e) =>
                setCurrentQuestion({
                  ...currentQuestion,
                  conteudo: e.target.value,
                })
              }
              multiline
              rows={3}
              placeholder="Ex: Como você avalia o estado dos equipamentos?"
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Categoria</InputLabel>
                <Select
                  value={currentQuestion.id_categoria}
                  label="Categoria"
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      id_categoria: e.target.value,
                    })
                  }
                >
                  <MenuItem value="">Selecione a categoria</MenuItem>
                  {categories.map((category) => (
                    <MenuItem
                      key={category.id_categoria}
                      value={category.id_categoria}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {category.nome}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select
                  value={currentQuestion.tipo}
                  label="Tipo"
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      tipo: e.target.value,
                    })
                  }
                >
                  <MenuItem value="">Selecione o tipo</MenuItem>
                  {questionTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {type.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", gap: 2, p: 1 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={currentQuestion.obrigatoria}
                    onChange={(e) =>
                      setCurrentQuestion({
                        ...currentQuestion,
                        obrigatoria: e.target.checked,
                      })
                    }
                  />
                }
                label="Obrigatória"
              />
              {currentQuestion.tipo === "multipla_escolha" ? (
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentQuestion.permite_multiplas}
                      onChange={(e) =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          permite_multiplas: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Permite Múltiplas Respostas"
                />
              ) : (
                <></>
              )}
            </Box>
            {currentQuestion.tipo === "multipla_escolha" ? (
              <QuestionsOptions
                permiteMultiplas={currentQuestion.permite_multiplas}
                onChange={(newOptions) =>
                  setCurrentQuestion({ ...currentQuestion, opcoes: newOptions })
                }
                isEditing={isEditing}
                initialOptions={currentQuestion.opcoes || []}
              />
            ) : null}
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            {isEditing ? (
              <>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  // onClick={resetForm}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    borderColor: SECONDARY_COLOR,
                    color: SECONDARY_COLOR,
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  // onClick={handleUpdateQuestion}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    bgcolor: PRIMARY_COLOR,
                    "&:hover": { bgcolor: DARK_PRIMARY },
                  }}
                >
                  Atualizar
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  // onClick={resetForm}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    borderColor: SECONDARY_COLOR,
                    color: SECONDARY_COLOR,
                    width: "50%",
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AddIcon />}
                  // onClick={handleAddQuestion}
                  sx={{
                    py: 1.5,
                    bgcolor: PRIMARY_COLOR,
                    "&:hover": { bgcolor: DARK_PRIMARY },
                    fontSize: "1.1rem",
                    width: "50%",
                  }}
                >
                  Criar Pergunta
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default QuestionForm;
