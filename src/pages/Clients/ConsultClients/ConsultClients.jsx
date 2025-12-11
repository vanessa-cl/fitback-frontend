import { useEffect, useState } from "react";
import { usePageTitle } from "../../../context/PageTitleContext.jsx";
import * as S from "./ConsultClients.styles.js";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router";
import EditClientModal from "../EditClient/EditClientModal.jsx";
import InactivateClientModal from "../InactivateClient/InactivateClientModal.jsx";
import clienteService from "../../../services/clienteService.js";
import Alert from "@mui/material/Alert";

const rows = [
  {
    id_usuario: 1,
    id_cliente: 101,
    nome: "Ana",
    email: "ana.silva@example.com",
    cpf: "123.456.789-00",
    matricula: "2024001",
    telefone: "11987654321",
    status: "Ativo",
    status_aluno: "Ativo",
    data_cadastro: "2024-01-15",
    data_desistencia: null,
  },
  {
    id_usuario: 2,
    id_cliente: 102,
    nome: "Bruno",
    email: "bruno.souza@example.com",
    cpf: "987.654.321-11",
    matricula: "2024002",
    telefone: "11987654322",
    status: "Inativo",
    status_aluno: "Inativo",
    data_desistencia: null,
    data_cadastro: "2024-02-20",
  },
  {
    id_usuario: 3,
    id_cliente: 103,
    nome: "Carla",
    email: "carla.pereira@example.com",
    cpf: "111.222.333-44",
    matricula: "2024003",
    telefone: "11987654323",
    status: "Ativo",
    status_aluno: "Ativo",
    data_desistencia: null,
    data_cadastro: "2024-03-10",
  },
];

const ConsultClients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState({});
  const [openInactivateModal, setOpenInactivateModal] = useState(false);
  const [detailsMode, setDetailsMode] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const { setTitle } = usePageTitle();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm) {
      clienteService
        .searchClientes(searchTerm)
        .then((response) => {
          setClients(response.data);
        })
        .catch((err) => {
          setSnackbar({
            open: true,
            message: err.response.data.message,
            severity: "error",
          });
        });
    } else {
      fetchClients();
    }
  };

  const fetchClients = async () => {
    try {
      const response = await clienteService.getAllClientes();
      setClients(response.data);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response.data.message,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    if (clients.length === 0) {
      fetchClients();
    }
  }, []);

  useEffect(() => {
    setTitle("Consultar Clientes");
  }, [setTitle]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const inactivateClient = async (client, newClientData) => {
    if (!client) return;
    await clienteService
      .updateCliente(client.id_cliente, {
        data_desistencia: new Date().toISOString().split("T")[0],
        ...newClientData,
      })
      .then(() => {
        fetchClients();
        setSnackbar({
          open: true,
          message: "Cliente atualizado com sucesso!",
          severity: "success",
        });
      })
      .catch((err) => {
        setSnackbar({
          open: true,
          message: err.response.data.message || err.response.data.error,
          severity: "error",
        });
      });
    setSelectedClient(null);
    setOpenInactivateModal(false);
  };

  const columns = [
    {
      field: "nome",
      headerName: "Nome Completo",
      flex: 1.5,
      minWidth: 200,
    },
    {
      field: "email",
      headerName: "E-mail",
      flex: 1.5,
      minWidth: 200,
    },
    {
      field: "cpf",
      headerName: "CPF",
      flex: 1,
      minWidth: 140,
    },
    {
      field: "data_cadastro",
      headerName: "Data do Cadastro",
      flex: 1,
      minWidth: 160,
      valueGetter: (params) => params.row.data_cadastro,
      renderCell: (params) =>
        new Date(params.value).toLocaleDateString("pt-BR"),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => {
        const s = params.value;
        const style = {
          display: "inline-block",
          padding: "4px 8px",
          borderRadius: 12,
          background:
            s === "ativo"
              ? "rgba(76, 175, 80, 0.12)"
              : "rgba(244, 67, 54, 0.08)",
          color: s === "ativo" ? "#2e7d32" : "#c62828",
          fontWeight: 500,
          fontSize: 13,
        };
        return (
          <span className="status-span" style={style}>
            {s}
          </span>
        );
      },
    },
    {
      field: "actions",
      headerName: "Ações",
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      flex: 0.9,
      minWidth: 160,
      renderCell: (params) => {
        return (
          <S.ActionsContainer>
            <Switch
              checked={params.row.status === "ativo"}
              onChange={() => {
                setSelectedClient(params.row);
                if (params.row.status === "ativo") {
                  setOpenInactivateModal(true);
                } else {
                  updateClient(params.row, {
                    status: "ativo",
                  });
                }
              }}
              color="primary"
            />
            <IconButton
              size="small"
              color="primary"
              onClick={() => {
                setOpenEditModal(true);
                setSelectedClient(params.row);
              }}
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => {
                setOpenEditModal(true);
                setSelectedClient(params.row);
                setDetailsMode(true);
              }}
            >
              <VisibilityOutlinedIcon fontSize="small" />
            </IconButton>
          </S.ActionsContainer>
        );
      },
    },
  ];

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <S.ConsultClientsContainer>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <S.SearchContainer
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <S.SearchInput
          variant="filled"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar cliente por nome ou CPF..."
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <Button
          id="search-button"
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
          type="submit"
        >
          Pesquisar
        </Button>
        <Button
          id="new-client-button"
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/cadastrar-cliente")}
        >
          Novo Cliente
        </Button>
      </S.SearchContainer>

      <S.ClientsList>
        <Table>
          <S.ClientTableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field}>{column.headerName}</TableCell>
              ))}
            </TableRow>
          </S.ClientTableHead>
          <TableBody>
            {clients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  Nenhum cliente encontrado.
                </TableCell>
              </TableRow>
            ) : (
              clients.map((row) => (
                <TableRow key={row.id_cliente}>
                  {columns.map((column) => (
                    <TableCell key={column.field}>
                      {column.renderCell
                        ? column.renderCell({ value: row[column.field], row })
                        : row[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </S.ClientsList>
      <InactivateClientModal
        open={openInactivateModal}
        onClose={() => setOpenInactivateModal(false)}
        client={selectedClient}
        inactivateClient={inactivateClient}
      />
      <EditClientModal
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        client={selectedClient}
        detailsMode={detailsMode}
        setDetailsMode={setDetailsMode}
        fetchClients={fetchClients}
        setSelectedClient={setSelectedClient}
        setSnackbar={setSnackbar}
      />
    </S.ConsultClientsContainer>
  );
};

export default ConsultClients;
