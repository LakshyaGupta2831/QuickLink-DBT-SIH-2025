import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import "./i18n";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContextProvider.jsx";
import AppContextProvider from "./context/AppContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <AppContextProvider>
        {/* <StrictMode> */}
        <App />
        {/* <Toaster position="top-center" reverseOrder={false} />
         */}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#1f1f1f", // dark gray
              color: "#ffffff", // white text
              border: "1px solid #333",
            },

            success: {
              style: {
                background: "#1f1f1f",
                color: "#4ade80", // light green
              },
            },

            error: {
              style: {
                background: "#1f1f1f",
                color: "#f87171", // light red
              },
            },
          }}
        />
      </AppContextProvider>
    </AuthContextProvider>
    {/* </StrictMode>, */}
  </BrowserRouter>
);
