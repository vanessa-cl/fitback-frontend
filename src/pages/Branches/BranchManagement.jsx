import { useState, useEffect } from "react";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { usePageTitle } from "../../context/PageTitleContext";
import BranchConsultList from "./BranchConsultList";
import filialService from "../../services/filialService";
import BranchFormDialog from "./BranchFormDialog";
import BranchDeleteDialog from "./BranchDeleteDialog";

const INITIAL_FORM_STATE = {
  nome: "",
  endereco: "",
  status: "ativo",
};

const BranchManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [branches, setBranches] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(INITIAL_FORM_STATE);
  const [deleteBranch, setDeleteBranch] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);
  const { setTitle } = usePageTitle();
  const [openBranchForm, setOpenBranchForm] = useState(false);

  useEffect(() => {
    setTitle("Gerenciador de Filiais");
  }, [setTitle]);

  const fetchBranches = async () => {
    setLoading(true);
    await filialService
      .getAllFiliais()
      .then((response) => {
        setBranches(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar filiais:", error);
        showSnackbar("Erro ao buscar filiais.", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranchesByFilter = async (filter) => {
    await filialService
      .searchFiliais(filter)
      .then((res) => {
        setBranches(res.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar filiais:", error);
        showSnackbar("Erro ao buscar filiais.", "error");
      });
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchBranches();
    } else {
      fetchBranchesByFilter(searchTerm);
    }
  }, [searchTerm]);

  const resetForm = () => {
    setCurrentBranch(INITIAL_FORM_STATE);
    setIsEditing(false);
  };

  const handleAddBranch = async () => {
    setLoading(true);
    await filialService
      .createFilial(currentBranch)
      .then((res) => {
        fetchBranches();
        showSnackbar("Filial adicionada com sucesso!", "success");
        setOpenBranchForm(false);
        resetForm();
      })
      .catch((err) => {
        console.error("Erro ao adicionar filial:", err);
        showSnackbar("Erro ao adicionar filial.", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdateBranch = async () => {
    setLoading(true);
    await filialService
      .updateFilial(currentBranch.id_filial, currentBranch)
      .then(() => {
        fetchBranches();
        showSnackbar("Filial atualizada com sucesso!", "success");
        setOpenBranchForm(false);
        resetForm();
      })
      .catch((err) => {
        console.error("Erro ao atualizar filial:", err);
        showSnackbar("Erro ao atualizar filial.", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditBranch = (branch) => {
    setCurrentBranch(branch);
    setIsEditing(true);
    setOpenBranchForm(true);
  };

  const handleDeleteBranch = (branch) => {
    setDeleteBranch(branch);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    await filialService
      .deleteFilial(deleteBranch.id_filial)
      .then(() => {
        fetchBranches();
        showSnackbar("Filial excluída com sucesso!", "success");
        setOpenDeleteDialog(false);
        setDeleteBranch(null);
      })
      .catch((err) => {
        console.error("Erro ao excluir filial:", err);
        showSnackbar("Erro ao excluir filial.", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto" }}>
      {loading && <LoadingSpinner />}
      <Box
        sx={{
          p: 1,
          mb: 4,
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "text.secondary", fontSize: "1.1rem" }}
        >
          Cadastre, edite e gerencie as filiais que participam do sistema de
          feedback.
        </Typography>
        <Button
          sx={{ width: "260px" }}
          variant="contained"
          onClick={() => setOpenBranchForm(true)}
        >
          <AddIcon />
          Adicionar Filial
        </Button>
      </Box>
      <BranchConsultList
        branches={branches}
        handleEdit={handleEditBranch}
        handleDelete={handleDeleteBranch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {/* Modal de Formulário de Filial */}
      {openBranchForm ? (
        <BranchFormDialog
          open={openBranchForm}
          onClose={() => setOpenBranchForm(false)}
          currentBranch={currentBranch}
          setCurrentBranch={setCurrentBranch}
          isEditing={isEditing}
          handleAdd={handleAddBranch}
          handleUpdate={handleUpdateBranch}
          resetForm={resetForm}
        />
      ) : (
        <></>
      )}

      {/* Modal de Exclusão de Filial */}
      <BranchDeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDeleteConfirm}
        branch={deleteBranch}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BranchManagement;
