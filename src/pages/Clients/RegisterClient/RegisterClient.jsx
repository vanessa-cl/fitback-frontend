import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { usePageTitle } from "../../../context/PageTitleContext.jsx";
import * as S from "./RegisterClient.styles.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import clienteService from "../../../services/clienteService.js";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const INITIAL_FORM_STATE = {
  nome: "",
  cpf: "",
  matricula: "",
  email: "",
  telefone: "",
  senha: "",
  confirmarSenha: "",
};

const RegisterClient = () => {
  const [formClient, setFormClient] = useState(INITIAL_FORM_STATE);
  const { setTitle } = usePageTitle();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    setTitle("Cadastrar Cliente");
  }, [setTitle]);

  const checkFormValidity = () => {
    return (
      Object.values(formClient).every((value) => value.trim() !== "") &&
      formClient.senha === formClient.confirmarSenha
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await clienteService
      .createCliente(formClient)
      .then((response) => {
        setFormClient(INITIAL_FORM_STATE);
        setSnackbar({
          open: true,
          message: "Cliente cadastrado com sucesso!",
          severity: "success",
        });
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: error.response.data.message || "Erro ao cadastrar cliente",
          severity: "error",
        });
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div>
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
      <S.RegisterClientForm onSubmit={handleSubmit}>
        <S.FormGrid>
          <TextField
            id="name-input"
            name="name-input"
            value={formClient.nome}
            className="name-input"
            onChange={(e) =>
              setFormClient({ ...formClient, nome: e.target.value })
            }
            label="Nome"
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            id="cpf-input"
            name="cpf-input"
            value={formClient.cpf}
            onChange={(e) =>
              setFormClient({ ...formClient, cpf: e.target.value })
            }
            label="CPF"
            variant="outlined"
            margin="normal"
            required
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
            required
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
            required
          />
          <TextField
            id="phone-input"
            name="phone-input"
            value={formClient.telefone}
            onChange={(e) =>
              setFormClient({ ...formClient, telefone: e.target.value })
            }
            label="Telefone"
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            id="password-input"
            name="password-input"
            type="password"
            value={formClient.senha}
            onChange={(e) =>
              setFormClient({ ...formClient, senha: e.target.value })
            }
            label="Senha"
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            id="confirm-password-input"
            name="confirm-password-input"
            type="password"
            value={formClient.confirmarSenha}
            onChange={(e) =>
              setFormClient({ ...formClient, confirmarSenha: e.target.value })
            }
            label="Repita a Senha"
            variant="outlined"
            margin="normal"
            required
          />
        </S.FormGrid>
        <S.ActionRow>
          <Button
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            color="secondary"
          >
            Voltar
          </Button>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            disabled={!checkFormValidity()}
            type="submit"
            onClick={handleSubmit}
          >
            Cadastrar
          </Button>
        </S.ActionRow>
      </S.RegisterClientForm>
    </div>
  );
};

export default RegisterClient;
