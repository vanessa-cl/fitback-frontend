import { useEffect, useState } from "react";
import { DialogWrapper } from "./EditClientDialog.styles.js";
import clienteService from "../../../services/clienteService.js";
import { formatCPF, formatPhone } from "../../../utils/index.js";
import ClientFormBase from "../ClientFormBase/ClientFormBase.jsx";

const INITIAL_FORM_STATE = {
  nome: "",
  cpf: "",
  matricula: "",
  email: "",
  telefone: "",
};

const EditClientDialog = ({
  openFormDialog,
  setOpenFormDialog,
  client,
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

  const handleClearFields = () => {
    setSelectedClient(null);
    setHelperText({});
  };

  const handleSubmit = async (newClientData) => {
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
          setOpenFormDialog(false);
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
    <DialogWrapper
      open={openFormDialog}
      onClose={() => setOpenFormDialog(false)}
    >
      <h3>Editar Cliente</h3>
      <ClientFormBase
        formClient={formClient}
        setFormClient={setFormClient}
        editMode={true}
        handleSubmit={handleSubmit}
        handleClearFields={handleClearFields}
        helperText={helperText}
        setOpenFormDialog={setOpenFormDialog}
      />
    </DialogWrapper>
  );
};

export default EditClientDialog;
