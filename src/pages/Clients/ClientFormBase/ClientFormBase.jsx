import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { formatCPF } from "../../../utils/formatters/formatCPF.js";
import { formatPhone } from "../../../utils/formatters/formatPhone.js";
import ClearIcon from "@mui/icons-material/Clear";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormLayout from "../../../layouts/FormLayout/FormLayout.jsx";
import * as S from "./ClientFormBase.styles.js";
import CancelTwoTone from "@mui/icons-material/CancelTwoTone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const ClientFormBase = ({
  formClient,
  setFormClient,
  editMode,
  handleSubmit,
  handleClearFields,
  helperText,
  setOpenFormDialog,
}) => {
  const [initialData, setInitialData] = useState(formClient);
  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleClickShowPassword = (field) =>
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleHasChanged = () => {
    if (!editMode) return false;
    return JSON.stringify(formClient) !== JSON.stringify(initialData);
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <S.FormGrid editmode={editMode}>
        <TextField
          id="name-input"
          name="name-input"
          value={formClient.nome}
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
        {editMode ? (
          <></>
        ) : (
          <S.FormRow>
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
                        {visibility.password ? (
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
            <TextField
              id="confirm-password-input"
              name="confirm-password-input"
              type={visibility.confirmarSenha ? "text" : "password"}
              value={formClient.confirmarSenha}
              onChange={(e) =>
                setFormClient({
                  ...formClient,
                  confirmarSenha: e.target.value,
                })
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
                        onClick={() =>
                          handleClickShowPassword("confirmarSenha")
                        }
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
          </S.FormRow>
        )}
      </S.FormGrid>
      {editMode ? (
        <S.ActionRow>
          <Button
            id="cancel-button"
            name="cancel-button"
            startIcon={<CancelTwoTone />}
            variant="outlined"
            color="secondary"
            onClick={() => {
              handleClearFields();
              setOpenFormDialog(false);
              setInitialData({});
            }}
          >
            Cancelar
          </Button>
          <Button
            id="save-changes-button"
            name="save-changes-button"
            startIcon={<EditOutlinedIcon />}
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            disabled={!handleHasChanged()}
          >
            Salvar Alterações
          </Button>
        </S.ActionRow>
      ) : (
        <S.ActionRow>
          <Button
            id="back-button"
            name="back-button"
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            color="secondary"
            onClick={() => {
              handleClearFields();
              setOpenFormDialog(false);
              setInitialData({});
            }}
          >
            Voltar
          </Button>
          <Button
            id="register-button"
            name="register-button"
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            Cadastrar
          </Button>
        </S.ActionRow>
      )}
    </FormLayout>
  );
};

export default ClientFormBase;
