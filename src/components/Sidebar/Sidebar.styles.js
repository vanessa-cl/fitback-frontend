import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Drawer,
  ListItem,
} from "@mui/material";
import { Link } from "react-router";
import styled from "styled-components";

const HEADER_HEIGHT = "5rem";

export const SidebarWrapper = styled(Drawer)`
  position: relative !important;
  display: flex;
  justify-content: space-between;
  height: auto;
  z-index: 0;
  overflow: hidden;
  margin-top: ${HEADER_HEIGHT};
  flex-shrink: 0;

  .MuiAccordion-root::before {
    content: none;
  }

  & .MuiDrawer-paper {
    height: calc(100vh - ${HEADER_HEIGHT});
    background-color: var(--color-gray-dark);
    margin-top: ${HEADER_HEIGHT};
    border-right: 2px solid var(--color-gray-dark) !important;
    overflow-x: hidden;
    width: ${(props) => (props.open ? "17.3rem" : "0")} !important;
    transition: width 0.3s ease-in-out !important;
  }

  .MuiPaper-root {
    width: 17.3rem;
  }
`;

export const SidebarAccordion = styled(Accordion)`
  width: 100%;
  color: var(--color-white);
  background-color: var(--color-gray-dark);
  --Paper-shadow: 0 !important;

  &.Mui-expanded {
    border-bottom: 0;
    margin: 0 !important;
  }

  .MuiAccordion-heading button {
    color: var(--color-white);
    padding: 16px 0px 16px 16px !important;
    letter-spacing: 0.1px;
    min-height: 42px;
    max-height: 64px;
  }
`;

export const AccordionLabel = styled(AccordionSummary)`
  --Paper-shadow: 0 !important;
  background-color: var(--color-gray-dark) !important;
  transition: background-color ease-in-out 0.3s !important;
  border: 1px solid rgba(242, 140, 31, 0.2) !important;
  border-left: none !important;
  border-right: none !important;
  font-size: 1.25rem !important;
  font-family: "Montserrat", sans-serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.2px !important;
  text-transform: none !important;

  &:hover {
    background-color: var(--color-gray-darker) !important;
  }

  svg {
    color: var(--color-white);
    width: 50px;
    height: 50px;
  }

  ${(props) =>
    props?.expanded
      ? `
      color: var(--color-orange-secondary) !important;
      svg {
        color: var(--color-orange-secondary) !important;}
      `
      : ""}
`;

export const AccordionItem = styled(AccordionDetails)`
  display: flex;
  min-height: 42px;
  background-color: var(--color-gray-dark);
  color: var(--color-white);
  transition: max-height 0.3s ease;
  padding: 12px 16px !important;

  &:hover {
    background-color: var(--color-gray-darker);
  }
`;

export const AccordionLink = styled(Link)`
  text-decoration: none;
  color: var(--color-white);
  font-size: 1rem !important;
  font-family: "Montserrat", sans-serif !important;
  font-weight: 600 !important;
  padding: 12px !important;
  border: 1px solid transparent;
  border-radius: 4px;
  letter-spacing: 0.2px !important;
  line-height: 18px !important;
  width: 100%;
  cursor: pointer;

  ${(props) =>
    props?.selected
      ? `
        border: 1px solid rgba(242, 140, 31, 0.2);
        background-color: var(--color-gray-darker);
        `
      : ""}

  &:hover {
  }
`;

export const SidebarItem = styled(ListItem)`
  color: var(--color-white);

  &:hover {
    background-color: var(--color-gray-secondary);
  }
`;

export const SidebarAccordionContainer = styled(Accordion)`
  .MuiAccordion-root {
    background-color: var(--color-gray-dark) !important;
  }
`;
