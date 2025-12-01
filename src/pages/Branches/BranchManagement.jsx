import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { PRIMARY_COLOR, DARK_PRIMARY } from "../../utils/colors";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { usePageTitle } from "../../context/PageTitleContext";
import BranchConsultList from "./BranchConsultList";
import filialService from "../../services/filialService";
import BranchFormDialog from "./BranchFormDialog";

const INITIAL_FORM_STATE = {
  nome: "",
  endereco: "",
  status: "ativo",
};

const BranchManagement = () => {
  const [branches, setBranches] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteBranch, setDeleteBranch] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [query, setQuery] = useState("");
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

  useEffect(() => {
    const saved = localStorage.getItem("gym-branches");
    if (saved) setBranches(JSON.parse(saved));
  }, []);

  const persist = (updated) => {
    localStorage.setItem("gym-branches", JSON.stringify(updated));
    setBranches(updated);
  };

  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      address: "",
      city: "",
      state: "",
      phone: "",
      manager: "",
      isActive: true,
    });
    setIsEditing(false);
  };

  const validate = () => {
    if (!form.name.trim()) return "Nome da filial é obrigatório.";
    if (!form.address.trim()) return "Endereço é obrigatório.";
    return null;
  };

  const handleAddBranch = async () => {
    setLoading(true);
    await filialService
      .createFilial(form)
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

  const handleUpdate = () => {
    const err = validate();
    if (err) return showSnackbar(err, "error");

    const updated = branches.map((b) =>
      b.id === form.id ? { ...form, updatedAt: new Date().toISOString() } : b
    );
    persist(updated);
    resetForm();
    showSnackbar("Filial atualizada com sucesso!", "success");
  };

  const handleEdit = (branch) => {
    setForm({ ...branch });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = (branch) => {
    setDeleteBranch(branch);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!deleteBranch) return;
    const updated = branches.filter((b) => b.id !== deleteBranch.id);
    persist(updated);
    setDeleteDialogOpen(false);
    setDeleteBranch(null);
    showSnackbar("Filial removida.", "info");
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const filtered = branches.filter((b) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      b.name.toLowerCase().includes(q) ||
      b.city?.toLowerCase().includes(q) ||
      b.manager?.toLowerCase().includes(q)
    );
  });

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
        query={query}
        setQuery={setQuery}
        filtered={filtered}
      />
      {/* Modal de Formulário de Filial */}
      {openBranchForm ? (
        <BranchFormDialog
          open={openBranchForm}
          onClose={() => setOpenBranchForm(false)}
          form={form}
          setForm={setForm}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleAdd={handleAddBranch}
          handleUpdate={handleUpdate}
          branches={branches}
          setBranches={setBranches}
          resetForm={resetForm}
        />
      ) : (
        <></>
      )}

      {/* Delete Confirmation */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Excluir Filial</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir a filial "{deleteBranch?.name}"? Essa
            ação não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            startIcon={<CancelIcon />}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            startIcon={<DeleteIcon />}
            sx={{
              bgcolor: PRIMARY_COLOR,
              color: "white",
              "&:hover": { bgcolor: DARK_PRIMARY },
            }}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

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
