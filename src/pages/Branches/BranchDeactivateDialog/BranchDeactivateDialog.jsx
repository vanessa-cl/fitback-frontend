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
import {
  PRIMARY_COLOR,
  DARK_PRIMARY,
  SECONDARY_COLOR,
} from "../../../utils/colors";
import {
  Delete as DeleteIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

const BranchDeleteDialog = ({ open, onClose, onConfirm, branch }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box sx={{ flex: "0 0 41.6667%", p: 2 }}>
        <DialogTitle>Inativar Filial</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja inativar a filial "{branch?.nome}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            sx={{
              width: "50%",
              py: 1.5,
              borderColor: SECONDARY_COLOR,
              color: SECONDARY_COLOR,
            }}
            onClick={() => onClose()}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => onConfirm(branch, "inativo")}
            sx={{
              width: "50%",
              bgcolor: PRIMARY_COLOR,
              color: "white",
              "&:hover": { bgcolor: DARK_PRIMARY },
            }}
          >
            Inativar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default BranchDeleteDialog;
