import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout.jsx";
import DefaultLayout from "../layouts/DefaultLayout.jsx";
import Home from "../pages/home/Home.jsx";
import RegisterClient from "../pages/Clients/RegisterClient/RegisterClient.jsx";
import ConsultClients from "../pages/Clients/ConsultClients/ConsultClients.jsx";
import ListCategories from "../pages/Categories/ListCategories.jsx";
import RegisterCategory from "../pages/Categories/RegisterCategory.jsx";
import Login from "../pages/Auth/Login.jsx";
import QuestionManagement from "../pages/Questions/QuestionManagement.jsx";
import QuestionnaireList from "../pages/Questionnaire/ConsultQuestionnaire/QuestionnaireList.jsx";
import RegisterQuestionnaire from "../pages/Questionnaire/RegisterQuestionnaire/RegisterQuestionnaire.jsx";
import QuestionnaireOrder from "../pages/Questionnaire/QuestionnaireOrder/QuestionnaireOrder.jsx";
import BranchManagement from "../pages/Branches/BranchManagement.jsx"; 

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Route>

        {/* ⭐ Todas as rotas com Header e Sidebar */}
        <Route element={<DefaultLayout />}>
          <Route path="/app" element={<Home />} />
          <Route path="/consultar-clientes" element={<ConsultClients />} />
          <Route path="/cadastrar-cliente" element={<RegisterClient />} />

          <Route path="/consultar-questionario" element={<QuestionnaireList />} />
          <Route path="/cadastrar-questionario" element={<RegisterQuestionnaire />} />
          <Route path="/editar-questionario/:id" element={<RegisterQuestionnaire />} />
          <Route path="/ordenar-questionario/:id" element={<QuestionnaireOrder />} />
          <Route path="/gerenciar-filiais" element={<BranchManagement />} />
        </Route>

        <Route path="/gerenciar-perguntas" element={<QuestionManagement />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;