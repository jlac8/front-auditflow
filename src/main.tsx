import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
import App from "./App.tsx";
import UserProvider from "./context/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <UserProvider>
      <Toaster position="top-center" richColors />
      <App />
    </UserProvider>
  </BrowserRouter>
);
