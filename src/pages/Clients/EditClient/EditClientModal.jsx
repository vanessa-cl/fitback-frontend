import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import * as S from "../RegisterClient/RegisterClient.styles.js";
import * as T from "./EditClientModal.styles.js";
import { DialogWrapper } from "./EditClientModal.styles.js";
import CheckTwoTone from "@mui/icons-material/CheckTwoTone";
import CancelTwoTone from "@mui/icons-material/CancelTwoTone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import clienteService from "../../../services/clienteService.js";
import ClearIcon from "@mui/icons-material/Clear";
import { formatCPF, formatPhone } from "../../../utils/index.js";

const INITIAL_FORM_STATE = {
  nome: "",
  cpf: "",
  matricula: "",
  email: "",
  telefone: "",
  senha: "",
  confirmarSenha: "",
};

const EditClientModal = ({
  openEditModal,
  setOpenEditModal,
  client,
  detailsMode,
  setDetailsMode,
  fetchClients,
  setSelectedClient,
  setSnackbar,
}) => {
  const [formClient, setFormClient] = useState(INITIAL_FORM_STATE);
  const [helperText, setHelperText] = useState({});

  useEffect(() => {
    setFormClient({
      nome: client?.nome || "",
      cpf: client?.cpf ? formatCPF(client.cpf) : "",
      matricula: client?.matricula || "",
      email: client?.email || "",
      telefone: client?.telefone ? formatPhone(client.telefone) : "",
    });
  }, [client]);

  const updateClient = async (client, newClientData) => {
    if (!client) return;
    await clienteService
      .updateCliente(client.id_cliente, {
        ...client,
        ...newClientData,
      })
      .then(() => {
        fetchClients();
        setSnackbar({
          open: true,
          message: "Cliente atualizado com sucesso!",
          severity: "success",
        });
        setTimeout(() => {
          setOpenEditModal(false);
          setSelectedClient(null);
        }, 6000);
      })
      .catch((err) => {
        if (err.response?.data?.validationErrors) {
          return setHelperText(err.response?.data?.validationErrors);
        }
        setSnackbar({
          open: true,
          message: err.response.data.message || err.response.data.error,
          severity: "error",
        });
      });
  };

  return (
    <DialogWrapper open={openEditModal} onClose={() => setOpenEditModal(false)}>
      <h3>{detailsMode ? "Detalhes do Cliente" : "Editar Cliente"}</h3>
      {console.log(helperText)}
      {console.log(formClient)}
      <S.RegisterClientForm>
        <T.ClientDetailsForm>
          <TextField
            id="first-name-input"
            name="first-name-input"
            value={formClient.nome}
            className="first-name-input"
            onChange={(e) =>
              setFormClient({ ...formClient, nome: e.target.value })
            }
            label="Nome"
            variant="outlined"
            margin="normal"
            readOnly={detailsMode}
            disabled={detailsMode}
            required
            error={!!helperText.nome}
            helperText={helperText.nome}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setFormClient((prev) => ({ ...prev, nome: "" }))
                      }
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
              htmlInput: {
                minLength: 3,
                maxLength: 100,
              },
            }}
          />
          <TextField
            id="cpf-input"
            name="cpf-input"
            value={formClient.cpf}
            onChange={(e) =>
              setFormClient({ ...formClient, cpf: formatCPF(e.target.value) })
            }
            label="CPF"
            variant="outlined"
            margin="normal"
            readOnly={detailsMode}
            disabled={detailsMode}
            error={!!helperText.cpf}
            helperText={helperText.cpf}
            required
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setFormClient((prev) => ({ ...prev, cpf: "" }))
                      }
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
              htmlInput: {
                minLength: 14,
                maxLength: 14,
              },
            }}
          />
          <TextField
            id="registration-input"
            name="registration-input"
            value={formClient.matricula}
            onChange={(e) =>
              setFormClient({ ...formClient, matricula: e.target.value })
            }
            label="Matrícula"
            variant="outlined"
            margin="normal"
            readOnly={detailsMode}
            disabled={detailsMode}
            error={!!helperText.matricula}
            helperText={helperText.matricula}
            required
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setFormClient((prev) => ({ ...prev, matricula: "" }))
                      }
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
              htmlInput: {
                minLength: 3,
                maxLength: 20,
              },
            }}
          />
          <TextField
            id="email-input"
            name="email-input"
            value={formClient.email}
            onChange={(e) =>
              setFormClient({ ...formClient, email: e.target.value })
            }
            label="Email"
            variant="outlined"
            margin="normal"
            readOnly={detailsMode}
            disabled={detailsMode}
            error={!!helperText.email}
            helperText={helperText.email}
            required
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setFormClient((prev) => ({ ...prev, email: "" }))
                      }
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
              htmlInput: {
                minLength: 5,
                maxLength: 150,
              },
            }}
          />
          <TextField
            id="phone-input"
            name="phone-input"
            value={formClient.telefone}
            onChange={(e) =>
              setFormClient({
                ...formClient,
                telefone: formatPhone(e.target.value),
              })
            }
            label="Telefone"
            variant="outlined"
            margin="normal"
            readOnly={detailsMode}
            disabled={detailsMode}
            error={!!helperText.telefone}
            helperText={helperText.telefone}
            required
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setFormClient((prev) => ({ ...prev, telefone: "" }))
                      }
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
              htmlInput: {
                minLength: 15,
                maxLength: 15,
              },
            }}
          />
        </T.ClientDetailsForm>
        <S.ActionRow>
          <Button
            startIcon={<CancelTwoTone />}
            variant="outlined"
            color="secondary"
            onClick={() => {
              setDetailsMode(false);
            }}
          >
            {detailsMode ? "Fechar" : "Cancelar"}
          </Button>
          <Button
            startIcon={detailsMode ? <EditOutlinedIcon /> : <CheckTwoTone />}
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              setDetailsMode(false);
              if (!detailsMode) {
                updateClient(client, formClient);
              }
            }}
          >
            {detailsMode ? "Editar" : "Salvar Alterações"}
          </Button>
        </S.ActionRow>
      </S.RegisterClientForm>
    </DialogWrapper>
  );
};

export default EditClientModal;
