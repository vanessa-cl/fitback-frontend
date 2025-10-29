import styled from "styled-components";

export const RegisterClientForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;

  :nth-child(1) {
    grid-column: span 3;
  }

  :nth-child(2), :nth-child(5) {
    grid-column: span 2;
  }

  :nth-child(4) {
    grid-column: span 2;
  }

  :nth-child(6),
  :nth-child(7) {
    grid-column: span 2;
  }
`;

export const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  width: 100%;
  margin-top: 24px;

  button {
    width: auto;
  }
`;
