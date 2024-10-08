import { BrowserRouter, Routes, Route } from "react-router-dom";

//*: Components
import { Container } from "../components/Container";
import { RegisterPage } from "../pages/Register";
import { LoginPage } from "../pages/Login";

export const Router = () => {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};
