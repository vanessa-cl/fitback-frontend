import { useEffect, useState } from "react";
import { usePageTitle } from "../../../context/PageTitleContext.jsx";
import * as S from "./RegisterClientDialog.styles.js";
import clienteService from "../../../services/clienteService.js";
import ClientFormBase from "../ClientFormBase/ClientFormBase.jsx";

const INITIAL_FORM_STATE = {
  nome: "",
  cpf: "",
  matricula: "",
  email: "",
  telefone: "",
  senha: "",
  confirmarSenha: "",
};

const RegisterClientDialog = ({
  openFormDialog,
  setOpenFormDialog,
  fetchClients,
  setSnackbar,
}) => {
  const [formClient, setFormClient] = useState(INITIAL_FORM_STATE);
  const [helperText, setHelperText] = useState({});

  const handleClearFields = () => {
    setFormClient(INITIAL_FORM_STATE);
    setHelperText({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHelperText({});
    await clienteService
      .createCliente(formClient)
      .then((res) => {
        setFormClient(INITIAL_FORM_STATE);
        setSnackbar({
          open: true,
          message: "Cliente cadastrado com sucesso!",
          severity: "success",
        });
        setTimeout(() => {
          fetchClients();
          setOpenFormDialog(false);
        }, 6000);
      })
      .catch((err) => {
        if (err.response?.data?.validationErrors) {
          return setHelperText(err.response?.data?.validationErrors);
        }
        setSnackbar({
          open: true,
          message: err.response.data.error || "Erro ao cadastrar cliente",
          severity: "error",
        });
      });
  };

  return (
    <S.DialogWrapper
      open={openFormDialog}
      onClose={() => setOpenFormDialog(false)}
    >
      <h3>Cadastrar Novo Cliente</h3>
      {console.log(formClient)}
      <ClientFormBase
        formClient={formClient}
        setFormClient={setFormClient}
        editMode={false}
        handleSubmit={handleSubmit}
        handleClearFields={handleClearFields}
        helperText={helperText}
        setOpenFormDialog={setOpenFormDialog}
      />
    </S.DialogWrapper>
  );
};

export default RegisterClientDialog;
