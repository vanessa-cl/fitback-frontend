import styled from "styled-components";

export const DefaultLayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f7fafc;
`;

export const DefaultLayoutWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  margin: 0 auto;
`;

export const Main = styled.main`
  margin-left: ${(props) => (props.isSidebarOpen ? "17.3rem" : "0")};
  padding: 1rem 2rem;
  transition: margin-left 0.1s ease-in-out !important;
  width: 100%;
  height: 100%;
`;
