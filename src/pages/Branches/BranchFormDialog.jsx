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
  form,
  setForm,
  isEditing,
  setIsEditing,
  handleAdd,
  handleUpdate,
  branches,
  setBranches,
  resetForm,
}) => {

  const checkValidFields = () => {
    const { nome, endereco, status } = form;
    return nome.trim() !== "" && endereco.trim() !== "" && status.trim() !== "";
  }

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
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
            <TextField
              fullWidth
              label="Endereço Completo"
              value={form.endereco}
              onChange={(e) => setForm({ ...form, endereco: e.target.value })}
              multiline
              rows={3}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={form.status === "ativo"}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.checked ? "ativo" : "inativo" })
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
              label={form.status === "ativo" ? "Ativa" : "Inativa"}
              sx={{ mb: 2, mr: 0, width: "100%" }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            {isEditing ? (
              <>
                <Button
                  startIcon={<SaveIcon />}
                  variant="contained"
                  onClick={handleUpdate}
                  sx={{
                    flex: 1,
                    bgcolor: PRIMARY_COLOR,
                    "&:hover": { bgcolor: DARK_PRIMARY },
                  }}
                >
                  Salvar
                </Button>
                <Button
                  startIcon={<CancelIcon />}
                  variant="outlined"
                  onClick={resetForm}
                  sx={{
                    flex: 1,
                    borderColor: SECONDARY_COLOR,
                    color: SECONDARY_COLOR,
                  }}
                >
                  Cancelar
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
