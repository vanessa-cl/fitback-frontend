import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const DeactivateQuestionnaire = ({
  open,
  onClose,
  onConfirm,
  title = "Confirmar Inativação",
  message = "Tem certeza que deseja inativar este questionário?",
  confirmText = "Inativar",
  cancelText = "Cancelar",
  itemName = "",
  severity = "warning",
  selectedQuestionnaire,
}) => {
  const handleConfirm = () => {
    onConfirm(selectedQuestionnaire, "inativo");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="confirmation-dialog-title" sx={{ pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6" component="span" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Alert severity={severity} sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: "medium" }}>
            {message}
          </Typography>
        </Alert>

        {itemName && (
          <Box
            sx={{
              p: 2,
              bgcolor: "grey.50",
              borderRadius: 1,
              border: "1px solid",
              borderColor: "grey.300",
              mt: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontStyle: "italic",
                color: "text.secondary",
                textAlign: "center",
              }}
            >
              "{itemName}"
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          size="large"
          sx={{ flex: 1 }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          size="large"
          sx={{ flex: 1 }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeactivateQuestionnaire;
