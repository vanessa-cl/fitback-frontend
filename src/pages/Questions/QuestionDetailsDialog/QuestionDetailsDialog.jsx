import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import { LIGHT_BG, SECONDARY_COLOR } from "../../../utils/colors";

const QuestionDetailsDialog = ({ open, onClose, question }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: SECONDARY_COLOR }}
        >
          Detalhes da Pergunta
        </Typography>
      </DialogTitle>
      <DialogContent>
        {question && (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body1"
              sx={{ mb: 3, p: 2, bgcolor: LIGHT_BG, borderRadius: 1 }}
            >
              {question.conteudo}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Tipo:
                </Typography>
                <Chip label={question.tipo} size="small" sx={{ mt: 0.5 }} />
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Categoria:
                </Typography>
                <Typography variant="body2">
                  {question.categoria_nome}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Obrigatória:
                </Typography>
                <Typography variant="body2">
                  {question.obrigatoria ? "Sim" : "Não"}
                </Typography>
              </Box>
              {question.tipo === "multipla_escolha" ? (
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Permite Múltiplas Respostas:
                  </Typography>
                  <Typography variant="body2">
                    {question.permite_multiplas ? "Sim" : "Não"}
                  </Typography>
                </Box>
              ) : (
                <></>
              )}
              {question.tipo === "multipla_escolha" ? (
                <Box>
                  {question.opcoes && question.opcoes.length > 0 ? (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="textSecondary">
                        Opções:
                      </Typography>
                      <ul>
                        {question.opcoes.map((opcao, index) => (
                          <li key={index}>
                            <Typography variant="body1">
                              {opcao.texto}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  ) : (
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      Nenhuma opção disponível.
                    </Typography>
                  )}
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

export default QuestionDetailsDialog;
