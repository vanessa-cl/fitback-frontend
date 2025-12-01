import React from "react";
("react");
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  InputAdornment,
  Dialog,
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
} from "../../utils/colors";

const BranchFormDialog = ({
  open,
  onClose,
  currentBranch,
  setCurrentBranch,
  isEditing,
  setIsEditing,
  handleAdd,
  handleUpdate,
  branches,
  setBranches,
  resetForm,
}) => {
  const checkValidFields = () => {
    const { nome, endereco, status } = currentBranch;
    return nome.trim() !== "" && endereco.trim() !== "" && status.trim() !== "";
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
              fullWidth
              label="Nome da Filial"
              value={currentBranch.nome}
              onChange={(e) =>
                setCurrentBranch({ ...currentBranch, nome: e.target.value })
              }
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
            />
            <FormControlLabel
              control={
                <Switch
                  checked={currentBranch.status === "ativo"}
                  onChange={(e) =>
                    setCurrentBranch({
                      ...currentBranch,
                      status: e.target.checked ? "ativo" : "inativo",
                    })
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: PRIMARY_COLOR,
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: PRIMARY_COLOR,
                    },
                  }}
                />
              }
              label={currentBranch.status === "ativo" ? "Ativa" : "Inativa"}
              sx={{ mb: 2, mr: 0, width: "100%" }}
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
                    resetForm();
                  }}
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
                  onClick={handleAdd}
                  fullWidth
                  sx={{
                    py: 1.5,
                    bgcolor: PRIMARY_COLOR,
                    "&:hover": { bgcolor: DARK_PRIMARY },
                    fontSize: "1.1rem",
                    width: "50%",
                  }}
                  disabled={!checkValidFields()}
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
