import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import "./styles/styles.css";
import { GlobalContextProvider } from "./ContextProvider";
import PublicPostPage from "./pages/PublicPostPage";
import { AuthoringAndEditing } from "./pages/AuthoringAndEditing";
import LoginPage from "./pages/LoginPage";
import SeeMoreOfPublicPost from "./pages/SeeMoreOfPublicPost";
import UpdatePostAndCommentsPage from "./pages/UpdatepostAndComments";
import { links } from "./globalSettings";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

function App() {
  return (
    <>
      <Routes>
        <Route path={links.SignUpPageLink} element={<SignupPage />} />
        <Route path={links.LogInPageLink} element={<LoginPage></LoginPage>} />
        <Route
          path={links.PublicPostPageLink}
          element={<PublicPostPage />}
        ></Route>
        <Route
          path={links.SeenMoreOfPublicPostPageLink}
          element={<SeeMoreOfPublicPost />}
        />
        <Route
          path={links.AuthoringAndEditingPageLink}
          element={<AuthoringAndEditing />}
        ></Route>

        <Route
          path={links.UpdatePostAndCommentsLink}
          element={<UpdatePostAndCommentsPage />}
        />
      </Routes>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <BrowserRouter>
        <App></App>
      </BrowserRouter>
    </GlobalContextProvider>
  </React.StrictMode>
);
