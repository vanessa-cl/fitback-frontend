import * as S from "./Sidebar.styles.js";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [expanded, setExpanded] = useState("panel0");
  const [activeLink, setActiveLink] = useState("");

  const handleAccordionChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <S.SidebarWrapper
      open={isSidebarOpen}
      onClose={toggleSidebar(false)}
      variant="persistent"
      hideBackdrop
    >
      {console.log(activeLink)}
      <S.SidebarAccordion
        expanded={expanded === "panel1"}
        onChange={handleAccordionChange("panel1")}
      >
        <S.AccordionLabel
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          expanded={expanded === "panel1"}
        >
          <p>Clientes</p>
        </S.AccordionLabel>
        <S.AccordionItem>
          <S.AccordionLink
            selected={activeLink === "/consultar-clientes"}
            to="/consultar-clientes"
            onClick={() => setActiveLink("/consultar-clientes")}
          >
            Consultar
          </S.AccordionLink>
        </S.AccordionItem>
        <S.AccordionItem>
          <S.AccordionLink
            selected={activeLink === "/cadastrar-cliente"}
            to="/cadastrar-cliente"
            onClick={() => setActiveLink("/cadastrar-cliente")}
          >
            Cadastrar
          </S.AccordionLink>
        </S.AccordionItem>
      </S.SidebarAccordion>
      <S.SidebarAccordion
        expanded={expanded === "panel2"}
        onChange={handleAccordionChange("panel2")}
      >
        <S.AccordionLabel
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          expanded={expanded === "panel2"}
        >
          <p>Questionários</p>
        </S.AccordionLabel>
        <S.AccordionItem>
          <S.AccordionLink
            selected={activeLink === "/consultar-questionario"}
            to="/consultar-questionario"
            onClick={() => setActiveLink("/consultar-questionario")}
          >
            Consultar
          </S.AccordionLink>
        </S.AccordionItem>
        <S.AccordionItem>
          <S.AccordionLink
            selected={activeLink === "/cadastrar-questionario"}
            to="/cadastrar-questionario"
            onClick={() => setActiveLink("/cadastrar-questionario")}
          >
            Cadastrar
          </S.AccordionLink>
        </S.AccordionItem>
      </S.SidebarAccordion>
    </S.SidebarWrapper>
  );
};

export default Sidebar;
