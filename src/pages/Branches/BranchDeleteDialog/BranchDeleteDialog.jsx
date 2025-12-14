import React from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { PRIMARY_COLOR, DARK_PRIMARY, SECONDARY_COLOR } from "../../../utils/colors";
import {
  Delete as DeleteIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

const BranchDeleteDialog = ({ open, onClose, onConfirm, branch }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box sx={{ flex: "0 0 41.6667%", p: 2 }}>
        <DialogTitle>Excluir Filial</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir a filial "{branch?.nome}"? Essa ação
            não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              width: "50%",
              py: 1.5,
              borderColor: SECONDARY_COLOR,
              color: SECONDARY_COLOR,
            }}
            onClick={() => onClose()}
            startIcon={<CancelIcon />}
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            startIcon={<DeleteIcon />}
            sx={{
              width: "50%",
              bgcolor: PRIMARY_COLOR,
              color: "white",
              "&:hover": { bgcolor: DARK_PRIMARY },
            }}
          >
            Excluir
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default BranchDeleteDialog;
