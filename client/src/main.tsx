import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Quiz from "./Quiz.tsx";
import { UserProvider } from "./context/user.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <Quiz />
    </UserProvider>
  </StrictMode>
);
