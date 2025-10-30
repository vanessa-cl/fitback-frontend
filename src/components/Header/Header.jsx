import * as S from "./Header.styles.js";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/logo_fitback_horizontal.png";
import { usePageTitle } from "../../context/PageTitleContext.jsx";
import { useNavigate } from "react-router-dom"; 

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  const { title } = usePageTitle();
  const navigate = useNavigate(); 

  const handleLogoClick = () => {
    navigate("/"); 
  };

  return (
    <S.HeaderContainer>
      <S.HeaderLogoWrapper>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar(!isSidebarOpen)}
        >
          <MenuIcon />
        </IconButton>
        <S.Logo 
          src={logo} 
          alt="Fitback Logo" 
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }} 
        />
        <S.HeaderDivider />
      </S.HeaderLogoWrapper>
      <S.HeaderPageTitle>{title}</S.HeaderPageTitle>
    </S.HeaderContainer>
  );
};

export default Header;