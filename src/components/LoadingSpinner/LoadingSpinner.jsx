import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1300;

  svg {
    color: var(--color-orange-primary) !important;
  }
`;

const LoadingSpinner = () => (
  <LoaderContainer>
    <CircularProgress size={80} />
  </LoaderContainer>
);

export default LoadingSpinner;
