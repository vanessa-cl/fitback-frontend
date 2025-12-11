import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { usePageTitle } from "../../../context/PageTitleContext.jsx";
import * as S from "./RegisterClient.styles.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import clienteService from "../../../services/clienteService.js";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router";
import { formatCPF } from "../../../utils/formatters/formatCPF.js";
import { formatPhone } from "../../../utils/formatters/formatPhone.js";
import ClearIcon from "@mui/icons-material/Clear";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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
  const navigate = useNavigate();
  const [helperText, setHelperText] = useState({});
  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    setTitle("Cadastrar Cliente");
  }, [setTitle]);

  const handleClickShowPassword = (field) =>
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));

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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div>
      {console.log(formClient)}
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
          <TextField
            id="password-input"
            name="password-input"
            type={visibility.password ? "text" : "password"}
            value={formClient.senha}
            onChange={(e) =>
              setFormClient({ ...formClient, senha: e.target.value })
            }
            label="Senha"
            variant="outlined"
            margin="normal"
            error={!!helperText.senha}
            helperText={helperText.senha}
            required
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleClickShowPassword("password")}
                    >
                      {visibility.password ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
              htmlInput: {
                minLength: 8,
                maxLength: 50,
              },
            }}
          />
          <TextField
            id="confirm-password-input"
            name="confirm-password-input"
            type={visibility.confirmarSenha ? "text" : "password"}
            value={formClient.confirmarSenha}
            onChange={(e) =>
              setFormClient({ ...formClient, confirmarSenha: e.target.value })
            }
            label="Repita a Senha"
            variant="outlined"
            margin="normal"
            error={!!helperText.confirmarSenha}
            helperText={helperText.confirmarSenha}
            required
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleClickShowPassword("confirmarSenha")}
                    >
                      {visibility.confirmarSenha ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
              htmlInput: {
                minLength: 8,
                maxLength: 50,
              },
            }}
          />
        </S.FormGrid>
        <S.ActionRow>
          <Button
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/consultar-clientes")}
          >
            Voltar
          </Button>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
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
