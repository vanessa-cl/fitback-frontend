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
import React, { useState, useEffect } from "react";
import SubjectIcon from "@mui/icons-material/Subject";
import ListIcon from "@mui/icons-material/List";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import QuestionsOptions from "./QuestionsOptions";
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  DARK_PRIMARY,
} from "../../utils/colors";

const questionTypes = [
  { value: "aberta", label: "Aberta" },
  { value: "multipla_escolha", label: "Múltipla Escolha" },
  { value: "escala", label: "Escala (1 a 5)" },
];

const QuestionFormDialog = ({
  open,
  onClose,
  categories,
  isEditing,
  currentQuestion,
  setCurrentQuestion,
  resetForm,
  onAdd,
  onUpdate,
}) => {
  const checkValidFields = () => {
    const { tipo, opcoes, conteudo, id_categoria, obrigatoria } =
      currentQuestion;

    if (!conteudo || !id_categoria || !tipo) return false;

    if (tipo === "multipla_escolha") {
      if (!opcoes || opcoes.length < 2) return false;
      return opcoes.every((o) => o.texto.trim() !== "");
    }

    return true;
  };

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
            onClick={() => {
              onClose();
              resetForm();
            }}
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
              required
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel htmlFor="category-select">Categoria</InputLabel>
                <Select
                  id="category-select"
                  value={currentQuestion.id_categoria}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      id_categoria: e.target.value,
                    })
                  }
                  required
                >
                  <MenuItem value="" disabled>
                    Selecione a categoria
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem
                      key={category.id_categoria}
                      value={category.id_categoria}
                    >
                      {category.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel htmlFor="type-select">Tipo</InputLabel>
                <Select
                  id="type-select"
                  value={currentQuestion.tipo}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      tipo: e.target.value,
                    })
                  }
                  required
                >
                  <MenuItem value="" disabled>
                    Selecione o tipo
                  </MenuItem>
                  {questionTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
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
                required
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
                  required
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
                  onClick={() => {
                    onClose();
                    resetForm();
                  }}
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
                  onClick={() => {
                    onUpdate();
                    onClose();
                  }}
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
                  onClick={() => {
                    onClose();
                    resetForm();
                  }}
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
                  onClick={() => {
                    onAdd();
                    onClose();
                  }}
                  disabled={!checkValidFields()}
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

export default React.memo(QuestionFormDialog);
