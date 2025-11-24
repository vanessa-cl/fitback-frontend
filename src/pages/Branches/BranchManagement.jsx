import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
  Divider,
  InputAdornment
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  AccountCircle as AccountIcon
} from '@mui/icons-material';

// CRUD de Filiais (Branches) - usa localStorage como backend simulado
// Paleta Focada: Laranja (Marrom) e Cinza
const PRIMARY_COLOR = '#B25E09';
const DARK_PRIMARY = '#914d07';
const LIGHT_BG = '#f5f5f5';
const SECONDARY_COLOR = '#424242';

const BranchManagement = () => {
  const [branches, setBranches] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: '',
    address: '',
    city: '',
    state: '',
    phone: '',
    manager: '',
    isActive: true
  });
  const [isEditing, setIsEditing] = useState(false);
  const [viewBranch, setViewBranch] = useState(null);
  const [deleteBranch, setDeleteBranch] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [query, setQuery] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('gym-branches');
    if (saved) setBranches(JSON.parse(saved));
  }, []);

  const persist = (updated) => {
    localStorage.setItem('gym-branches', JSON.stringify(updated));
    setBranches(updated);
  };

  const resetForm = () => {
    setForm({ id: null, name: '', address: '', city: '', state: '', phone: '', manager: '', isActive: true });
    setIsEditing(false);
  };

  const validate = () => {
    if (!form.name.trim()) return 'Nome da filial é obrigatório.';
    if (!form.address.trim()) return 'Endereço é obrigatório.';
    return null;
  };

  const handleAdd = () => {
    const err = validate();
    if (err) return showSnackbar(err, 'error');

    const newBranch = { ...form, id: Date.now(), createdAt: new Date().toISOString() };
    const updated = [...branches, newBranch];
    persist(updated);
    resetForm();
    showSnackbar('Filial adicionada com sucesso!', 'success');
  };

  const handleUpdate = () => {
    const err = validate();
    if (err) return showSnackbar(err, 'error');

    const updated = branches.map(b => (b.id === form.id ? { ...form, updatedAt: new Date().toISOString() } : b));
    persist(updated);
    resetForm();
    showSnackbar('Filial atualizada com sucesso!', 'success');
  };

  const handleEdit = (branch) => {
    setForm({ ...branch });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleView = (branch) => {
    setViewBranch(branch);
  };

  const handleDeleteClick = (branch) => {
    setDeleteBranch(branch);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!deleteBranch) return;
    const updated = branches.filter(b => b.id !== deleteBranch.id);
    persist(updated);
    setDeleteDialogOpen(false);
    setDeleteBranch(null);
    showSnackbar('Filial removida.', 'info');
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const filtered = branches.filter(b => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      b.name.toLowerCase().includes(q) ||
      b.city?.toLowerCase().includes(q) ||
      b.manager?.toLowerCase().includes(q)
    );
  });

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: SECONDARY_COLOR }}>
          Gerenciador de Filiais
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Cadastre, edite e gerencie as filiais que participam do sistema de feedback.
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: SECONDARY_COLOR, mb: 2 }}>
              {isEditing ? 'Editar Filial' : 'Nova Filial'}
            </Typography>

            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                label="Nome da Filial"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Endereço"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                sx={{ mb: 2 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><LocationOnIcon /></InputAdornment> }}
              />

              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Cidade"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Estado"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="Telefone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                sx={{ mb: 2 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment> }}
              />

              <TextField
                fullWidth
                label="Gerente responsável"
                value={form.manager}
                onChange={(e) => setForm({ ...form, manager: e.target.value })}
                sx={{ mb: 2 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><AccountIcon /></InputAdornment> }}
              />

              <FormControlLabel
                control={<Switch checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: PRIMARY_COLOR }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: PRIMARY_COLOR } }} />}
                label={form.isActive ? 'Ativa' : 'Inativa'}
                sx={{ mb: 2 }}
              />

              <Box sx={{ display: 'flex', gap: 2 }}>
                {isEditing ? (
                  <>
                    <Button
                      startIcon={<SaveIcon />}
                      variant="contained"
                      onClick={handleUpdate}
                      sx={{ flex: 1, bgcolor: PRIMARY_COLOR, '&:hover': { bgcolor: DARK_PRIMARY } }}
                    >
                      Salvar
                    </Button>
                    <Button
                      startIcon={<CancelIcon />}
                      variant="outlined"
                      onClick={resetForm}
                      sx={{ flex: 1, borderColor: SECONDARY_COLOR, color: SECONDARY_COLOR }}
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    onClick={handleAdd}
                    fullWidth
                    sx={{ bgcolor: PRIMARY_COLOR, '&:hover': { bgcolor: DARK_PRIMARY } }}
                  >
                    Adicionar Filial
                  </Button>
                )}
              </Box>

              <Paper elevation={1} sx={{ p: 2, mt: 3, bgcolor: LIGHT_BG }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Resumo</Typography>
                <Typography variant="body2">Total de filiais: {branches.length}</Typography>
                <Typography variant="body2">Filiais ativas: {branches.filter(b => b.isActive).length}</Typography>
              </Paper>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: SECONDARY_COLOR }}>Filiais</Typography>
              <TextField
                size="small"
                placeholder="Pesquisar por nome, cidade ou gerente"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
                sx={{ width: 320 }}
              />
            </Box>

            <Divider sx={{ mb: 2 }} />

            {filtered.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <LocationOnIcon sx={{ fontSize: 56, color: '#ccc' }} />
                <Typography variant="h6" color="textSecondary">Nenhuma filial encontrada</Typography>
                <Typography variant="body2" color="textSecondary">Adicione sua primeira filial no formulário ao lado.</Typography>
              </Box>
            ) : (
              <Box sx={{ maxHeight: 600, overflow: 'auto' }}>
                <Grid container spacing={2}>
                  {filtered.map(branch => (
                    <Grid item xs={12} key={branch.id}>
                      <Card sx={{ borderLeft: `4px solid ${PRIMARY_COLOR}` }}>
                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: SECONDARY_COLOR }}>{branch.name}</Typography>
                            <Typography variant="body2" color="textSecondary">{branch.city} - {branch.state}</Typography>
                            <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                              <Chip label={branch.isActive ? 'Ativa' : 'Inativa'} size="small" sx={{ borderColor: branch.isActive ? PRIMARY_COLOR : '#ccc', color: branch.isActive ? PRIMARY_COLOR : '#666' }} />
                              {branch.manager && <Chip label={`Gerente: ${branch.manager}`} size="small" />}
                              {branch.createdAt && <Chip label={new Date(branch.createdAt).toLocaleDateString('pt-BR')} size="small" />}
                            </Box>
                          </Box>

                          <Box>
                            <IconButton onClick={() => handleView(branch)} sx={{ color: PRIMARY_COLOR }}>
                              <ViewIcon />
                            </IconButton>
                            <IconButton onClick={() => handleEdit(branch)} sx={{ color: SECONDARY_COLOR }}>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteClick(branch)} sx={{ color: '#d32f2f' }}>
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* View Dialog */}
      <Dialog open={!!viewBranch} onClose={() => setViewBranch(null)} fullWidth maxWidth="sm">
        <DialogTitle>Detalhes da Filial</DialogTitle>
        <DialogContent>
          {viewBranch && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{viewBranch.name}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>{viewBranch.address}</Typography>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}><Typography variant="body2">Cidade</Typography><Typography>{viewBranch.city}</Typography></Grid>
                <Grid item xs={6}><Typography variant="body2">Estado</Typography><Typography>{viewBranch.state}</Typography></Grid>
                <Grid item xs={6}><Typography variant="body2">Telefone</Typography><Typography>{viewBranch.phone}</Typography></Grid>
                <Grid item xs={6}><Typography variant="body2">Gerente</Typography><Typography>{viewBranch.manager}</Typography></Grid>
                <Grid item xs={12}><Typography variant="body2">Status</Typography><Typography>{viewBranch.isActive ? 'Ativa' : 'Inativa'}</Typography></Grid>
                <Grid item xs={12}><Typography variant="body2">Criada em</Typography><Typography>{new Date(viewBranch.createdAt).toLocaleString('pt-BR')}</Typography></Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewBranch(null)}>Fechar</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Excluir Filial</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza que deseja excluir a filial "{deleteBranch?.name}"? Essa ação não pode ser desfeita.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} startIcon={<CancelIcon />}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm} startIcon={<DeleteIcon />} sx={{ bgcolor: PRIMARY_COLOR, color: 'white', '&:hover': { bgcolor: DARK_PRIMARY } }}>Excluir</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BranchManagement;
