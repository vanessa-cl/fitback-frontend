import { useEffect, useState } from "react";
import { usePageTitle } from "../../../context/PageTitleContext.jsx";
import * as S from "./ClientsManagement.styles.js";
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
import EditClientDialog from "../EditClient/EditClientDialog.jsx";
import InactivateClientModal from "../InactivateClient/InactivateClientDialog.jsx";
import clienteService from "../../../services/clienteService.js";
import Alert from "@mui/material/Alert";
import RegisterClientDialog from "../RegisterClient/RegisterClientDialog.jsx";
import { formatCPF } from "../../../utils/index.js";
import ClientDetailsDialog from "../ClientDetails/ClientDetailsDialog.jsx";

const ClientsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [openInactivateModal, setOpenInactivateModal] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const { setTitle } = usePageTitle();

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
    await clienteService
      .getAllClientes()
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
  };

  useEffect(() => {
    if (clients.length === 0) {
      fetchClients();
    }
  }, []);

  useEffect(() => {
    setTitle("Consultar Clientes");
  }, []);

  const handleSearchChange = (e) => {
    if (e.target.value === "") {
      fetchClients();
    }
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
      valueGetter: (params) => params.row.cpf,
      renderCell: (params) => formatCPF(params.value),
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
                  inactivateClient(params.row, {
                    status: "ativo",
                    data_desistencia: null,
                  });
                }
              }}
              color="primary"
            />
            <IconButton
              size="small"
              color="primary"
              onClick={() => {
                setOpenEditDialog(true);
                setSelectedClient(params.row);
              }}
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => {
                setOpenDetailsDialog(true);
                setSelectedClient(params.row);
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
          name="search-button"
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
          name="new-client-button"
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenFormDialog(true)}
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
                  Nenhum cliente encontrado para os filtros aplicados.
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
      <RegisterClientDialog
        openFormDialog={openFormDialog}
        setOpenFormDialog={setOpenFormDialog}
        fetchClients={fetchClients}
        setSnackbar={setSnackbar}
      />
      <InactivateClientModal
        open={openInactivateModal}
        onClose={() => setOpenInactivateModal(false)}
        client={selectedClient}
        inactivateClient={inactivateClient}
      />

      <EditClientDialog
        openFormDialog={openEditDialog}
        setOpenFormDialog={setOpenEditDialog}
        client={selectedClient}
        fetchClients={fetchClients}
        setSelectedClient={setSelectedClient}
        setSnackbar={setSnackbar}
      />
      {selectedClient && (
        <ClientDetailsDialog
          open={openDetailsDialog}
          onClose={() => setOpenDetailsDialog(false)}
          client={selectedClient}
        />
      )}
    </S.ConsultClientsContainer>
  );
};

export default ClientsManagement;
