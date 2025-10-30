import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import * as S from "../RegisterClient/RegisterClient.styles.js";
import * as T from "./EditClientModal.styles.js"
import { DialogWrapper } from "./EditClientModal.styles.js";
import CheckTwoTone from "@mui/icons-material/CheckTwoTone";
import CancelTwoTone from "@mui/icons-material/CancelTwoTone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

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
  updateClient,
}) => {
  const [formClient, setFormClient] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    setFormClient({
      nome: client?.nome || "",
      cpf: client?.cpf || "",
      matricula: client?.matricula || "",
      email: client?.email || "",
      telefone: client?.telefone || "",
    });
  }, [client]);

  return (
    <DialogWrapper open={openEditModal} onClose={() => setOpenEditModal(false)}>
      <h3>{detailsMode ? "Detalhes do Cliente" : "Editar Cliente"}</h3>
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
            label="Nome*"
            variant="outlined"
            margin="normal"
            readOnly={detailsMode}
            disabled={detailsMode}
          />
          <TextField
            id="cpf-input"
            name="cpf-input"
            value={formClient.cpf}
            onChange={(e) =>
              setFormClient({ ...formClient, cpf: e.target.value })
            }
            label="CPF*"
            variant="outlined"
            margin="normal"
            readOnly={detailsMode}
            disabled={detailsMode}
          />
          <TextField
            id="registration-input"
            name="registration-input"
            value={formClient.matricula}
            onChange={(e) =>
              setFormClient({ ...formClient, matricula: e.target.value })
            }
            label="Matrícula*"
            variant="outlined"
            margin="normal"
            readOnly={detailsMode}
            disabled={detailsMode}
          />
          <TextField
            id="email-input"
            name="email-input"
            value={formClient.email}
            onChange={(e) =>
              setFormClient({ ...formClient, email: e.target.value })
            }
            label="Email*"
            variant="outlined"
            margin="normal"
            readOnly={detailsMode}
            disabled={detailsMode}
          />
          <TextField
            id="phone-input"
            name="phone-input"
            value={formClient.telefone}
            onChange={(e) =>
              setFormClient({ ...formClient, telefone: e.target.value })
            }
            label="Telefone*"
            variant="outlined"
            margin="normal"
            readOnly={detailsMode}
            disabled={detailsMode}
          />
        </T.ClientDetailsForm>
        <S.ActionRow>
          <Button
            startIcon={<CancelTwoTone />}
            variant="outlined"
            color="secondary"
            onClick={() => {
              setOpenEditModal(false);
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
                setOpenEditModal(false);
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
