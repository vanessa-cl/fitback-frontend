import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import { PageTitleProvider } from "../../context/PageTitleContext.jsx";
import * as S from "./DefaultLayout.styles.js";

const DefaultLayout = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <S.DefaultLayoutContainer>
      <PageTitleProvider>
        <Header isSidebarOpen={open} toggleSidebar={toggleDrawer} />
        <S.DefaultLayoutWrapper>
          <Sidebar
            isSidebarOpen={open}
            toggleSidebar={toggleDrawer}
            style={{ width: open ? "17.3rem" : "0" }}
          />
          <S.Main isSidebarOpen={open}>
            <Outlet />
          </S.Main>
        </S.DefaultLayoutWrapper>
      </PageTitleProvider>
    </S.DefaultLayoutContainer>
  );
};

export default DefaultLayout;
