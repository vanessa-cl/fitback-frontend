import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Dialog,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Add as AddIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  DARK_PRIMARY,
} from "../../../utils/colors";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";

const BranchFormDialog = ({
  open,
  onClose,
  currentBranch,
  setCurrentBranch,
  isEditing,
  handleAdd,
  handleUpdate,
  resetForm,
  helperText,
}) => {
  const [initialData, setInitialData] = useState(currentBranch);

  const handleHasChanged = () => {
    if (!isEditing) return false;
    return JSON.stringify(currentBranch) !== JSON.stringify(initialData);
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
            {isEditing ? "Editar Filial" : "Nova Filial"}
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
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          component="form"
          noValidate
          autoComplete="off"
        >
          <Box sx={{ gap: 2, mb: 4, display: "flex", flexDirection: "column" }}>
            <TextField
              id="branch-name"
              name="branch-name"
              fullWidth
              label="Nome"
              value={currentBranch.nome}
              onChange={(e) =>
                setCurrentBranch({ ...currentBranch, nome: e.target.value })
              }
              required
              error={!!helperText.nome}
              helperText={helperText.nome}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setCurrentBranch((prev) => ({ ...prev, nome: "" }))
                        }
                      >
                        <ClearIcon />
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
              fullWidth
              label="Endereço Completo"
              value={currentBranch.endereco}
              onChange={(e) =>
                setCurrentBranch({ ...currentBranch, endereco: e.target.value })
              }
              multiline
              rows={3}
              error={!!helperText.endereco}
              helperText={helperText.endereco}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setCurrentBranch((prev) => ({
                            ...prev,
                            endereco: "",
                          }))
                        }
                      >
                        <ClearIcon />
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

          <Box sx={{ display: "flex", gap: 2 }}>
            {isEditing ? (
              <>
                <Button
                  startIcon={<CancelIcon />}
                  variant="outlined"
                  onClick={() => {
                    onClose();
                    resetForm();
                    setInitialData({});
                  }}
                  sx={{
                    flex: 1,
                    borderColor: SECONDARY_COLOR,
                    color: SECONDARY_COLOR,
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  startIcon={<SaveIcon />}
                  variant="contained"
                  onClick={() => {
                    handleUpdate();
                  }}
                  disabled={!handleHasChanged()}
                  sx={{
                    flex: 1,
                    bgcolor: PRIMARY_COLOR,
                    "&:hover": { bgcolor: DARK_PRIMARY },
                  }}
                >
                  Salvar
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
                    setInitialData({});
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
                  startIcon={<AddIcon />}
                  variant="contained"
                  onClick={(e) => {
                    handleAdd(e);
                  }}
                  fullWidth
                  sx={{
                    py: 1.5,
                    bgcolor: PRIMARY_COLOR,
                    "&:hover": { bgcolor: DARK_PRIMARY },
                    fontSize: "1.1rem",
                    width: "50%",
                  }}
                >
                  Adicionar Filial
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default BranchFormDialog;
