import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePageTitle } from "../../../context/PageTitleContext.jsx";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { ArrowBack, ArrowForward, RadioButtonUnchecked, CheckCircle } from "@mui/icons-material";
import questionarioService from "../../../services/questionarioService";
import { styles } from "./RegisterQuestionnaire.styles";

const RegisterQuestionnaire = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const editModelId = id;
  const { setTitle } = usePageTitle();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [perguntasFiltradas, setPerguntasFiltradas] = useState([]);
  const [perguntasSelecionadas, setPerguntasSelecionadas] = useState([]);

  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [filtroTipo, setFiltroTipo] = useState("Todas");

  const [categorias, setCategorias] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setTitle(editModelId ? "Editar Questionário" : "Cadastrar Questionário");
  }, [setTitle, editModelId]);

  useEffect(() => {
      let mounted = true;

      (async () => {
        // carregar categorias
        try {
          const resCat = await questionarioService.getCategorias();
          if (mounted) setCategorias(resCat.data || []);
        } catch {
          if (mounted) setCategorias([]);
        }

        // carregar perguntas iniciais (usa aplicarFiltros internamente)
        await aplicarFiltros();

        // se for edição, carregar modelo e perguntas já salvas
        if (editModelId) {
          try {
            const resModel = await questionarioService.getModelo(editModelId);
            if (mounted) {
              const modelo = resModel.data || {};
              setTitulo(modelo.nome || "");
              setDescricao(modelo.descricao || "");
            }
          } catch {
            // ignore
          }

          try {
            const resModelPerg = await questionarioService.getModeloPerguntas(editModelId);
            if (mounted) {
              const perguntas = resModelPerg.data || [];
              setPerguntasSelecionadas(
                perguntas.map((p) => ({ id: p.id_pergunta, conteudo: p.conteudo, tipo: p.tipo, categoria: p.categoria, ordem: p.ordem }))
              );
            }
          } catch {
            // ignore
          }
        }
      })();

      return () => {
        mounted = false;
      };
    }, [editModelId]);

  // carrega perguntas com filtros (se nenhum parâmetro for passado, usa os estados atuais)
  const aplicarFiltros = async ({ search = filtroNome, categoria = filtroCategoria, tipo = filtroTipo } = {}) => {
    try {
      const res = await questionarioService.getPerguntas({ search, categoria, tipo });
      setPerguntasFiltradas(res.data || []);
    } catch {
      setPerguntasFiltradas([]);
    }
  };

  const togglePergunta = (pergunta) => {
    const jaExiste = perguntasSelecionadas.find(p => p.id === pergunta.id_pergunta);
    if (jaExiste) {
      setPerguntasSelecionadas(prev => prev.filter(p => p.id !== pergunta.id_pergunta));
    } else {
      setPerguntasSelecionadas(prev => [...prev, { id: pergunta.id_pergunta, conteudo: pergunta.conteudo, tipo: pergunta.tipo, categoria: pergunta.categoria }]);
    }
  };

  //----------------------------------------------------------------------------------------- botão próxima etapa
  const handleNext = async () => {
    if (!titulo.trim()) {
      alert("Por favor, insira um título para o questionário");
      return;
    }
    if (perguntasSelecionadas.length === 0) {
      alert("Por favor, selecione pelo menos uma pergunta");
      return;
    }

    try {
      let id_modelo = editModelId;
      if (!editModelId) {
        const payload = { nome: titulo, descricao };
        const res = await questionarioService.createModelo(payload);
        console.log('Resposta createModelo:', res);

        // extrair id 
        id_modelo = res?.data?.id ?? res?.data?.insertId ?? res?.data ?? null;
        // se a API retornar apenas o objeto criado sem id, tentar inspecionar status/data
        if (!id_modelo && res && typeof res === 'object' && res.data && typeof res.data === 'object') {
          id_modelo = res.data.id ?? res.data.insertId ?? res.data.insert_id ?? null;
        }

        if (!id_modelo) {
          console.error('Não foi possível obter o id do modelo criado:', res);
          alert('Erro ao criar o questionário (id não retornado). Verifique o console para mais detalhes.');
          return;
        }
      } else {
        // atualizar nome/descricao
        await questionarioService.updateModelo(editModelId, { nome: titulo, descricao });
      }

      // garantir id como string/number e navegar para ordenação
      id_modelo = typeof id_modelo === 'object' ? JSON.stringify(id_modelo) : String(id_modelo);
      console.log('Navegando para ordenar-questionario com id:', id_modelo);
      navigate(`/ordenar-questionario/${id_modelo}`, { state: { perguntas: perguntasSelecionadas } });
    } catch (err) {
      console.error('Erro em handleNext:', err);
      const msg = err?.response?.data?.message || err?.message || 'Erro ao criar/atualizar o modelo';
      alert(msg);
    }
  };

  //----------------------------------------------------------------------------------------- 

  return (
    <Box sx={styles.container}>

      <Typography variant="h6" sx={styles.sectionTitle}>
        1 - Preencha os dados do questionário:
      </Typography>

      <Box sx={styles.formSection}>
        <TextField
          label="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />
      </Box>

      <Typography variant="h6" sx={styles.sectionTitle}>
        2 - Selecione as perguntas que farão parte do questionário:
      </Typography>

      <Box sx={styles.filterSection}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Buscar por conteúdo"
              value={filtroNome}
              onChange={(e) => { 
                setFiltroNome(e.target.value); 
                aplicarFiltros({ search: e.target.value }); 
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Categoria</InputLabel>
              <Select
                value={filtroCategoria}
                label="Categoria"
                onChange={(e) => { setFiltroCategoria(e.target.value); aplicarFiltros({ categoria: e.target.value }); }}
              >
                <MenuItem value="Todas">Todas</MenuItem>
                {categorias.map(cat => (
                  <MenuItem key={cat.id_categoria} value={cat.nome}>{cat.nome}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Pergunta</InputLabel>
              <Select
                value={filtroTipo}
                label="Tipo de Pergunta"
                onChange={(e) => { setFiltroTipo(e.target.value); aplicarFiltros({ tipo: e.target.value }); }}
              >
                <MenuItem value="Todas">Todas</MenuItem>
                <MenuItem value="aberta">Aberta</MenuItem>
                <MenuItem value="multipla_escolha">Múltipla Escolha</MenuItem>
                <MenuItem value="escala">Escala</MenuItem>
                <MenuItem value="outro">Outro</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={styles.tableHeaderRow}>
              <TableCell width="50">
                <strong>Seleção</strong>
              </TableCell>
              <TableCell width="80">
                <strong>Código</strong>
              </TableCell>
              <TableCell>
                <strong>Pergunta</strong>
              </TableCell>
              <TableCell>
                <strong>Categoria</strong>
              </TableCell>
              <TableCell>
                <strong>Tipo</strong>
              </TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {perguntasFiltradas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((pergunta) => {
                  const selecionada = perguntasSelecionadas.some(p => p.id === pergunta.id_pergunta);
                  return (
                    <TableRow 
                      key={pergunta.id_pergunta} 
                      hover
                      onClick={() => togglePergunta(pergunta)}
                      sx={selecionada ? styles.selectedRow : styles.tableRow}
                    >
                      <TableCell>
                        {selecionada ? (
                          <CheckCircle sx={styles.checkIcon} />
                        ) : (
                          <RadioButtonUnchecked sx={styles.uncheckedIcon} />
                        )}
                      </TableCell>
                      <TableCell>{pergunta.id_pergunta}</TableCell>
                      <TableCell>{pergunta.conteudo}</TableCell>
                      <TableCell>{pergunta.categoria}</TableCell>
                      <TableCell>{pergunta.tipo}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={perguntasFiltradas.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Linhas por página:"
        />
      <Box sx={styles.buttonContainer}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/consultar-questionario')} sx={styles.backButton}>Voltar</Button>
        <Button variant="contained" endIcon={<ArrowForward />} onClick={handleNext} sx={styles.nextButton}>Próxima Etapa</Button>
      </Box>
    </Box>
  );
};

export default RegisterQuestionnaire;
