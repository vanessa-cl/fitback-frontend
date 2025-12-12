import styled from "styled-components";
import {
  flexRowJustifyCenter,
  flexRowJustifyEnd,
} from "../../../styles/mixins/layout.mixin";

export const FormGrid = styled.div`
  width: 100%;
  display: grid;

  row-gap: 16px;
  column-gap: 24px;

  ${({ editmode }) =>
    editmode
      ? `
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
:first-child {
    grid-column: span 3;
  }

  :nth-child(2) {
    grid-column: span 2;
  }

  :nth-child(4) {
    grid-column: span 2;
  }
`
      : `
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
:first-child {
    grid-column: span 3;
  }

  :nth-child(2) {
    grid-column: span 2;
  }

  :nth-child(4) {
    grid-column: span 2;
  }

  :last-child {
    grid-column: span 3;
  }

  `}
`;

export const FormRow = styled.div`
  ${flexRowJustifyCenter}
  gap: 16px;
`;

export const ActionRow = styled.div`
  ${flexRowJustifyEnd}
  gap: 16px;
  width: 100%;
  margin-top: 24px;

  button {
    width: auto;
  }
`;
