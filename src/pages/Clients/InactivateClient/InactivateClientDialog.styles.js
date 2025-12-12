import styled from "styled-components";

export const DialogContent = styled.div`
  padding: 20px;
  min-width: 300px;
`;

export const DialogMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 15px;

  svg {
  
    font-size: 50px;
    color: var(--color-orange-primary);
    margin-bottom: 10px;
  }
`;

export const DialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px 20px 20px;
  gap: 10px;

  button {
    width: 150px;
  }
`;
