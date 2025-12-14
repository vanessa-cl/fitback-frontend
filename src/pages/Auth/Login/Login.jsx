import { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Fade,
  Zoom,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Lock,
  Email,
  FitnessCenter,
  DirectionsRun,
  CheckCircle,
} from "@mui/icons-material";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const FeatureItem = ({ icon, text }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
        p: 1.5,
        borderRadius: 2,
        backgroundColor: alpha(theme.palette.primary.main, 0.05),
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          transform: "translateX(8px)",
        },
      }}
    >
      <CheckCircle
        sx={{
          color: theme.palette.success.main,
          mr: 2,
          fontSize: 20,
        }}
      />
      <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
        {text}
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Zoom in={true} timeout={800}>
          <Card
            elevation={8}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              background: "white",
              backdropFilter: "blur(20px)",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Box
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                color: "white",
                textAlign: "center",
                py: 4,
                px: 2,
              }}
            >
              <FitnessCenter
                sx={{
                  fontSize: 48,
                  mb: 2,
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                }}
              />
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  letterSpacing: "-0.5px",
                }}
              >
                Bem-vindo ao FitBack!
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  opacity: 0.9,
                  fontWeight: 300,
                }}
              >
                Entre em sua conta para acessar o sistema
              </Typography>
            </Box>

            <CardContent sx={{ p: 4 }}>
              <Fade in={true} timeout={1000}>
                <Alert
                  severity="info"
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.info.main, 0.1),
                  }}
                  icon={<DirectionsRun />}
                >
                  Acesse sua conta para gerenciar os feedbacks
                </Alert>
              </Fade>

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Fade
                  in={true}
                  timeout={800}
                  style={{ transitionDelay: "200ms" }}
                >
                  <Box>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      variant="outlined"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email
                              sx={{
                                color: errors.email
                                  ? theme.palette.error.main
                                  : theme.palette.primary.main,
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      placeholder="seu@email.com"
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      label="Senha"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      value={formData.password}
                      onChange={handleChange}
                      error={!!errors.password}
                      helperText={errors.password}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock
                              sx={{
                                color: errors.password
                                  ? theme.palette.error.main
                                  : theme.palette.primary.main,
                              }}
                            />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleTogglePassword}
                              edge="end"
                              sx={{
                                color: theme.palette.primary.main,
                                "&:hover": {
                                  backgroundColor: alpha(
                                    theme.palette.primary.main,
                                    0.1
                                  ),
                                },
                              }}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      placeholder="Sua senha de acesso"
                      sx={{ mb: 2 }}
                    />

                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ mb: 3 }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            color="primary"
                            sx={{
                              "&.Mui-checked": {
                                color: theme.palette.primary.main,
                              },
                            }}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Lembrar de mim
                          </Typography>
                        }
                      />
                      <Button
                        variant="text"
                        color="primary"
                        size="small"
                        sx={{
                          fontWeight: 600,
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.1
                            ),
                          },
                        }}
                      >
                        Esqueci a senha
                      </Button>
                    </Box>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={isLoading}
                      sx={{
                        py: 1.5,
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        boxShadow: `0 4px 15px 0 ${alpha(
                          theme.palette.primary.main,
                          0.3
                        )}`,
                        "&:hover": {
                          boxShadow: `0 6px 20px 0 ${alpha(
                            theme.palette.primary.main,
                            0.4
                          )}`,
                          transform: "translateY(-2px)",
                        },
                        "&:disabled": {
                          background: theme.palette.action.disabled,
                          transform: "none",
                        },
                        transition: "all 0.3s ease",
                        mb: 3,
                      }}
                    >
                      {isLoading ? "Entrando..." : "Acessar"}
                    </Button>
                  </Box>
                </Fade>

                <Fade
                  in={true}
                  timeout={800}
                  style={{ transitionDelay: "600ms" }}
                >
                  <Box
                    textAlign="center"
                    sx={{
                      mt: 4,
                      pt: 3,
                      borderTop: `1px solid ${theme.palette.divider}`,
                    }}
                  ></Box>
                </Fade>
              </Box>
            </CardContent>
          </Card>
        </Zoom>
      </Container>
    </Box>
  );
};

export default Login;
