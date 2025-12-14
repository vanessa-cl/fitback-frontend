import { TextField, TableHead } from "@mui/material";
import styled from "styled-components";

export const ConsultClientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SearchContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 48px;
  width: 100%;

  button {
    width: 200px;
  }

  .MuiSvgIcon-root {
    font-size: 1.5rem !important;
  }
`;

export const SearchInput = styled(TextField)`
  width: 80%;
  border-radius: 8px;

  input {
    padding: 12px !important;
  }
`;

export const ClientsList = styled.div`
  width: 100%;
  overflow-x: auto;

  .status-span {
    text-transform: capitalize;
  }
`;

export const ClientTableHead = styled(TableHead)`
  & .MuiTableRow-root {
    background-color: var(--color-gray) !important;
  }

  & .MuiTableCell-root {
    font-size: 1rem !important;
    font-weight: 700 !important;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;

  svg {
    font-size: 1.7rem !important;
    color: var(--color-orange-primary);
  }
`;
