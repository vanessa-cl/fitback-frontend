import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { usePageTitle } from "../../../context/PageTitleContext.jsx";
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Chip,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  ArrowBack,
  KeyboardArrowUp,
  KeyboardArrowDown,
  Save,
} from '@mui/icons-material';
import questionarioService from '../../../services/questionarioService';
import { styles } from './QuestionnaireOrder.styles';

const QuestionnaireOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { setTitle } = usePageTitle();
  const { perguntas: perguntasIniciais } = location.state || {};

  const [perguntas, setPerguntas] = useState(
    perguntasIniciais?.map((p, index) => ({ ...p, ordem: index + 1 })) || []
  );
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';

    const sorted = [...perguntas].sort((a, b) => {
      if (key === 'id') {
        return direction === 'asc' ? a.id - b.id : b.id - a.id;
      }
      const av = (a[key] || '').toString();
      const bv = (b[key] || '').toString();
      return direction === 'asc'
        ? av.localeCompare(bv, 'pt', { sensitivity: 'base' })
        : bv.localeCompare(av, 'pt', { sensitivity: 'base' });
    });

    const withOrder = sorted.map((p, idx) => ({ ...p, ordem: idx + 1 }));
    setPerguntas(withOrder);
    setSortConfig({ key, direction });
  };

  const moverPergunta = (index, direcao) => {
    const novaPosicao = index + direcao;
    if (novaPosicao < 0 || novaPosicao >= perguntas.length) return;

    const move = (arr, from, to) => {
      const copy = arr.slice();
      const [item] = copy.splice(from, 1);
      copy.splice(to, 0, item);
      return copy.map((p, idx) => ({ ...p, ordem: idx + 1 }));
    };

    setPerguntas((prev) => move(prev, index, novaPosicao));
  };

  const handleSave = async () => {
    if (!id) {
      alert('ID do modelo não encontrado. Volte e tente novamente.');
      return;
    }

    const payload = perguntas.map(p => ({ id_pergunta: p.id, ordem: p.ordem }));

    try {
      await questionarioService.saveModeloPerguntas(id, payload);
      alert('Questionário salvo com sucesso!');
      navigate('/consultar-questionario', { replace: true });
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar ordem das perguntas');
    }
  };

  useEffect(() => {
    setTitle("Cadastrar Questionário");
  }, [setTitle]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!id) return;

      // se não recebemos perguntas via navigation state, buscar do backend
      if (!perguntasIniciais || perguntasIniciais.length === 0) {
        try {
          const resPerg = await questionarioService.getModeloPerguntas(id);
          if (mounted) {
            const perguntasApi = (resPerg.data || []).map((p, idx) => ({
              id: p.id_pergunta,
              conteudo: p.conteudo,
              tipo: p.tipo,
              categoria: p.categoria,
              ordem: p.ordem || idx + 1,
            }));
            setPerguntas(perguntasApi);
          }
        } catch {
          // ignore
        }
      }
    })();

    return () => { mounted = false; };
  }, [id, perguntasIniciais]);

  const content = (
    <Box sx={styles.container}>
      <Typography variant="h6" sx={styles.sectionTitle}>
        3 - Perguntas selecionadas em ordem de exibição, arraste uma linha e solte para alterar a ordem:
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={styles.tableHeaderRow}>
              <TableCell width="120">
                <strong>Código</strong>
                <IconButton size="small" onClick={() => handleSort('id')} sx={{ ml: 1 }}>
                  <KeyboardArrowDown sx={{ transform: sortConfig.key === 'id' && sortConfig.direction === 'asc' ? 'rotate(180deg)' : 'none' }} />
                </IconButton>
              </TableCell>
              <TableCell>
                <strong>Categoria</strong>
                <IconButton size="small" onClick={() => handleSort('categoria')} sx={{ ml: 1 }}>
                  <KeyboardArrowDown sx={{ transform: sortConfig.key === 'categoria' && sortConfig.direction === 'asc' ? 'rotate(180deg)' : 'none' }} />
                </IconButton>
              </TableCell>
              <TableCell>
                <strong>Tipo</strong>
                <IconButton size="small" onClick={() => handleSort('tipo')} sx={{ ml: 1 }}>
                  <KeyboardArrowDown sx={{ transform: sortConfig.key === 'tipo' && sortConfig.direction === 'asc' ? 'rotate(180deg)' : 'none' }} />
                </IconButton>
              </TableCell>
              <TableCell>
                <strong>Pergunta</strong>
                <IconButton size="small" onClick={() => handleSort('conteudo')} sx={{ ml: 1 }}>
                  <KeyboardArrowDown sx={{ transform: sortConfig.key === 'conteudo' && sortConfig.direction === 'asc' ? 'rotate(180deg)' : 'none' }} />
                </IconButton>
              </TableCell>
              <TableCell align="center" width="120">
                <strong>Ações</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {perguntas.map((pergunta, index) => (
              <TableRow key={pergunta.id} hover sx={styles.tableRow}>
                <TableCell>{pergunta.id}</TableCell>
                <TableCell>{pergunta.categoria}</TableCell>
                <TableCell>{pergunta.tipo}</TableCell>
                <TableCell>{pergunta.conteudo}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" onClick={() => moverPergunta(index, -1)} disabled={index === 0}><KeyboardArrowUp /></IconButton>
                  <IconButton size="small" onClick={() => moverPergunta(index, 1)} disabled={index === perguntas.length - 1}><KeyboardArrowDown /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={styles.navigationContainer}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={styles.backButton}>Voltar</Button>
        <Button variant="contained" startIcon={<Save />} onClick={handleSave} sx={styles.saveButton}>Salvar Questionário</Button>
      </Box>
    </Box>
  );

  if (!perguntas.length) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Por favor, selecione as perguntas primeiro.</Typography>
        <Button sx={{ mt: 2, color: '#B25E09', border: '1px solid #B25E09' }} startIcon={<ArrowBack />} onClick={() => navigate(-1)}>Voltar</Button>
      </Box>
    );
  }

  return content;
};

export default QuestionnaireOrder;
