import { BrowserRouter, Routes, Route } from "react-router-dom";

//*: Components
import { Container } from "../components/Container";
import { RegisterPage } from "../pages/Register";
import { LoginPage } from "../pages/Login";
import { QuizHome } from "../pages/QuizHome";

export const Router = () => {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuizHome />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};
