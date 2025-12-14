import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { styles } from "../RegisterQuestionnaire/RegisterQuestionnaire.styles";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";

const columns = [
  { id: "selection", label: "Seleção", width: 50 },
  { id: "code", label: "Código", width: 80 },
  { id: "question", label: "Pergunta" },
  { id: "category", label: "Categoria" },
  { id: "type", label: "Tipo" },
  { id: "options", label: "Opções" },
];

const questionTypeLabel = {
  aberta: "Aberta",
  multipla_escolha: "Múltipla Escolha",
  escala: "Escala",
};

const getQuestionOptionsText = (pergunta) => {
  if (pergunta.tipo === "multipla_escolha" && pergunta.opcoes) {
    return pergunta.opcoes.map((option) => option.texto).join(", ");
  }
  return "N/A";
};

const QuestionsList = ({
  isEditing,
  filteredQuestions,
  page,
  rowsPerPage,
  form,
  toggleQuestion,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={styles.tableHeaderRow}>
              {columns.map((column) => (
                <TableCell key={column.id} width={column.width}>
                  <strong>{column.label}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredQuestions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => {
                const selected = isEditing
                  ? form.perguntas.includes(
                      (p) => p.id_pergunta === item.id_pergunta
                    )
                  : form.perguntasIds.includes(item.id_pergunta);
                return (
                  <TableRow
                    key={item.id_pergunta}
                    hover
                    onClick={() => toggleQuestion(item)}
                    sx={selected ? styles.selectedRow : styles.tableRow}
                  >
                    <TableCell>
                      {selected ? (
                        <CheckCircle sx={styles.checkIcon} />
                      ) : (
                        <RadioButtonUnchecked sx={styles.uncheckedIcon} />
                      )}
                    </TableCell>
                    <TableCell>{item.id_pergunta}</TableCell>
                    <TableCell>{item.conteudo}</TableCell>
                    <TableCell>{item.categoria}</TableCell>
                    <TableCell>{questionTypeLabel[item.tipo]}</TableCell>
                    <TableCell>{getQuestionOptionsText(item)}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredQuestions.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Linhas por página:"
      />
    </>
  );
};

export default QuestionsList;
