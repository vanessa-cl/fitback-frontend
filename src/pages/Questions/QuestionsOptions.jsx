import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Button,
  Radio,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const QuestionsOptions = ({
  allowMultiples,
  onChange,
  isEditing,
  initialOptions,
}) => {
  const [options, setOptions] = useState([
    { id: 1, texto: "" },
    { id: 2, texto: "" },
  ]);

  useEffect(() => {
    if (isEditing && initialOptions.length > 0) {
      setOptions(initialOptions);
      onChange(initialOptions);
    }
  }, [isEditing, initialOptions]);

  const handleChange = (id, value) => {
    const newOptions = options.map((o) =>
      o.id === id ? { ...o, texto: value } : o
    );
    setOptions(newOptions);
    onChange(newOptions);
  };

  const addOption = () => {
    const newOption = { id: options.length + 1, texto: "" };
    const newOptions = [...options, newOption];
    setOptions(newOptions);
    onChange(newOptions);
  };

  const removeOption = (id) => {
    const newOptions = options.filter((o) => o.id !== id);
    setOptions(newOptions);
    onChange(newOptions);
  };

  return (
    <Box mt={2}>
      {console.log(options)}
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
        Opções da Pergunta
      </Typography>

      {options.map((option) => (
        <Box
          key={option.id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1,
          }}
        >
          {allowMultiples ? <Checkbox disabled /> : <Radio disabled />}

          <TextField
            fullWidth
            placeholder="Digite uma opção"
            value={option.texto}
            onChange={(e) => handleChange(option.id, e.target.value)}
          />

          <IconButton color="error" onClick={() => removeOption(option.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="text"
          onClick={addOption}
          sx={{ mt: 1, textTransform: "none", width: "180px" }}
        >
          <AddIcon />
          Adicionar opção
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionsOptions;
