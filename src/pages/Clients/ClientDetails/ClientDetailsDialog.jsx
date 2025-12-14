import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { LIGHT_BG, SECONDARY_COLOR } from "../../../utils/colors";
import { formatCPF, formatPhone } from "../../../utils";

const ClientDetailsDialog = ({ open, onClose, client }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: SECONDARY_COLOR }}
        >
          Detalhes do Cliente
        </Typography>
      </DialogTitle>
      <DialogContent>
        {client && (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body1"
              sx={{ mb: 3, p: 2, bgcolor: LIGHT_BG, borderRadius: 1 }}
            >
              {client.nome || ""}
            </Typography>
            <Box sx={{ mb: 3, display: "flex", gap: 3 }}>
              <Box>
                <Typography variant="body1" color="textSecondary">
                  CPF:
                </Typography>
                <Typography variant="body2">
                  {formatCPF(client.cpf) || ""}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" color="textSecondary">
                  Email:
                </Typography>
                <Typography variant="body2">{client.email || ""}</Typography>
              </Box>
              <Box>
                <Typography variant="body1" color="textSecondary">
                  Matrícula:
                </Typography>
                <Typography variant="body2">
                  {client.matricula || ""}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 3, display: "flex", gap: 3 }}>
              <Box>
                <Typography variant="body1" color="textSecondary">
                  Telefone:
                </Typography>
                <Typography variant="body2">
                  {formatPhone(client.telefone) || ""}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" color="textSecondary">
                  Data de Cadastro:
                </Typography>
                <Typography variant="body2">
                  {new Date(client.data_cadastro).toLocaleDateString("pt-BR") ||
                    ""}
                </Typography>
              </Box>
              {client.data_desistencia ? (
                <Box>
                  <Typography variant="body1" color="textSecondary">
                    Data de Desistência:
                  </Typography>
                  <Typography variant="body2">
                    {new Date(client.data_desistencia).toLocaleDateString(
                      "pt-BR"
                    ) || ""}
                  </Typography>
                </Box>
              ) : (
                <></>
              )}
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          id="close-button"
          name="close-button"
          sx={{ width: "220px", mr: 2, mb: 2 }}
          variant="outlined"
          onClick={onClose}
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClientDetailsDialog;
