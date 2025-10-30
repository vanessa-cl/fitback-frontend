import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout.jsx";
import DefaultLayout from "../layouts/DefaultLayout.jsx";
import Home from "../pages/home/Home.jsx";
import Example from "../pages/Example/Example.jsx";
import RegisterClient from "../pages/Clients/RegisterClient/RegisterClient.jsx";
import ConsultClients from "../pages/Clients/ConsultClients/ConsultClients.jsx";
import ListCategories from "../pages/Categories/ListCategories.jsx";
import RegisterCategory from "../pages/Categories/RegisterCategory.jsx";
import Login from "../pages/Auth/Login.jsx";
import QuestionnaireList from "../pages/Questionnaire/QuestionnaireList.jsx";
import QuestionManagement from "../pages/Questions/QuestionManagement.jsx";

// import Login from '../pages/Auth/Login.jsx';
// import Register from '../pages/Auth/Register.jsx';
// import Feedback from '../pages/Feedback/Feedback.jsx';
// import Reports from '../pages/Reports/Reports.jsx';

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
          <Route path="/example" element={<Example />} />
          <Route path="/consultar-clientes" element={<ConsultClients />} />
          <Route path="/cadastrar-cliente" element={<RegisterClient />} />
          <Route path="/consultar-categorias" element={<ListCategories />} />
          <Route path="/cadastrar-categoria" element={<Example />} />
          <Route path="/consultar-categorias" element={<Example />} />
          <Route path="/cadastrar-categoria" element={<RegisterCategory />} />
          <Route
            path="/consultar-questionario"
            element={<QuestionnaireList />}
          />
          <Route path="/gerenciar-perguntas" element={<QuestionManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
