import { Dialog } from "@mui/material";
import styled from "styled-components";

export const DialogWrapper = styled(Dialog)`
  min-width: 500px;

  .MuiPaper-root {
    padding: 20px;
  }

  h3 {
    margin-bottom: 10px;
  }
`;

export const ClientDetailsForm = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;

  :nth-child(1) {
    grid-column: span 3;
  }

  :nth-child(2),
  :nth-child(4) {
    grid-column: span 2;
  }

  :nth-child(3),
  :nth-child(5) {
    grid-column: span 1;
  }
`;
