import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  IconButton,
  Divider,
  Snackbar,
  Alert,
  FormControlLabel,
  Switch,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  FitnessCenter as FitnessCenterIcon,
  CleanHands as CleanHandsIcon,
  Groups as GroupsIcon,
  FormatListBulleted as ListIcon,
  Subject as SubjectIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import ModalDeleteQuestion from '../../components/Modal/ModalDeleteQuestion';

const QuestionManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    id: null,
    text: '',
    type: 'estrutura',
    isDescriptive: false
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  
  // Estados para o diálogo de confirmação
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  // Paleta Focada: Laranja (Marrom) e Cinza
  const PRIMARY_COLOR = '#B25E09';
  const DARK_PRIMARY = '#914d07';
  const LIGHT_BG = '#f5f5f5';
  const SECONDARY_COLOR = '#424242';

  const questionTypes = [
    { value: 'estrutura', label: 'Estrutura', icon: <FitnessCenterIcon />, color: '#1976d2' }, 
    { value: 'limpeza', label: 'Limpeza', icon: <CleanHandsIcon />, color: '#2e7d32' }, 
    { value: 'equipe', label: 'Equipe', icon: <GroupsIcon />, color: '#ed6c02' } 
  ];

  // Carregar perguntas do localStorage (simulando backend)
  useEffect(() => {
    const savedQuestions = localStorage.getItem('academy-questions');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  // Salvar perguntas no localStorage
  const saveQuestions = (updatedQuestions) => {
    localStorage.setItem('academy-questions', JSON.stringify(updatedQuestions));
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    if (!currentQuestion.text.trim()) {
      showSnackbar('Por favor, digite a pergunta', 'error');
      return;
    }

    const newQuestion = {
      id: Date.now(),
      text: currentQuestion.text,
      type: currentQuestion.type,
      isDescriptive: currentQuestion.isDescriptive,
      createdAt: new Date().toISOString()
    };

    const updatedQuestions = [...questions, newQuestion];
    saveQuestions(updatedQuestions);
    resetForm();
    showSnackbar('Pergunta adicionada com sucesso!', 'success');
  };

  const handleUpdateQuestion = () => {
    if (!currentQuestion.text.trim()) {
      showSnackbar('Por favor, digite a pergunta', 'error');
      return;
    }

    const updatedQuestions = questions.map(q =>
      q.id === currentQuestion.id ? { ...currentQuestion, updatedAt: new Date().toISOString() } : q
    );

    saveQuestions(updatedQuestions);
    resetForm();
    showSnackbar('Pergunta atualizada com sucesso!', 'success');
  };

  const handleEditQuestion = (question) => {
    setCurrentQuestion({ ...question });
    setIsEditing(true);
  };

  const handleViewQuestion = (question) => {
    setSelectedQuestion(question);
    setViewDialogOpen(true);
  };

  // Função para abrir o diálogo de confirmação
  const handleDeleteClick = (question) => {
    setQuestionToDelete(question);
    setDeleteDialogOpen(true);
  };

  // Função para confirmar a exclusão
  const handleDeleteConfirm = () => {
    if (questionToDelete) {
      const updatedQuestions = questions.filter(q => q.id !== questionToDelete.id);
      saveQuestions(updatedQuestions);
      showSnackbar('Pergunta removida com sucesso!', 'info');
      setQuestionToDelete(null);
    }
  };

  const resetForm = () => {
    setCurrentQuestion({
      id: null,
      text: '',
      type: 'estrutura',
      isDescriptive: false
    });
    setIsEditing(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getTypeInfo = (type) => {
    return questionTypes.find(qt => qt.value === type);
  };

  const filteredQuestions = () => {
    switch (currentTab) {
      case 1: // Estrutura
        return questions.filter(q => q.type === 'estrutura');
      case 2: // Limpeza
        return questions.filter(q => q.type === 'limpeza');
      case 3: // Equipe
        return questions.filter(q => q.type === 'equipe');
      default: // Todas
        return questions;
    }
  };

  return (
    <Box sx={{ 
      p: 3, 
      maxWidth: 1400, 
      margin: '0 auto',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <Box sx={{ p: 1, mb: 4, textAlign: 'left' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: SECONDARY_COLOR, fontWeight: 'bold' }}>
          Gerenciador de Perguntas
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
          Gerencie e crie perguntas para os questionários 
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Left Side - Question Form */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: SECONDARY_COLOR }}>
              {isEditing ? 'Editar Pergunta' : 'Nova Pergunta'}
            </Typography>
            
            <Box component="form" sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="Digite a pergunta"
                value={currentQuestion.text}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
                multiline
                rows={3}
                placeholder="Ex: Como você avalia o estado dos equipamentos?"
                sx={{ mb: 3 }}
              />

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Tipo de Pergunta</InputLabel>
                <Select
                  value={currentQuestion.type}
                  label="Tipo de Pergunta"
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, type: e.target.value })}
                >
                  {questionTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {type.icon}
                        {type.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    checked={currentQuestion.isDescriptive}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, isDescriptive: e.target.checked })}
                    sx={{ 
                      '& .MuiSwitch-switchBase.Mui-checked': { color: PRIMARY_COLOR },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: PRIMARY_COLOR },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {currentQuestion.isDescriptive ? 
                      <SubjectIcon sx={{ color: PRIMARY_COLOR }} /> : 
                      <ListIcon sx={{ color: SECONDARY_COLOR }} />
                    }
                    <Typography>
                      {currentQuestion.isDescriptive ? 'Pergunta Descritiva' : 'Pergunta Objetiva'}
                    </Typography>
                  </Box>
                }
                sx={{ mb: 4 }}
              />

              <Box sx={{ display: 'flex', gap: 2 }}>
                {isEditing ? (
                  <>
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={handleUpdateQuestion}
                      sx={{
                        flex: 1,
                        py: 1.5,
                        bgcolor: PRIMARY_COLOR,
                        '&:hover': { bgcolor: DARK_PRIMARY }
                      }}
                    >
                      Atualizar
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CancelIcon />}
                      onClick={resetForm}
                      sx={{
                        flex: 1,
                        py: 1.5,
                        borderColor: SECONDARY_COLOR,
                        color: SECONDARY_COLOR
                      }}
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    onClick={handleAddQuestion}
                    fullWidth
                    sx={{
                      py: 1.5,
                      bgcolor: PRIMARY_COLOR,
                      '&:hover': { bgcolor: DARK_PRIMARY },
                      fontSize: '1.1rem'
                    }}
                  >
                    Adicionar Pergunta
                  </Button>
                )}
              </Box>
            </Box>

            {/* Estatísticas */}
            <Paper elevation={1} sx={{ p: 2, mt: 3, bgcolor: LIGHT_BG }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                Perguntas
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary={`Total: ${questions.length} perguntas`}
                    secondary={`Estrutura: ${questions.filter(q => q.type === 'estrutura').length} | Limpeza: ${questions.filter(q => q.type === 'limpeza').length} | Equipe: ${questions.filter(q => q.type === 'equipe').length}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Tipos de Resposta"
                    secondary={`Objetivas: ${questions.filter(q => !q.isDescriptive).length} | Descritivas: ${questions.filter(q => q.isDescriptive).length}`}
                  />
                </ListItem>
              </List>
            </Paper>
          </Paper>
        </Grid>

        {/* Right Side - Questions List */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3 }}>
            {/* Tabs para filtro */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
                <Tab label="Todas" />
                <Tab label="Estrutura" />
                <Tab label="Limpeza" />
                <Tab label="Equipe" />
              </Tabs>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: SECONDARY_COLOR }}>
                {currentTab === 0 ? 'Todas as Perguntas' : 
                 currentTab === 1 ? 'Perguntas de Estrutura' :
                 currentTab === 2 ? 'Perguntas de Limpeza' : 'Perguntas de Equipe'}
              </Typography>
              <Chip 
                label={`${filteredQuestions().length} pergunta(s)`} 
                sx={{ bgcolor: PRIMARY_COLOR, color: 'white', fontWeight: 'bold' }} 
              />
            </Box>

            <Divider sx={{ mb: 3 }} />

            {filteredQuestions().length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <FitnessCenterIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
                <Typography variant="h6" color="textSecondary">
                  Nenhuma pergunta encontrada
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {currentTab === 0 ? 'Comece adicionando sua primeira pergunta!' : 
                   `Nenhuma pergunta do tipo ${currentTab === 1 ? 'Estrutura' : currentTab === 2 ? 'Limpeza' : 'Equipe'} encontrada.`}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ maxHeight: 600, overflow: 'auto' }}>
                {filteredQuestions().map((question) => {
                  const typeInfo = getTypeInfo(question.type);
                  return (
                    <Card key={question.id} sx={{ mb: 2, borderLeft: `4px solid ${PRIMARY_COLOR}` }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography variant="h6" sx={{ fontSize: '1rem', flex: 1, color: SECONDARY_COLOR }}>
                            {question.text}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <IconButton 
                              size="small" 
                              onClick={() => handleViewQuestion(question)}
                              sx={{ color: PRIMARY_COLOR }}
                            >
                              <ViewIcon />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              onClick={() => handleEditQuestion(question)}
                              sx={{ color: SECONDARY_COLOR }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              onClick={() => handleDeleteClick(question)}
                              sx={{ color: '#d32f2f' }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                          <Chip
                            icon={typeInfo.icon}
                            label={typeInfo.label}
                            size="small"
                            variant="outlined"
                            sx={{ borderColor: typeInfo.color, color: typeInfo.color }}
                          />
                          <Chip
                            icon={question.isDescriptive ? <SubjectIcon /> : <ListIcon />}
                            label={question.isDescriptive ? 'Descritiva' : 'Objetiva'}
                            size="small"
                            variant="outlined"
                            sx={{ 
                              borderColor: question.isDescriptive ? PRIMARY_COLOR : SECONDARY_COLOR, 
                              color: question.isDescriptive ? PRIMARY_COLOR : SECONDARY_COLOR 
                            }}
                          />
                          {question.createdAt && (
                            <Chip
                              label={new Date(question.createdAt).toLocaleDateString('pt-BR')}
                              size="small"
                              variant="outlined"
                              sx={{ borderColor: '#ccc', color: '#666', fontSize: '0.7rem' }}
                            />
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Dialog para Visualizar Pergunta */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Detalhes da Pergunta
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedQuestion && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ mb: 3, p: 2, bgcolor: LIGHT_BG, borderRadius: 1 }}>
                {selectedQuestion.text}
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">Tipo:</Typography>
                  <Chip
                    icon={getTypeInfo(selectedQuestion.type)?.icon}
                    label={getTypeInfo(selectedQuestion.type)?.label}
                    size="small"
                    sx={{ mt: 0.5 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">Formato:</Typography>
                  <Typography variant="body1">
                    {selectedQuestion.isDescriptive ? 'Descritiva' : 'Objetiva'}
                  </Typography>
                </Grid>
                {selectedQuestion.createdAt && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary">Criada em:</Typography>
                    <Typography variant="body1">
                      {new Date(selectedQuestion.createdAt).toLocaleString('pt-BR')}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>

      {/* Componente de Confirmação para Excluir */}
      <ModalDeleteQuestion
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Excluir Pergunta"
        message="Tem certeza que deseja excluir esta pergunta?"
        confirmText="Excluir Pergunta"
        cancelText="Manter Pergunta"
        itemName={questionToDelete?.text}
        severity="error"
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default QuestionManagement;