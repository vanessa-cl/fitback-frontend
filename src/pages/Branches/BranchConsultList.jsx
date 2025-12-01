import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ViewIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../utils/colors";

const BranchConsultList = ({
  query,
  setQuery,
  filtered,
  handleEdit,
  handleDelete,
}) => {
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleView = (branch) => {
    setSelectedBranch(branch);
    setOpenViewDialog(true);
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", mt: 4, width: "100%" }}
    >
      <Paper elevation={3} sx={{ p: 3, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: SECONDARY_COLOR }}
          >
            Filiais
          </Typography>
          <TextField
            size="small"
            placeholder="Pesquisar por nome"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: 420 }}
          />
        </Box>

        <Divider sx={{ mb: 2 }} />
        {filtered.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <LocationOnIcon sx={{ fontSize: 56, color: "#ccc" }} />
            <Typography variant="h6" color="textSecondary">
              Nenhuma filial encontrada
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Adicione sua primeira filial no formulário ao lado.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              maxHeight: 600,
              overflow: "auto",
              display: "flex",
              width: "100%",
            }}
          >
            <Grid container spacing={2}>
              {filtered.map((branch) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={branch.id_filial}>
                  <Card
                    sx={{
                      borderLeft: `4px solid ${PRIMARY_COLOR}`,
                      mb: 2,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    key={branch.id_filial}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "fit-content",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: "bold",
                            color: SECONDARY_COLOR,
                          }}
                        >
                          {branch.nome}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 1,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              flexWrap: "wrap",
                            }}
                          >
                            <Chip
                              label={
                                branch.status === "ativo" ? "Ativa" : "Inativa"
                              }
                              size="small"
                              sx={{
                                borderColor:
                                  branch.status === "ativo"
                                    ? PRIMARY_COLOR
                                    : "#ccc",
                                color:
                                  branch.status === "ativo"
                                    ? PRIMARY_COLOR
                                    : "#666",
                              }}
                            />
                          </Box>
                          <Box>
                            <IconButton
                              onClick={() => handleView(branch)}
                              sx={{ color: PRIMARY_COLOR }}
                            >
                              <ViewIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleEdit(branch)}
                              sx={{ color: SECONDARY_COLOR }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(branch)}
                              sx={{ color: "#d32f2f" }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>
      <Dialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Detalhes da Filial</DialogTitle>
        <DialogContent>
          {selectedBranch && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {selectedBranch.nome}
              </Typography>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                  <Typography variant="body2">Endereço:</Typography>
                  <Typography>{selectedBranch.endereco}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Criada em:</Typography>
                  <Typography>
                    {new Date(
                      selectedBranch.data_cadastro
                    ).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Status:</Typography>
                  <Typography>
                    {selectedBranch.status === "ativo" ? "Ativa" : "Inativa"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ width: "220px", mr: 2, mb: 2 }}
            variant="outlined"
            onClick={() => setOpenViewDialog(false)}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BranchConsultList;
