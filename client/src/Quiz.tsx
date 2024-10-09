import { Toaster } from "sonner";
import { Router } from "./router/Router";

function Quiz() {
  return (
    <>
      <Toaster richColors position="top-right" duration={2500} closeButton />
      <Router />
    </>
  );
}

export default Quiz;
