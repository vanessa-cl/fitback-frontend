import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout/HomeLayout.jsx";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout.jsx";
import Home from "../pages/home/Home.jsx";
import ClientsManagement from "../pages/Clients/ClientsManagement/ClientsManagement.jsx";
import Login from "../pages/Auth/Login/Login.jsx";
import QuestionManagement from "../pages/Questions/QuestionManagement/QuestionManagement.jsx";
import QuestionnaireList from "../pages/Questionnaire/ConsultQuestionnaire/QuestionnaireList.jsx";
import RegisterQuestionnaire from "../pages/Questionnaire/RegisterQuestionnaire/RegisterQuestionnaire.jsx";
import QuestionnaireOrder from "../pages/Questionnaire/QuestionnaireOrder/QuestionnaireOrder.jsx";
import BranchManagement from "../pages/Branches/BranchManagement/BranchManagement.jsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path="/app" element={<Home />} />
          <Route path="/gerenciar-clientes" element={<ClientsManagement />} />
          <Route
            path="/consultar-questionario"
            element={<QuestionnaireList />}
          />
          <Route
            path="/cadastrar-questionario"
            element={<RegisterQuestionnaire />}
          />
          <Route
            path="/editar-questionario/:id"
            element={<RegisterQuestionnaire />}
          />
          <Route
            path="/ordenar-questionario/:id"
            element={<QuestionnaireOrder />}
          />
          <Route path="/gerenciar-filiais" element={<BranchManagement />} />
          <Route path="/gerenciar-perguntas" element={<QuestionManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
